import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
// import { BASE_IMG_URL, GET_ABOUT_DATA } from 'app/config/constants';
import axios from 'axios';
import { GET_ABOUT_DATA_URL } from 'app/config/constants';

const ACTION_TYPES = {
  SET_ACTIVE_TAB: 'About/SET_ACTIVE_TAB',
  GET_ABOUT_DATA: 'About/GET_ABOUT_DATA',
  RESET: 'About/RESET'
};

const initialState = {
  aboutData: [],
  activeTab: 0,
  loading: false,
  requestFailure: false,
  errorMessage: null
};

export type AboutState = Readonly<typeof initialState>;

// Reducer
export default (state: AboutState = initialState, action): AboutState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_ABOUT_DATA):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.GET_ABOUT_DATA):
      return {
        ...state,
        loading: false,
        aboutData: action.payload.data
      };
    case FAILURE(ACTION_TYPES.GET_ABOUT_DATA):
      return {
        ...state,
        loading: false,
        requestFailure: true,
        errorMessage: action.error
      };
    case ACTION_TYPES.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
;

export const requestAboutData = () => async (dispatch, getState) => {
  await dispatch({
    type: ACTION_TYPES.GET_ABOUT_DATA,
    payload: axios.get(`${GET_ABOUT_DATA_URL}`)
  });
};

export const setActiveTab = activeTab => ({
  type: ACTION_TYPES.SET_ACTIVE_TAB,
  payload: activeTab
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
