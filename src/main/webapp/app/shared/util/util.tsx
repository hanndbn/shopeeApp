import React from 'react';
import qs from 'querystring';
import { setDisplayModal } from 'app/InfoModal/infoModal.reducer';
import { store } from 'app/index';
import _ from 'lodash';
import { SERVER_HOSTING_URL } from 'app/config/constants';

export const paramObj = search => {
  const parsed = decodeURIComponent(search.replace(/[?]/g, '')).replace(/\+/g, ' ');
  return qs.parse(parsed);
};

export const modalUrlLayout = (url = '') => (
  <div className="row no-gutters">
    <div className="col-12 modal-header">
      <div className="modal-header-content">Modal</div>
    </div>
    <div className="col-12 no-padding content-wrapper">
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

export const modalMediaLayout = (type, content) => {
  const label = _.startCase(type ? _.toLower(type.replace('_', ' ')) : '');

  return (
    <div className="row no-gutters">
      <div className="col-12 modal-header">
        <div className="modal-header-content">{label} Content</div>
      </div>
      <div className="col-12 content-wrapper content-media-wrapper">
        <div className="w-100 h-100" dangerouslySetInnerHTML={{ __html: content }}/>
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
};

export const modalPDMLayoutSuccess = appName => {
  const url = `${SERVER_HOSTING_URL}/${appName}`;
  return (
    <div className="row no-gutters">
      <div className="col-12 modal-header">
        <div className="modal-header-content">Personalised App</div>
      </div>
      <div className="col-12 content-wrapper content-media-wrapper  p-3">
        <a className="w-100 h-100 text-danger" target="_blank" href={url}>{url}</a>
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
};

export const modalPDMLayoutError = () => {
  const errorMessage = '';
  return (
    <div className="row no-gutters">
      <div className="col-12 modal-header">
        <div className="modal-header-content">Personalised App</div>
      </div>
      <div className="col-12 content-wrapper content-media-wrapper p-3 text-danger">
        Have Problem when generate app. Please try again later!
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
};
