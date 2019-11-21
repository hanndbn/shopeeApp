import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
// import { BASE_IMG_URL, GET_USER_INFO_DATA } from 'app/config/constants';
import axios from 'axios';
import { validateForm } from 'app/modules/inputCommon/inputCommon.reducer';
import { FORM_DEFINE } from 'app/config/constants';

const ACTION_TYPES = {
  GET_USER_INFO_DATA: 'UserInfo/GET_USER_INFO_DATA',
  SET_USER_INFO_ROLE: 'UserInfo/SET_USER_INFO_ROLE',
  RESET: 'UserInfo/RESET'
};

const initialState = {
  userInfoData: {
    schoolId: 'SS005'
  },
  userInfoRole: 'STUDENT',
  loading: false,
  requestFailure: false,
  errorMessage: null
};

export type UserInfoState = Readonly<typeof initialState>;

// Reducer
export default (state: UserInfoState = initialState, action): UserInfoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_USER_INFO_DATA):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.GET_USER_INFO_DATA):
      return {
        ...state,
        loading: false,
        userInfoData: action.payload.data
      };
    case FAILURE(ACTION_TYPES.GET_USER_INFO_DATA):
      return {
        ...state,
        loading: false,
        requestFailure: true,
        errorMessage: action.error
      };
    case ACTION_TYPES.SET_USER_INFO_ROLE:
      return {
        ...state,
        userInfoRole: action.payload
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const requestUserInfo = () => async (dispatch, getState) => {
  // const isValid = await dispatch(validateForm('FORM_USER_INFO', FORM_DEFINE.FORM_USER_INFO));
  // if (isValid) {
  //   await dispatch({
  //     type: ACTION_TYPES.GET_USER_INFO_DATA,
  //     payload: axios.get(``)
  //   });
  // }
};

export const setUserInfoRole = userInfoRole => ({
  type: ACTION_TYPES.SET_USER_INFO_ROLE,
  payload: userInfoRole
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
