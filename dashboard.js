var settings = {
  url: 'http://10.113.192.74/pipelines',
  full_pipelines: ["Agent Admin"]
//  ,summary_pipelines: ["Agent Desktop"]
}

function renderJson(parsedJson) {
  $('#formatted-data').html('');
  var pipelineTemplate = haml.compileHaml('pipeline-template');
  var summaryPipelineTemplate = haml.compileHaml('summary-pipeline-template');
  var lastUpdatedTemplate = haml.compileHaml('last-updated-template');
  for (var i = 0; i < parsedJson.length; i++) {
    pipeline = parsedJson[i];
    if ( _(settings.full_pipelines).contains(pipeline.name) ) {
      $('#formatted-data').append(pipelineTemplate.call(this, {pipeline: pipeline}));
    }
    else if( _(settings.summary_pipelines).contains(pipeline.name) ) {
      $('#formatted-data').append(summaryPipelineTemplate.call(this, {pipeline: pipeline}));
    }
  }
  var now = new Date();
  $('#formatted-data').append(lastUpdatedTemplate.call(this, {updateTime: now}));
}

function processData(data) {
  $('#raw-json').append(data);
  var parsedJson = $.parseJSON(data);
  renderJson(parsedJson);
}

function fetchData() {
  $.get(settings.url, processData);
  setTimeout(fetchData, 5000);
}

function fetchJobs() {
  $.get('http://10.113.192.74/jobs', processJobs);
}

function processJobs(data) {
    $('#raw-job-json').append(data)
}

$(document).ready(function () {
  fetchData();
//  fetchJobs();
});
