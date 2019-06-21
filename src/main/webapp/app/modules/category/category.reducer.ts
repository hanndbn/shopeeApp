import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
// import { BASE_IMG_URL, GET_CATEGORY_DATA } from 'app/config/constants';
import axios from 'axios';
import { GET_CATEGORY_DATA_URL } from 'app/config/constants';

const ACTION_TYPES = {
  GET_CATEGORY_DATA: 'Category/GET_CATEGORY_DATA',
  SET_ACTIVE_CATEGORY: 'Category/SET_ACTIVE_CATEGORY',
  SET_SETTING_ACTIVE_CATEGORY: 'Category/SET_SETTING_ACTIVE_CATEGORY',
  RESET: 'Category/RESET'
};

const initialState = {
  categoryData: [],
  activeCategory: null,
  loading: false,
  settingActiveCategory: false,
  requestFailure: false,
  errorMessage: null
};

export type CategoryState = Readonly<typeof initialState>;

// Reducer
export default (state: CategoryState = initialState, action): CategoryState => {
  switch (action.type) {
    case ACTION_TYPES.SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload
      };
    case ACTION_TYPES.SET_SETTING_ACTIVE_CATEGORY:
      return {
        ...state,
        settingActiveCategory: action.payload
      };
    case REQUEST(ACTION_TYPES.GET_CATEGORY_DATA):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.GET_CATEGORY_DATA):
      return {
        ...state,
        loading: false,
        categoryData: action.payload.data
      };
    case FAILURE(ACTION_TYPES.GET_CATEGORY_DATA):
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

export const requestCategoryData = () => async (dispatch, getState) => {
  await dispatch({
    type: ACTION_TYPES.GET_CATEGORY_DATA,
    payload: axios.get(GET_CATEGORY_DATA_URL)
  });
};

export const setActiveCategory = activeCategory => async (dispatch, getState) => {
  await dispatch({
    type: ACTION_TYPES.SET_SETTING_ACTIVE_CATEGORY,
    payload: true
  });
  await dispatch({
    type: ACTION_TYPES.SET_ACTIVE_CATEGORY,
    payload: activeCategory
  });
  await dispatch({
    type: ACTION_TYPES.SET_SETTING_ACTIVE_CATEGORY,
    payload: false
  });
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
