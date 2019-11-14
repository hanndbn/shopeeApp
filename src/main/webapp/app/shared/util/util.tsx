import React from 'react';
import qs from 'querystring';
import { setDisplayModal } from 'app/InfoModal/infoModal.reducer';
import { store } from 'app/index';
import { getMediaContent } from 'app/modules/home/home.reducer';
import _ from 'lodash';

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
