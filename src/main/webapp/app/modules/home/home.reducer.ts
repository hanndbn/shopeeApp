import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { GET_HOME_DATA_URL, SET_TRACKING_DATA } from 'app/config/constants';
// import { BASE_IMG_URL, GET_HOME_DATA } from 'app/config/constants';
import axios from 'axios';
import moment from 'moment';

const ACTION_TYPES = {
  GET_HOME_DATA: 'Home/GET_HOME_DATA',
  SET_HOME_DATA: 'Home/SET_HOME_DATA',
  SET_TRACKING_ID: 'Home/SET_TRACKING_ID',
  SET_TIME_START: 'Home/SET_TIME_START',
  SET_CURRENT_IDX: 'Home/SET_CURRENT_IDX',
  RESET: 'Home/RESET'
};

const initialState = {
  homeData: {},
  trackingId: null,
  currentIdx: 0,
  timeStart: null,
  loading: false,
  requestFailure: false,
  errorMessage: null
};

export type HomeState = Readonly<typeof initialState>;

// Reducer
export default (state: HomeState = initialState, action): HomeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_HOME_DATA):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.GET_HOME_DATA):
      return {
        ...state,
        loading: false,
        homeData: action.payload.data
      };
    case FAILURE(ACTION_TYPES.GET_HOME_DATA):
      return {
        ...state,
        loading: false,
        requestFailure: true,
        errorMessage: action.payload.response.data.message
      };
    case ACTION_TYPES.SET_HOME_DATA:
      return {
        ...state,
        homeData: action.payload
      };
    case ACTION_TYPES.SET_TRACKING_ID:
      return {
        ...state,
        trackingId: action.payload
      };
    case ACTION_TYPES.SET_TIME_START:
      return {
        ...state,
        timeStart: action.payload
      };
    case ACTION_TYPES.SET_CURRENT_IDX:
      return {
        ...state,
        currentIdx: action.payload
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const requestHomeData = appId => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.GET_HOME_DATA,
    payload: axios.get(`${GET_HOME_DATA_URL}?appId=${appId}`)
  });
};

export const saveTrackingData = appId => async (dispatch, getState) => {
  const timeStart = getState().home.timeStart ? getState().home.timeStart : null;
  const currentIdx = getState().home.currentIdx;
  if (!timeStart || !appId) return;
  const displayTime = moment().diff(timeStart);
  let data: any = {
    appId, slide: `Slide${currentIdx + 1}`,
    time: displayTime
  };
  const trackingId = getState().home.trackingId ? getState().home.trackingId : null;
  if (trackingId) {
    data = {
      ...data,
      trackingId
    };
  }
  await axios.post(SET_TRACKING_DATA, data).then(response => {
    dispatch(setTrackingId(response.data.trackingId));
  });
  await setTimeStart(new Date());
};

export const setTrackingId = trackingId => ({
  type: ACTION_TYPES.SET_TRACKING_ID,
  payload: trackingId
});

export const setTimeStart = timeStart => ({
  type: ACTION_TYPES.SET_TIME_START,
  payload: timeStart
});

export const setCurrentIdx = idx => ({
  type: ACTION_TYPES.SET_CURRENT_IDX,
  payload: idx
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
