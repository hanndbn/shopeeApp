import React from 'react';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { reset } from 'app/InfoModal/infoModal.reducer';

export interface IInfoModalProp extends StateProps, DispatchProps {
  hideModal: Function;
}

export class InfoModal extends React.Component<IInfoModalProp> {
  render() {
    const { displayModal, modalContent, extendClass, hideModal } = this.props;
    const toggleModal = this.props.toggleModal;
    return (
      <Modal
        isOpen={displayModal}
        toggle={() => toggleModal && hideModal()}
        contentClassName="info-modal-content container-fluid"
        modalClassName={`info-modal ${extendClass}`}
      >
        {modalContent}
      </Modal>
    );
  }
}

const mapStateToProps = ({ infoModal }: IRootState) => ({
  toggleModal: infoModal.displayModal,
  displayModal: infoModal.displayModal,
  modalContent: infoModal.modalContent,
  extendClass: infoModal.extendClass
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideModal: async () => {
    await dispatch(reset());
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
