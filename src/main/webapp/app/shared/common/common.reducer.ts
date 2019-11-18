// import { BASE_IMG_URL, GET_CAROUSEL_DATA } from 'app/config/constants';

import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import axios from 'axios';
import { CREATE_SESSION_ANALYTIC, END_SESSION_ANALYTIC, GET_MODAL_LISTING_URL } from 'app/config/constants';

export const ACTION_TYPES = {
  RESET: 'Common/RESET',
  SET_LOADING: 'Common/SET_LOADING',
  GET_MODAL_LISTING: 'Common/GET_MODAL_LISTING'
};

const initialState = {
  modalListing: [],
  loading: false,
  displayLoading: false,
  requestFailure: false,
  errorMessage: null
};

export type CommonState = Readonly<typeof initialState>;

// Reducer
export default (state: CommonState = initialState, action): CommonState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_MODAL_LISTING):
      return {
        ...state
      };
    case SUCCESS(ACTION_TYPES.GET_MODAL_LISTING):
      return {
        ...state,
        modalListing: action.payload.data.data
      };
    case FAILURE(ACTION_TYPES.GET_MODAL_LISTING):
      return {
        ...state
      };
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        displayLoading: action.displayLoading
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const animationDisplayLoading = () => async (dispatch, getState) => {
  await dispatch(setDisplayLoading(true));
  await new Promise(resolve => setTimeout(resolve, 1000));
  await dispatch(setDisplayLoading(false));
};

export const getModalListing = () => ({
  type: ACTION_TYPES.GET_MODAL_LISTING,
  payload: axios.get(GET_MODAL_LISTING_URL)
});

export const setDisplayLoading = displayLoading => ({
  type: ACTION_TYPES.SET_LOADING,
  displayLoading
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
