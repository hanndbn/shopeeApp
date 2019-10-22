// import { BASE_IMG_URL, GET_CAROUSEL_DATA } from 'app/config/constants';

export const ACTION_TYPES = {
  RESET: 'Common/RESET',
  SET_LOADING: 'Common/SET_LOADING',
  SET_FULL_SCREEN: 'Common/SET_FULL_SCREEN'
};

const initialState = {
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
