import React from 'react';

export const ConfirmDeleteLayout = (callback = null) => (
  <div className="row">
    <div className="col-12">
      <i className="fal fa-check-circle"/>
    </div>
    <div
      className="col-12 text-center g-margin-bottom-30"> Your password has been changed successfully.
    </div>
    <div className="col-12 text-center g-margin-bottom-30">
      Ok
    </div>
  </div>
);
