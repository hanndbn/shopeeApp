var modalFormListing = [];
var filesListing = {};
$(document).ready(function() {
  // requestModalListing();
  requestFilesWithType("hannd", "image");
  requestFilesWithType("hannd", "pdf");
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
    type: "POST",
    url: CONSTANT.SAVE_NAME_API,
    data: JSON.stringify(requestData),
    dataType: "json",
    contentType: "application/json",
    success: function(data) {
      $("#myModal").modal("hide");
      editorUi.editor.setModified(false);
      editorUi.editor.setFilename(`${requestData.appName}`);
      $("#header-app-name").html(`- ${requestData.appName}`);
      if (data.appId) {
        editorUi.editor.setAppId(data.appId);
        swal("", "save data success", "success");
      } else {
        swal("", "update data success", "success");
      }
      $("#publishItem").prop("hidden", false);
      editorUi.updateDocumentTitle();
    },
    error: function(xhr) {
      $("#responseError").html(xhr.responseJSON.code + " : " + xhr.responseJSON.message);
    }
  });
}

function requestLoadDataApp(data, editorUi) {
  $.ajax({
    type: "POST",
    url: CONSTANT.LOAD_DATA_API,
    data: JSON.stringify(data),
    dataType: "json",
    contentType: "application/json",
    success: function(data) {
      $("#myModal").modal("hide");
      // $('#save-btn').prop('disabled', false);
      $("#header-app-name").html(`- ${data.appName}`);
      $("#publishItem").prop("hidden", false);
      // editorUi.editor.setStatus('load data success');
      editorUi.editor.setModified(true);
      editorUi.editor.setFilename(data.appName);
      editorUi.editor.setAppId(data.appId);
      editorUi.updateDocumentTitle();
      editorUi.editor.graph.model.beginUpdate();
      try {
        editorUi.editor.setGraphXml(mxUtils.parseXml(data.content).documentElement);
      } catch (e) {
      } finally {
        editorUi.editor.graph.model.endUpdate();
      }
      swal("", "Load data success", "success");
    },
    error: function(xhr) {
      $("#responseError").html(xhr.responseJSON.code + " : " + xhr.responseJSON.message);
    }
  });
}


function requestModalListing(callback) {
  $.ajax({
    type: "GET",
    url: CONSTANT.LOAD_MODAL_LISTING_API,
    contentType: "application/json",
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

function requestUploadFile(userid, data, callback) {
  $.ajax({
    type: "POST",
    url: CONSTANT.UPLOAD_FILE_API,
    data: data,
    beforeSend: function(request) {
      request.setRequestHeader("userid", userid ? userid : "hannd");
    },
    processData: false,  // tell jQuery not to process the data
    contentType: false,  // tell jQuery not to set contentType
    success: function(data) {
      if (callback) {
        callback(data);
      }
    },
    error: function(xhr) {
    }
  });
}

function requestFilesWithType(userId, fileType, callback) {
  $.ajax({
    type: "POST",
    url: CONSTANT.GET_FILES_WITH_TYPE,
    data: JSON.stringify({
      userId: userId,
      fileType: fileType
    }),
    dataType: "json",
    contentType: "application/json",
    success: function(data) {
      filesListing[fileType] = data.data;
      if (callback) {
        callback(filesListing);
      }
    },
    error: function(xhr) {
    }
  });
}


