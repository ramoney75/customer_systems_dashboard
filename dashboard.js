var settings = {
    url: 'http://10.113.192.74/pipelines',
    full_pipelines: ["Agent Admin", "Agent Desktop", "Customer Platform - Agent Admin", "Customer Platform - Domain", "Customer Platform - E2E Smoke Test"]
//  ,summary_pipelines: ["Agent Desktop"]
}

var refreshHandle;

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
  elem = $('#raw-json');
  elem.empty();
  elem.append(data);
  var parsedJson = $.parseJSON(data);
  renderJson(parsedJson);
}

function fetchData() {
  $.get(settings.url, processData);
  refreshHandle = setTimeout(fetchData, 5000);
}

function stopRefresh() {
	clearTimeout(refreshHandle);
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
