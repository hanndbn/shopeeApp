import { FAILURE, SUCCESS, REQUEST } from "app/shared/reducers/action-type.util";
import axios from "axios";
// import { BASE_IMG_URL, GET_CAROUSEL_DATA } from 'app/config/constants';
import { Storage } from "react-jhipster";
// tslint:disable-next-line
const carousel1 = require("static/images/temp/healthy-girl-at-doctor-1920x500.jpg");
// tslint:disable-next-line
const carousel2 = require("static/images/temp/picture6.jpg");

const ACTION_TYPES = {
  GET_CAROUSEL_DATA: "Carousel/GET_CAROUSEL_DATA",
  RESET: "Carousel/RESET"
};

const initialState = {
  carouselData: [
    {
      imageUrl: carousel1
    },
    {
      imageUrl: carousel2
    }
  ],
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

// export const requestCarouselData = history => async (dispatch, getState) => {
//   const lang = `?lang=${getState().locale && getState().locale.currentLocale ? getState().locale.currentLocale : 'en'}`;
//   await dispatch({
//     type: ACTION_TYPES.GET_CAROUSEL_DATA,
//     payload: axios.get(GET_CAROUSEL_DATA + lang)
//   });
// };

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
