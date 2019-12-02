import { modalMediaLayout, modalPDMLayoutError, modalPDMLayoutSuccess, modalUrlLayout } from 'app/shared/util/util';

const ACTION_TYPES = {
  RESET: 'infoModal/RESET',
  SET_DISPLAY_MODAL: 'infoModal/SET_DISPLAY_MODAL',
  SET_MODAL_CONTENT: 'infoModal/SET_MODAL_CONTENT'
};

const initialState = {
  displayModal: false,
  modalContent: '',
  extendClass: '',
  toggleModal: true
};

export type InfoModalState = Readonly<typeof initialState>;

// Reducer
export default (state: InfoModalState = initialState, action): InfoModalState => {
  switch (action.type) {
    case ACTION_TYPES.SET_DISPLAY_MODAL:
      return {
        ...state,
        displayModal: action.payload
      };
    case ACTION_TYPES.SET_MODAL_CONTENT:
      return {
        ...state,
        modalContent: action.modalContent,
        extendClass: action.extendClass,
        toggleModal: action.toggleModal
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const setDisplayModal = displayModal => ({
  type: ACTION_TYPES.SET_DISPLAY_MODAL,
  payload: displayModal
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const setModalContent = (modalContent, extendClass = '', toggleModal = true) => ({
  type: ACTION_TYPES.SET_MODAL_CONTENT,
  modalContent,
  extendClass,
  toggleModal
});

export const displayModalUrl = (url = '') => async (dispatch, getState) => {
  dispatch(setModalContent(modalUrlLayout(url)));
  dispatch(setDisplayModal(true));
};

export const displayModalMedia = (type, content) => async (dispatch, getState) => {
  dispatch(setModalContent(modalMediaLayout(type, content)));
  dispatch(setDisplayModal(true));
};

export const displayModalPDMSuccess = appName => async (dispatch, getState) => {
  dispatch(setModalContent(modalPDMLayoutSuccess(appName)));
  dispatch(setDisplayModal(true));
};

export const displayModalPDMError = () => async (dispatch, getState) => {
  dispatch(setModalContent(modalPDMLayoutError()));
  dispatch(setDisplayModal(true));
};
