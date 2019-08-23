function requestAPI(method, url, data, successCallback, failureCallback) {
  $.ajax({
    type: method,
    url: url,
    data: data,
    success: successCallback,
    error: failureCallback
  });
}

function requestSaveName(name, editorUi) {
  $.ajax({
    type: 'POST',
    url: CONSTANT.SAVE_NAME_API,
    data: { name },
    dataType: 'json',
    success: function(data) {
      console.log(data);
      editorUi.editor.setStatus('save success');
      editorUi.editor.setModified(false);
      editorUi.editor.setFilename(name);
      editorUi.updateDocumentTitle();
    },
    error: function(xhr) {
      editorUi.editor.setStatus(xhr.responseJSON.code + ' : ' + xhr.responseJSON.message);
    }
  });
}
