import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
// import { BASE_IMG_URL, GET_PROJECTS_DATA } from 'app/config/constants';
import axios from 'axios';
import { GET_PROJECTS_DATA_URL } from 'app/config/constants';

const ACTION_TYPES = {
  GET_PROJECTS_DATA: 'Projects/GET_PROJECTS_DATA',
  SET_PROJECTS_DATA_BAN_HANG: 'Projects/SET_PROJECTS_DATA_BAN_HANG',
  SET_PROJECTS_DATA_TU_VAN: 'Projects/SET_PROJECTS_DATA_TU_VAN',
  RESET: 'Projects/RESET'
};

const initialState = {
  projectsData: [],
  loading: false,
  requestFailure: false,
  errorMessage: null
};

export type ProjectsState = Readonly<typeof initialState>;

// Reducer
export default (state: ProjectsState = initialState, action): ProjectsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_PROJECTS_DATA):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.GET_PROJECTS_DATA):
      return {
        ...state,
        loading: false,
        projectsData: action.payload.data
      };
    case FAILURE(ACTION_TYPES.GET_PROJECTS_DATA):
      return {
        ...initialState,
        loading: false,
        requestFailure: true,
        errorMessage: action.error
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const requestProjectsData = category => async (dispatch, getState) => {
  await dispatch({
    type: ACTION_TYPES.GET_PROJECTS_DATA,
    payload: axios.get(`${GET_PROJECTS_DATA_URL}${category ? `&categories=${category}` : ''}`)
  });
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
