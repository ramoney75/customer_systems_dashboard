function renderJson(parsedJson) {
  var pipelineTemplate = haml.compileHaml('pipeline-template');
  for (i = 0; i < parsedJson.length; i++) {
    pipeline = parsedJson[i];
    $('#formatted-data').html(pipelineTemplate.call(this, {pipeline: pipeline}));
  }
}

function processData(data) {
  $('#raw-json').append(data);
  var parsedJson = $.parseJSON(data);
  //$('formatted-data').append(parsedJson[0]['name']);
  renderJson(parsedJson);
}

function fetchData() {
  $.get('http://10.113.192.74/pipelines', processData);
}

$(document).ready(function () {
  fetchData();
});
