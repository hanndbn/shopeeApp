var saveAppModal = function() {
  return (
    `<div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header custom-modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Save App</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row form-group">
            <div class="col-3">App Name</div>
            <div class="col-9">
                <input class="form-control" id="appName"/>
            </div>
          </div>
          <div class="row">
          <div class="col-9 offset-3">
                <div class="text-danger" id="responseError"></div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-common btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-common btn-submit" disabled id="saveApp">Save changes</button>
        </div>
      </div>
    </div>`
  );
};

var loadAppModal = function() {
  return (
    `<div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header custom-modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Load App</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row form-group">
            <div class="col-3">App Name</div>
            <div class="col-9">
                <input class="form-control" id="appName"/>
            </div>
          </div>
          <div class="row">
          <div class="col-9 offset-3">
                <div class="text-danger" id="responseError"></div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-common btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-common btn-submit" disabled id="saveApp">Load</button>
        </div>
      </div>
    </div>`
  );
};

const showImageUpload = function() {
  return (
    `<div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header custom-modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Image</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row form-group">
            <div class="col-3">Image</div>
            <div class="col-9">
                <input type="file" id="fileButton" name="fileButton" accept="image/*"
                style="z-index: 999;position:relative"/>
            </div>
          </div>
          <div class="row form-group text-center loading-wrapper" style="display: none">
            <div class="col-12">Uploading...</div>
          </div>
          <div class="row form-group image-content-wrapper"  style="display: none">
            <div class="col-3">Image Url</div>
            <div class="col-9">
                <input disabled class="form-control" type="text" id="imageUrl" name="imageUrl" style="z-index: 999;position:relative"/>
            </div>
          </div>
          <div class="row">
          <div class="col-9 offset-3">
                <div class="text-danger" id="responseError"></div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-common btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-common btn-submit" id="useImage" disabled>Submit</button>
        </div>
      </div>
    </div>`
  );
};


const publishAppModal = function() {
  return (
    `<div class="modal-dialog custom-dialog publish-dialog" role="document">
      <div class="modal-content">
          <div class="save-publish-panel-header">
          <span class="close close-modal" data-dismiss="modal"/>
            <div class="title">Your changes were saved</div>
            <div class="subtitle">Publish to see your changes live at the following domain:</div>
          </div>
        <div class="modal-body">
          <div class="row no-gutters form-group">
            <div class="col-9">
                <input class="form-control" readonly id="appName"/>
            </div>
            <div class="col-3">
                <a target="_blank" href="#" class="app-link" id="app-link">View Site</a>
            </div>
          </div>
          <div class="row">
          <div class="col-9 offset-3">
                <div class="text-danger" id="responseError"></div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-common btn-secondary close-modal" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-common btn-submit" id="publishApp">Publish</button>
        </div>
      </div>
    </div>`
  );
};

const fileUpload = function(fileType, label = "", accept = "*") {
  return (
    `<div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header custom-modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Upload ${_.capitalize(label)}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row form-group">
            <div class="col-3">${_.capitalize(label)} File</div>
            <div class="col-9">
                <input type="file" id="fileInput" name="fileInput" accept="${accept}"
                style="z-index: 999;position:relative"/>
            </div>
          </div>
          <div class="row form-group text-center loading-wrapper" style="display: none">
            <div class="col-12">Uploading...</div>
          </div>
          <div class="row">
          <div class="col-9 offset-3">
                <div class="text-danger" id="responseError"></div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-common btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-common btn-submit" id="uploadFile">Upload</button>
        </div>
      </div>
    </div>`
  );
};

const changeImageUrl = function(data) {
  const { imageUrl, callback } = data;
  const changeImageUrlContainer = document.createElement("div");
  changeImageUrlContainer.innerHTML = `<div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header custom-modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Image Url</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row form-group">
            <div class="col-3">Url</div>
            <div class="col-9">
                <input class="form-control" value="${imageUrl}" id="input-image-url"/>
            </div>
          </div>
          <div class="row">
          <div class="col-9 offset-3">
                <div class="text-danger" id="responseError"></div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-common btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-common btn-submit" disabled id="save-image-url">Save</button>
        </div>
      </div>
    </div>`;
  $(changeImageUrlContainer.querySelector("#save-image-url")).click(function(e) {
    const imageUrl = changeImageUrlContainer.querySelector("#input-image-url").value;
    const responseError = $(changeImageUrlContainer.querySelector("#responseError"));
    const img = new Image();
    img.onload = function() {
      if (callback && _.isFunction(callback)) {
        callback(imageUrl);
      }
      $("#myModal").modal("hide");
    };
    img.onerror = function() {
      responseError.html("URL invalid");
    };
    img.src = imageUrl;
  });
  $(changeImageUrlContainer.querySelector("#input-image-url")).keyup(function(e) {
    const responseError = $(changeImageUrlContainer.querySelector("#responseError"));
    const saveBtn = $(changeImageUrlContainer.querySelector("#save-image-url"));
    if (e.target.value === "") {
      responseError.html("Url must not empty");
      saveBtn.prop("disabled", true);
    } else {
      responseError.empty();
      saveBtn.prop("disabled", false);
    }
  });
  return changeImageUrlContainer;
};

