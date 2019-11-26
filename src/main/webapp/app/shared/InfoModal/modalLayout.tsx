import React from 'react';
import { store } from 'app/index';
import { setDisplayModal } from 'app/shared/InfoModal/infoModal.reducer';

export const confirmDeleteLayout = (title, message, callback = null) => (
  <div className="row no-gutters info-modal-success">
    <div className="col-12 info-modal-header">
      <div className="custom-icon-success"/>
    </div>
    <div className="col-12 text-center p-3 mb-2">
      <h4>{title}</h4>
      <div>{message}</div>
    </div>
    <div className="col-12 text-center mb-4">
      <button className="btn btn-common custom-btn-success"
              onClick={
                () => {
                  store.dispatch(setDisplayModal(false));
                  callback && store.dispatch(callback());
                }
              }>
        OK
      </button>
    </div>
  </div>
);

export const errorLayout = (title, message, callback = null) => (
  <div className="row no-gutters info-modal-error">
    <div className="col-12 info-modal-header">
      <div className="custom-icon-error"/>
    </div>
    <div className="col-12 text-center p-3 mb-2">
      <h4>{title}</h4>
      <div>{message}</div>
    </div>
    <div className="col-12 text-center mb-4">
      <button className="btn btn-common custom-btn-error"
              onClick={
                () => {
                  store.dispatch(setDisplayModal(false));
                  callback && store.dispatch(callback());
                }
              }>Close
      </button>
    </div>
  </div>
);

export const warningLayout = (title, message, callback = null) => (
  <div className="row no-gutters info-modal-warning">
    <div className="col-12 info-modal-header">
      <div className="custom-icon-warning"/>
    </div>
    <div className="col-12 text-center p-3 mb-2">
      <h4>{title}</h4>
      <div>{message}</div>
    </div>
    <div className="col-12 text-center mb-4">
      <button className="btn btn-common custom-btn-cancel mr-2"
              onClick={
                () => {
                  store.dispatch(setDisplayModal(false));
                }
              }>Cancel
      </button>
      <button className="btn btn-common custom-btn-warning"
              onClick={
                () => {
                  store.dispatch(setDisplayModal(false));
                  callback && store.dispatch(callback());
                }
              }>Close
      </button>
    </div>
  </div>
);
