import React from 'react';
import './infoModal.scss';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { setDisplayModal } from 'app/shared/InfoModal/infoModal.reducer';

export interface IInfoModalProp extends StateProps, DispatchProps {
  hideModal: Function;
}

export class InfoModal extends React.Component<IInfoModalProp> {
  render() {
    const { hideModal } = this.props;
    const isDisplay = this.props.isDisplay ? this.props.isDisplay : false;
    const modalContent = this.props.modalContent ? this.props.modalContent : '';
    const extendClass = this.props.extendClass ? this.props.extendClass : '';
    const toggleModal = this.props.toggleModal;
    return (
      <Modal
        isOpen={isDisplay}
        toggle={() => toggleModal && hideModal()}
        contentClassName="info-modal-content"
        modalClassName={`info-modal ${extendClass}`}
      >
        <div className="row no-gutters">
          <div className="col-12 info-content">{modalContent}</div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = ({ infoModal }: IRootState) => ({
  isDisplay: infoModal.displayModal,
  modalContent: infoModal.modalContent,
  extendClass: infoModal.extendClass,
  toggleModal: infoModal.toggleModal
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideModal: () => {
    dispatch(setDisplayModal(false));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InfoModal)
);
