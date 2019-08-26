function requestAPI(method, url, data, successCallback, failureCallback) {
  $.ajax({
    type: method,
    url: url,
    data: data,
    success: successCallback,
    error: failureCallback
  });
}

function requestSaveApp(data, editorUi) {
  $.ajax({
    type: 'POST',
    url: CONSTANT.SAVE_NAME_API,
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json',
    success: function(data) {
      editorUi.editor.setModified(false);
      editorUi.editor.setFilename(name);
      if (data.appId) {
        editorUi.editor.setAppId(data.appId);
        editorUi.editor.setStatus('save success');
      } else {
        editorUi.editor.setStatus('update success');
      }
      editorUi.updateDocumentTitle();
    },
    error: function(xhr) {
      editorUi.editor.setStatus(xhr.responseJSON.code + ' : ' + xhr.responseJSON.message);
    }
  });
}

function requestLoadDataApp(data, editorUi) {
  $.ajax({
    type: 'POST',
    url: CONSTANT.LOAD_DATA_API,
    data: JSON.stringify(data),
    dataType: 'json',
    contentType: 'application/json',
    success: function(data) {
      console.log(data);
      editorUi.editor.setStatus('load data success');
      editorUi.editor.setModified(false);
      editorUi.editor.setFilename(data.appName);
      editorUi.editor.setAppId(data.appId);
      editorUi.editor.graph.model.beginUpdate();
      try {
        editorUi.editor.setGraphXml(mxUtils.parseXml(data.content).documentElement);
      }
      catch (e) {
      }
      finally {
        editorUi.editor.graph.model.endUpdate();
      }
    },
    error: function(xhr) {
      editorUi.editor.setStatus(xhr.responseJSON.code + ' : ' + xhr.responseJSON.message);
    }
  });
}

