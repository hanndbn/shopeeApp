import { FAILURE, REQUEST, SUCCESS } from "app/shared/reducers/action-type.util";
// import { BASE_IMG_URL, GET_PROJECT_DETAIL_DATA } from 'app/config/constants';
import axios from "axios";
import { GET_PROJECT_DETAIL_DATA_URL } from "app/config/constants";

const ACTION_TYPES = {
  GET_PROJECT_DETAIL_DATA: "ProjectDetail/GET_PROJECT_DETAIL_DATA",
  SET_PROJECT_DETAIL_DATA_BAN_HANG: "ProjectDetail/SET_PROJECT_DETAIL_DATA_BAN_HANG",
  SET_PROJECT_DETAIL_DATA_TU_VAN: "ProjectDetail/SET_PROJECT_DETAIL_DATA_TU_VAN",
  RESET: "ProjectDetail/RESET"
};

const initialState = {
  projectDetailData: {},
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
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const requestProjectDetailData = id => async (dispatch, getState) => {
  await dispatch({
    type: ACTION_TYPES.GET_PROJECT_DETAIL_DATA,
    payload: axios.get(GET_PROJECT_DETAIL_DATA_URL + id)
  });
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