const selectionFileModal = function(data) {
  const { fileType = "", fileTypeAccept = "image/*", fileSelected = [], isSelectMulti = false, callback } = data;
  const modal = $("#myModal");
  const changeImageUrlContainer = document.createElement("div");
  changeImageUrlContainer.innerHTML = `<div class="modal-dialog image-library-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header custom-modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Image library</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body p-0">
        <div class="row no-gutters image-library-wrapper">
         ${
    filesListing[fileType].map(file => `
        <div class="format-image-content">
          <div style="background-image: url(${fileType === "image" ? file.url : `/content/images/editor/icons/${fileType}.PNG`})" class="format-file-selector ${fileSelected.find(v => v.name === file.fileName) ? "active" : ""}"
          data-url="${file.url}"
          data-name="${file.fileName}"
          >
                <span class="file-close format-close" data-name="${file.name}">x</span>
          </div>
        </div>`).join("")
    }        
            
            <div class="format-image-content">
                <div id="upload-file">
                <img src="/content/images/editor/icons/import.png"/>
          </div>
            </div>
        </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-common btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-common btn-submit" disabled id="save-selection">Save</button>
        </div>
      </div>
    </div>`;

  const formatFileSelector = $(changeImageUrlContainer.querySelectorAll(".format-file-selector"));
  formatFileSelector.click((e) => {
    const isSelectedFile = e.target.classList.contains("active");
    if (!isSelectMulti) {
      formatFileSelector.removeClass("active");
    }
    if (isSelectedFile) {
      $(e.target).removeClass("active");
    } else {
      $(e.target).addClass("active");
    }
    const disabledSave = changeImageUrlContainer.querySelectorAll(".format-file-selector.active").length === 0;
    changeImageUrlContainer.querySelector("#save-selection").disabled = disabledSave;
  });

  $(changeImageUrlContainer.querySelector("#save-selection")).click(function(e) {
    const newSelected = [];
    changeImageUrlContainer.querySelectorAll(".format-file-selector").forEach(v => {
      if (v.classList.contains("active")) {
        newSelected.push({
          name: v.dataset.name,
          url: v.dataset.url
        });
      }
    });
    if (callback && _.isFunction(callback)) {
      callback(newSelected);
    }
    $("#myModal").modal("hide");
  });

  $(changeImageUrlContainer.querySelector("#upload-file")).click(function() {
    $("#myModal").html(fileUpload(fileType, fileType.toUpperCase(), fileTypeAccept));
    $("#uploadFile").click(function(e) {
      const formData = new FormData();
      formData.append("file", $("#fileInput")[0].files[0]);
      const userid = "hannd";
      requestUploadFile(userid, formData, function() {
        requestFilesWithType(userid, fileType, function() {
          swal({
            text: "Upload file success",
            icon: "success",
            closeOnClickOutside: false
          }).then(() => {
            modal.empty();
            modal.append(selectionFileModal(data));
            modal.modal("show");
          });
        });
        modal.modal("hide");
      });
      // let imagesFile = e.target.files[i];
    });
    modal.modal("show");
  });

  $(changeImageUrlContainer.querySelectorAll(".format-close")).click(function(e) {
    const fileName = e.target.dataset && e.target.dataset.name ? e.target.dataset.name : "";
    if (fileName) {
      requestDeleteImage(fileName, function() {
        const userid = "hannd";
        requestFilesWithType(userid, fileType, function() {
          modal.empty();
          modal.append(selectionFileModal(data));
        });
        swal("", "delete file success", "success");
      });
    }
  });
  return changeImageUrlContainer;
};

const successModalLayout = function(message) {
  return (
    `<div class="modal-dialog custom-dialog success-dialog" role="document">
      <div class="modal-content">
          <div class="save-publish-panel-header">
          <span class="close close-modal" data-dismiss="modal"/>
           <div class="custom-dialog-icon">
                <span class="icon-success"></span>
            </div>
            <div class="dialog-title">Success</div>
          </div>
        <div class="modal-body">
          <div class="row no-gutters">
            <div class="col-12 text-center">
               ${message}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-common btn-secondary close-modal" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>`
  );
};
