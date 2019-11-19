import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
// import { BASE_IMG_URL, GET_LOGIN_DATA } from 'app/config/constants';
import axios from 'axios';

const ACTION_TYPES = {
  GET_LOGIN_DATA: 'Login/GET_LOGIN_DATA',
  SET_LOGIN_ROLE: 'Login/SET_LOGIN_ROLE',
  RESET: 'Login/RESET'
};

const initialState = {
  loginData: [],
  loginRole: 'STUDENT',
  loading: false,
  requestFailure: false,
  errorMessage: null
};

export type LoginState = Readonly<typeof initialState>;

// Reducer
export default (state: LoginState = initialState, action): LoginState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_LOGIN_DATA):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.GET_LOGIN_DATA):
      return {
        ...state,
        loading: false,
        loginData: action.payload.data
      };
    case FAILURE(ACTION_TYPES.GET_LOGIN_DATA):
      return {
        ...state,
        loading: false,
        requestFailure: true,
        errorMessage: action.error
      };
    case ACTION_TYPES.SET_LOGIN_ROLE:
      return {
        ...state,
        loginRole: action.payload
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const requestLoginData = () => async (dispatch, getState) => {
  await dispatch({
    type: ACTION_TYPES.GET_LOGIN_DATA,
    payload: axios.get(``)
  });
};

export const setLoginRole = loginRole => ({
  type: ACTION_TYPES.SET_LOGIN_ROLE,
  payload: loginRole
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
