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
