import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
// import { BASE_IMG_URL, GET_CAROUSEL_DATA } from 'app/config/constants';
import axios from 'axios';
import { GET_CAROUSEL_DATA_URL } from 'app/config/constants';

const ACTION_TYPES = {
  GET_CAROUSEL_DATA: 'Carousel/GET_CAROUSEL_DATA',
  SET_CAROUSEL_DATA_BAN_HANG: 'Carousel/SET_CAROUSEL_DATA_BAN_HANG',
  SET_CAROUSEL_DATA_TU_VAN: 'Carousel/SET_CAROUSEL_DATA_TU_VAN',
  RESET: 'Carousel/RESET'
};

const initialState = {
  carouselData: [],
  loading: false,
  requestFailure: false,
  errorMessage: null
};

export type CarouselState = Readonly<typeof initialState>;

// Reducer
export default (state: CarouselState = initialState, action): CarouselState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_CAROUSEL_DATA):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.GET_CAROUSEL_DATA):
      return {
        ...state,
        loading: false,
        carouselData: action.payload.data
      };
    case FAILURE(ACTION_TYPES.GET_CAROUSEL_DATA):
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

export const requestCarouselData = history => async (dispatch, getState) => {
  await dispatch({
    type: ACTION_TYPES.GET_CAROUSEL_DATA,
    payload: axios.get(GET_CAROUSEL_DATA_URL)
  });
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
