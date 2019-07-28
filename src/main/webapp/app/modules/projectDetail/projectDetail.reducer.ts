import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { GET_PROJECT_DETAIL_DATA_URL } from 'app/config/constants';
// import { BASE_IMG_URL, GET_PROJECT_DETAIL_DATA } from 'app/config/constants';
import axios from 'axios';

const ACTION_TYPES = {
  GET_PROJECT_DETAIL_DATA: 'ProjectDetail/GET_PROJECT_DETAIL_DATA',
  SET_NEXT_PREVIOUS_DATA: 'ProjectDetail/SET_NEXT_PREVIOUS_DATA',
  SET_PROJECT_DETAIL_DATA: 'ProjectDetail/SET_PROJECT_DETAIL_DATA',
  RESET: 'ProjectDetail/RESET'
};

const initialState = {
  projectDetailData: {},
  projectNextPreviousData: {
    next: null,
    previous: null
  },
  loading: false,
  requestFailure: false,
  errorMessage: null
};

export type ProjectDetailState = Readonly<typeof initialState>;

// Reducer
export default (state: ProjectDetailState = initialState, action): ProjectDetailState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_PROJECT_DETAIL_DATA):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.GET_PROJECT_DETAIL_DATA):
      return {
        ...state,
        loading: false,
        projectDetailData: action.payload.data
      };
    case FAILURE(ACTION_TYPES.GET_PROJECT_DETAIL_DATA):
      return {
        ...state,
        loading: false,
        requestFailure: true,
        errorMessage: action.error
      };
    case ACTION_TYPES.SET_PROJECT_DETAIL_DATA:
      return {
        ...state,
        projectDetailData: action.payload
      };
    case ACTION_TYPES.SET_NEXT_PREVIOUS_DATA:
      return {
        ...state,
        projectNextPreviousData: action.payload
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const requestProjectDetailData = id => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.GET_PROJECT_DETAIL_DATA,
    payload: axios.get(GET_PROJECT_DETAIL_DATA_URL + id)
  });
  const projectsData = getState().projects.projectsData ? getState().projects.projectsData : [];
  let activeProjectIdx = null;
  projectsData.map((project, idx) => {
    if (project.id.toString() === id) {
      activeProjectIdx = idx;
    }
  });
  if (activeProjectIdx !== null) {
    dispatch(setNextPreviousData({
      previous: (activeProjectIdx - 1 >= 0) && projectsData[activeProjectIdx - 1] ? projectsData[activeProjectIdx - 1].id : null,
      next: (activeProjectIdx + 1 <= projectsData.length - 1) && projectsData[activeProjectIdx + 1] ? projectsData[activeProjectIdx + 1].id : null
    }));
  }
};

export const setNextPreviousData = projectNextPreviousData => ({
  type: ACTION_TYPES.SET_NEXT_PREVIOUS_DATA,
  payload: projectNextPreviousData
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
