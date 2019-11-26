import React from 'react';
import { store } from 'app/index';
import { setDisplayModal } from 'app/shared/InfoModal/infoModal.reducer';
import { MESSAGES } from 'app/config/constants';

export const successLayout = (callback = null, option) => {
  const { title = MESSAGES.SUCCESS, message = '', labelConfirmBtn = MESSAGES.OK_BTN_LABEL } = option;
  return (
    <div className="row no-gutters info-modal-success">
      <div className="col-12 info-modal-header">
        <div className="custom-icon-success"/>
      </div>
      {
        (title || message) &&
        <div className="col-12 text-center p-3 mb-2">
          {title && <h4>{title}</h4>}
          {message && <div>{message}</div>}
        </div>
      }
      <div className="col-12 text-center mb-4">
        <button className="btn btn-common custom-btn-success"
                onClick={
                  () => {
                    store.dispatch(setDisplayModal(false));
                    callback && callback();
                  }
                }>
          {labelConfirmBtn}
        </button>
      </div>
    </div>
  );
};

export const errorLayout = (callback = null, option) => {
  const { title = MESSAGES.ERROR, message, labelConfirmBtn = MESSAGES.OK_BTN_LABEL } = option;
  return (
    <div className="row no-gutters info-modal-error">
      <div className="col-12 info-modal-header">
        <div className="custom-icon-error"/>
      </div>
      {
        (title || message) &&
        <div className="col-12 text-center p-3 mb-2">
          {title && <h4>{title}</h4>}
          {message && <div>{message}</div>}
        </div>
      }
      <div className="col-12 text-center mb-4">
        <button className="btn btn-common custom-btn-error"
                onClick={
                  () => {
                    store.dispatch(setDisplayModal(false));
                    callback && callback();
                  }
                }>{labelConfirmBtn}
        </button>
      </div>
    </div>
  );
};

export const warningLayout = (callback, option) => {
  const { title, message, labelCancelBtn = MESSAGES.CANCEL_BTN_LABEL, labelConfirmBtn = MESSAGES.OK_BTN_LABEL } = option;
  return (
    <div className="row no-gutters info-modal-warning">
      <div className="col-12 info-modal-header">
        <div className="custom-icon-warning"/>
      </div>
      {
        (title || message) &&
        <div className="col-12 text-center p-3 mb-2">
          {title && <h4>{title}</h4>}
          {message && <div>{message}</div>}
        </div>
      }
      <div className="col-12 text-center mb-4">
        <button className="btn btn-common custom-btn-cancel mr-2"
                onClick={
                  () => {
                    store.dispatch(setDisplayModal(false));
                  }
                }>{labelCancelBtn}
        </button>
        <button className="btn btn-common custom-btn-warning"
                onClick={
                  () => {
                    store.dispatch(setDisplayModal(false));
                    callback && callback();
                  }
                }>{labelConfirmBtn}
        </button>
      </div>
    </div>
  );
};
