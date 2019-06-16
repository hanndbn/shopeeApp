import { FAILURE, REQUEST, SUCCESS } from "app/shared/reducers/action-type.util";
// import { BASE_IMG_URL, GET_CAROUSEL_DATA } from 'app/config/constants';

const ACTION_TYPES = {
  GET_CAROUSEL_DATA: "ContactUs/GET_CAROUSEL_DATA",
  SET_CAROUSEL_DATA_BAN_HANG: "ContactUs/SET_CAROUSEL_DATA_BAN_HANG",
  SET_CAROUSEL_DATA_TU_VAN: "ContactUs/SET_CAROUSEL_DATA_TU_VAN",
  RESET: "ContactUs/RESET"
};

const initialState = {
  contactUsData: [
    {
      imageUrl: "content/images/temp/classic-home-slider-image.jpg"
    },
    {
      imageUrl: "content/images/temp/classic-home-slider-image-3.jpg"
    }
  ],
  loading: false,
  requestFailure: false,
  errorMessage: null
};

export type ContactUsState = Readonly<typeof initialState>;

// Reducer
export default (state: ContactUsState = initialState, action): ContactUsState => {
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
        contactUsData: action.payload.data
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
        contactUsData: [
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
        contactUsData: [
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

// export const requestContactUsData = history => async (dispatch, getState) => {
//   const lang = `?lang=${getState().locale && getState().locale.currentLocale ? getState().locale.currentLocale : 'en'}`;
//   await dispatch({
//     type: ACTION_TYPES.GET_CAROUSEL_DATA,
//     payload: axios.get(GET_CAROUSEL_DATA + lang)
//   });
// };

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const setContactUsBanHang = () => ({
  type: ACTION_TYPES.SET_CAROUSEL_DATA_BAN_HANG
});

export const setContactUsBanHangTuVan = () => ({
  type: ACTION_TYPES.SET_CAROUSEL_DATA_TU_VAN
});
