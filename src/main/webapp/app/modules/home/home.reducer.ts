import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { GET_HOME_DATA_URL } from 'app/config/constants';
// import { BASE_IMG_URL, GET_HOME_DATA } from 'app/config/constants';
import axios from 'axios';

const ACTION_TYPES = {
  GET_HOME_DATA: 'Home/GET_HOME_DATA',
  SET_HOME_DATA: 'Home/SET_HOME_DATA',
  RESET: 'Home/RESET'
};

const initialState = {
  homeData: {},
  loading: false,
  requestFailure: false,
  errorMessage: null
};

export type HomeState = Readonly<typeof initialState>;

// Reducer
export default (state: HomeState = initialState, action): HomeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_HOME_DATA):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.GET_HOME_DATA):
      return {
        ...state,
        loading: false,
        homeData: action.payload.data
      };
    case FAILURE(ACTION_TYPES.GET_HOME_DATA):
      return {
        ...state,
        loading: false,
        requestFailure: true,
        errorMessage: action.payload.response.data.message
      };
    case ACTION_TYPES.SET_HOME_DATA:
      return {
        ...state,
        homeData: action.payload
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const requestHomeData = appId => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.GET_HOME_DATA,
    payload: axios.get(`${GET_HOME_DATA_URL}?appId=${appId}`)
  });
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
