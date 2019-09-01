var saveAppModal = function() {
  return (
    `<div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
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
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" disabled id="saveApp">Save changes</button>
        </div>
      </div>
    </div>`
  );
};

var loadAppModal = function() {
  return (
    `<div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
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
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" disabled id="saveApp">Load</button>
        </div>
      </div>
    </div>`
  );
};
