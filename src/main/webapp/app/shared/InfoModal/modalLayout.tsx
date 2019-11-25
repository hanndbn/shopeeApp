import React from 'react';

export const ConfirmDeleteLayout = (callback = null) => (
  <div className="row no-gutters info-modal-success">
    <div className="col-12 info-modal-header">
      <div className="custom-icon-success"/>
    </div>
    <div className="col-12 text-center p-3 mb-2">
      <h4>Success</h4>
      <div>Your account has been created successfully.</div>
    </div>
    <div className="col-12 text-center mb-4">
      <button className="btn btn-common custom-btn-success">OK</button>
    </div>
  </div>
);

export const ErrorLayout = (callback = null) => (
  <div className="row no-gutters info-modal-error">
    <div className="col-12 info-modal-header">
      <div className="custom-icon-error"/>
    </div>
    <div className="col-12 text-center p-3 mb-2">
      <h4>Success</h4>
      <div>Your account has been created successfully.</div>
    </div>
    <div className="col-12 text-center mb-4">
      <button className="btn btn-common custom-btn-error">Close</button>
    </div>
  </div>
);

export const WarningLayout = (callback = null) => (
  <div className="row no-gutters info-modal-warning">
    <div className="col-12 info-modal-header">
      <div className="custom-icon-warning"/>
    </div>
    <div className="col-12 text-center p-3 mb-2">
      <h4>W</h4>
      <div>Your account has been created successfully.</div>
    </div>
    <div className="col-12 text-center mb-4">
      <button className="btn btn-common custom-btn-warning">Close</button>
    </div>
  </div>
);
