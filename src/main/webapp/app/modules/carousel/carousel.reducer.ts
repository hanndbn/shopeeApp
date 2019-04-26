import { FAILURE, SUCCESS, REQUEST } from "app/shared/reducers/action-type.util";
import axios from "axios";
// import { BASE_IMG_URL, GET_CAROUSEL_DATA } from 'app/config/constants';
import { Storage } from "react-jhipster";

const ACTION_TYPES = {
  GET_CAROUSEL_DATA: "Carousel/GET_CAROUSEL_DATA",
  SET_CAROUSEL_DATA_BAN_HANG: "Carousel/SET_CAROUSEL_DATA_BAN_HANG",
  SET_CAROUSEL_DATA_TU_VAN: "Carousel/SET_CAROUSEL_DATA_TU_VAN",
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
            imageUrl: "content/images/temp/businessbanner.jpg"
          },
          {
            imageUrl: "content/images/temp/FILE_EE53ED-6D353A-974A4C-9F6564-B766B7-7E963B.jpg"
          }
        ]
      };
    case ACTION_TYPES.SET_CAROUSEL_DATA_TU_VAN:
      return {
        ...state,
        carouselData: [
          {
            imageUrl: "content/images/temp/picture6.jpg"
          },
          {
            imageUrl: "content/images/temp/healthy-girl-at-doctor-1920x500.jpg"
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

export const setCarouselBanHangTuVan = () => ({
  type: ACTION_TYPES.SET_CAROUSEL_DATA_TU_VAN
});
