// import { BASE_IMG_URL, GET_CAROUSEL_DATA } from 'app/config/constants';

const ACTION_TYPES = {
  RESET: 'Common/RESET',
  SET_LOADING: 'Common/SET_LOADING',
  SET_HEADER_BACKGROUND: 'Common/SET_HEADER_BACKGROUND'
};

const initialState = {
  loading: false,
  displayLoading: false,
  headerBackground: 'transparent url(https://ambient.elated-themes.com/wp-content/uploads/2017/03/footer-image-new.jpg)',
  requestFailure: false,
  errorMessage: null
};

export type CommonState = Readonly<typeof initialState>;

// Reducer
export default (state: CommonState = initialState, action): CommonState => {
  switch (action.type) {
    case ACTION_TYPES.SET_HEADER_BACKGROUND:
      return {
        ...state,
        headerBackground: action.headerBackground
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

export const setHeaderBackground = headerBackground => ({
  type: ACTION_TYPES.SET_HEADER_BACKGROUND,
  headerBackground
});
export const setDisplayLoading = displayLoading => ({
  type: ACTION_TYPES.SET_LOADING,
  displayLoading
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
