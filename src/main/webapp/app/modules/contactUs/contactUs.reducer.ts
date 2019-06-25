import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { GET_CONTACT_US_ADDRESS_URL, POST_CONTACT_US_URL } from 'app/config/constants';
import axios from 'axios';
// import { BASE_IMG_URL, GET_CONTACT_US_DATA } from 'app/config/constants';

const ACTION_TYPES = {
  POST_CONTACT_US: 'ContactUs/POST_CONTACT_US',
  GET_CONTACT_US_ADDRESS: 'ContactUs/GET_CONTACT_US_ADDRESS',
  SET_INPUT: 'ContactUs/SET_INPUT',
  RESET: 'ContactUs/RESET'
};

const initialState = {
  contactUsAddressData: [],
  input: {
    post: 153,
    author_name: '',
    author_email: '',
    content: ''
  },
  loading: false,
  postLoading: false,
  requestFailure: false,
  requestSuccess: false,
  errorMessage: null
};

export type ContactUsState = Readonly<typeof initialState>;

// Reducer
export default (state: ContactUsState = initialState, action): ContactUsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_CONTACT_US_ADDRESS):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.GET_CONTACT_US_ADDRESS):
      return {
        ...state,
        loading: false,
        contactUsAddressData: action.payload.data
      };
    case FAILURE(ACTION_TYPES.GET_CONTACT_US_ADDRESS):
      return {
        ...state,
        contactUsAddressData: [],
        loading: false
      };
    case REQUEST(ACTION_TYPES.POST_CONTACT_US):
      return {
        ...state,
        requestSuccess: false,
        requestFailure: false,
        errorMessage: '',
        postLoading: true
      };
    case SUCCESS(ACTION_TYPES.POST_CONTACT_US):
      return {
        ...state,
        // @ts-ignore
        input: initialState.input,
        requestSuccess: true,
        postLoading: false
      };
    case FAILURE(ACTION_TYPES.POST_CONTACT_US):
      return {
        ...state,
        postLoading: false,
        requestFailure: true,
        errorMessage: action.payload && action.payload.response && action.payload.response.data ? `${action.payload.response.data.message}` : ''
      };
    case ACTION_TYPES.SET_INPUT:
      return {
        ...state,
        requestSuccess: false,
        requestFailure: false,
        input: {
          ...state.input,
          [action.fieldName]: action.value
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const postContactUs = id => async (dispatch, getState) => {
  const input = {
    ...getState().contactUs.input,
    post: id ? id : getState().contactUs.input.post
  };

  await dispatch({
    type: ACTION_TYPES.POST_CONTACT_US,
    payload: axios.post(POST_CONTACT_US_URL, input
    )
  });
};

export const getContactUsAddress = () => async (dispatch, getState) => {
  await dispatch({
    type: ACTION_TYPES.GET_CONTACT_US_ADDRESS,
    payload: axios.get(GET_CONTACT_US_ADDRESS_URL)
  });
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const setInput = (fieldName, value) => ({
  type: ACTION_TYPES.SET_INPUT,
  fieldName,
  value
});
