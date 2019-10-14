import React from 'react';
import qs from 'querystring';
import { setDisplayModal } from 'app/InfoModal/infoModal.reducer';
import { store } from 'app/index';

export const paramObj = search => {
  const parsed = decodeURIComponent(search.replace(/[?]/g, '')).replace(/\+/g, ' ');
  return qs.parse(parsed);
};

export const modalUrlLayout = (url = '') => (
  <div className="row no-gutters">
    <div className="col-12 modal-header">
      <div className="modal-header-content">Modal</div>
    </div>
    <div className="col-12 no-padding">
      <iframe src={url} className="custom-iframe"/>
    </div>
    <div className="col-12 text-right custom-modal-footer">
      <button
        className="btn btn-common btn-submit"
        onClick={async () => {
          await store.dispatch(setDisplayModal(false));
        }}
      >
        OK
      </button>
    </div>
  </div>
);
