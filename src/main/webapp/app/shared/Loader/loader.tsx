import React from 'react';
import { Modal } from 'reactstrap';

const Loader = ({ isDisplay = false }) => (
  <div>
    <Modal
      isOpen={isDisplay}
      fade={false}
      contentClassName="loading-content"
      modalClassName="loading-modal"
      backdropClassName="loader-backdrop"
    >
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </Modal>
  </div>
);

export default Loader;
