import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
// import { BASE_IMG_URL, GET_INPUT_COMMON_DATA } from 'app/config/constants';
import axios from 'axios';

const ACTION_TYPES = {
  GET_INPUT_COMMON_DATA: 'InputCommon/GET_INPUT_COMMON_DATA',
  RESET: 'InputCommon/RESET'
};

const initialState = {
  inputCommonData: [],
  loading: false,
  requestFailure: false,
  errorMessage: null
};

export type InputCommonState = Readonly<typeof initialState>;

// Reducer
export default (state: InputCommonState = initialState, action): InputCommonState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_INPUT_COMMON_DATA):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.GET_INPUT_COMMON_DATA):
      return {
        ...state,
        loading: false,
        inputCommonData: action.payload.data
      };
    case FAILURE(ACTION_TYPES.GET_INPUT_COMMON_DATA):
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

export const requestInputCommonData = () => async (dispatch, getState) => {
  await dispatch({
    type: ACTION_TYPES.GET_INPUT_COMMON_DATA,
    payload: axios.get(``)
  });
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
