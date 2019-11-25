// import { BASE_IMG_URL, GET_CAROUSEL_DATA } from 'app/config/constants';

import { DEFAULT_FORM_DATA, REQUEST_API } from 'app/config/constants';
import { getGroupOfClass, getSchoolYear } from 'app/shared/util/util';
import axios from 'axios';
import { SUCCESS } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  RESET: 'Common/RESET',
  SET_LOADING: 'Common/SET_LOADING',
  SET_FULL_SCREEN: 'Common/SET_FULL_SCREEN',
  SET_DEFAULT_SELECT_FORM_DATA: 'Common/SET_DEFAULT_SELECT_FORM_DATA',
  GET_TEACHER_MANAGER: 'Common/GET_TEACHER_MANAGER'
};

const initialState = {
  defaultSelectFormData: {},
  loading: false,
  displayLoading: false,
  requestFailure: false,
  errorMessage: null,
  isFullScreen: false
};

export type CommonState = Readonly<typeof initialState>;

// Reducer
export default (state: CommonState = initialState, action): CommonState => {
  switch (action.type) {
    case ACTION_TYPES.SET_DEFAULT_SELECT_FORM_DATA:
      return {
        ...state,
        defaultSelectFormData: action.payload
      };
    case ACTION_TYPES.SET_FULL_SCREEN:
      return {
        ...state,
        isFullScreen: action.payload
      };
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        displayLoading: action.displayLoading
      };
    case SUCCESS(ACTION_TYPES.GET_TEACHER_MANAGER):
      return {
        ...state,
        defaultSelectFormData: {
          ...state.defaultSelectFormData,
          [action.meta.key]: action.payload.data.map(k => ({
            label: k.nameTeacher,
            value: k.teacherId
          }))
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
export const setDefaultSelectFormData = () => async (dispatch, getState) => {
  let defaultSelectFormData = {};
  const userInfo = getState().userInfo ? getState().userInfo : {};
  const degreeNumber = getState().userInfo && userInfo.schools ? userInfo.schools.degree_number : null;
  defaultSelectFormData = {
    ...defaultSelectFormData,
    typeClass: DEFAULT_FORM_DATA.typeClass,
    professionalClass: DEFAULT_FORM_DATA.professionalClass,
    groupOfClass: getGroupOfClass(degreeNumber),
    schoolYear: getSchoolYear()
  };
  dispatch({
    type: ACTION_TYPES.SET_DEFAULT_SELECT_FORM_DATA,
    payload: defaultSelectFormData
  });
};

export const getCommonReferData = () => async (dispatch, getState) => {
  const schoolId = getState().userInfo.schools[0].id;
  await dispatch({
    type: ACTION_TYPES.GET_TEACHER_MANAGER,
    payload: axios.get(`${REQUEST_API.GET_TEACHER_MANAGER}/${schoolId}`),
    meta: {
      key: 'teacherManage'
    }
  });
};

export const setFullScreen = isFullScreen => ({
  type: ACTION_TYPES.SET_FULL_SCREEN,
  payload: isFullScreen
});
export const setDisplayLoading = displayLoading => ({
  type: ACTION_TYPES.SET_LOADING,
  displayLoading
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
