import { FAILURE, SUCCESS, REQUEST } from "app/shared/reducers/action-type.util";
import axios from "axios";
// import { BASE_IMG_URL, GET_CAROUSEL_DATA } from 'app/config/constants';
import { Storage } from "react-jhipster";

const ACTION_TYPES = {
  GET_CAROUSEL_DATA: "Carousel/GET_CAROUSEL_DATA",
  SET_CAROUSEL_DATA_BAN_HANG: "Carousel/SET_CAROUSEL_DATA_BAN_HANG",
  RESET: "Carousel/RESET"
};

const initialState = {
  carouselData: [
    {
      imageUrl: "content/images/temp/healthy-girl-at-doctor-1920x500.jpg"
    },
    {
      imageUrl: "content/images/temp/picture6.jpg"
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
    case ACTION_TYPES.SET_CAROUSEL_DATA_BAN_HANG:
      return {
        ...state,
        carouselData: [
          {
            imageUrl: "https://cf.shopee.sg/file/dd2709711cb69b05049d0161b2054996"
          },
          {
            imageUrl: "https://cf.shopee.sg/file/769078b40e93f84afb277c354dc38015"
          }
        ]
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

export const setCarouselBanHang = () => ({
  type: ACTION_TYPES.SET_CAROUSEL_DATA_BAN_HANG
});
