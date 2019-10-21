var modalFormListing = [];
$(document).ready(function(){
  requestModalListing();
});


function requestAPI(method, url, data, successCallback, failureCallback) {
  $.ajax({
    type: method,
    url: url,
    data: data,
    success: successCallback,
    error: failureCallback
  });
}

function requestSaveApp(requestData, editorUi) {
  $.ajax({
    type: 'POST',
    url: CONSTANT.SAVE_NAME_API,
    data: JSON.stringify(requestData),
    dataType: 'json',
    contentType: 'application/json',
    success: function(data) {
      $('#myModal').modal('hide');
      editorUi.editor.setModified(false);
      editorUi.editor.setFilename(`${requestData.appName}`);
      $('#header-app-name').html(`- ${requestData.appName}`);
      if (data.appId) {
        editorUi.editor.setAppId(data.appId);
        swal('', 'save data success', 'success');
      } else {
        swal('', 'update data success', 'success');
      }
      $('#publishItem').prop('hidden', false);
      editorUi.updateDocumentTitle();
    },
    error: function(xhr) {
      $('#responseError').html(xhr.responseJSON.code + ' : ' + xhr.responseJSON.message);
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
      $('#myModal').modal('hide');
      // $('#save-btn').prop('disabled', false);
      $('#header-app-name').html(`- ${data.appName}`);
      $('#publishItem').prop('hidden', false);
      // editorUi.editor.setStatus('load data success');
      editorUi.editor.setModified(true);
      editorUi.editor.setFilename(data.appName);
      editorUi.editor.setAppId(data.appId);
      editorUi.updateDocumentTitle();
      editorUi.editor.graph.model.beginUpdate();
      try {
        editorUi.editor.setGraphXml(mxUtils.parseXml(data.content).documentElement);
      }
      catch (e) {
      }
      finally {
        editorUi.editor.graph.model.endUpdate();
      }
      swal('', 'Load data success', 'success');
    },
    error: function(xhr) {
      $('#responseError').html(xhr.responseJSON.code + ' : ' + xhr.responseJSON.message);
    }
  });
}


function requestModalListing(callback) {
  $.ajax({
    type: 'GET',
    url: CONSTANT.LOAD_MODAL_LISTING_API,
    contentType: 'application/json',
    success: function(data) {
      modalFormListing = data.data;
      if (callback) {
        callback(modalFormListing);
      }
    },
    error: function(xhr) {
    }
  });
}

