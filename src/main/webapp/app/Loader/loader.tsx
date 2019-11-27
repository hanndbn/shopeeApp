import React from 'react';
import { Modal } from 'reactstrap';
import './loader.scss';

const Loader = ({ isDisplay = false }) => (
  <div>
    <Modal
      isOpen={isDisplay}
      fade={false}
      contentClassName="loading-content"
      modalClassName="loading-modal"
      backdropClassName="loader-backdrop"
    >
      <div className="lds-spinner">
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
    </Modal>
  </div>
);

export default Loader;
