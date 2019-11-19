import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
// import { BASE_IMG_URL, GET_MANAGER_CLASS_DATA } from 'app/config/constants';

const ACTION_TYPES = {
  GET_MANAGER_CLASS_DATA: 'ManagerClass/GET_MANAGER_CLASS_DATA',
  SET_PAGE_NUMBER: 'Search/SET_PAGE_NUMBER',
  RESET: 'ManagerClass/RESET'
};

const initialState = {
  managerClassData: [],
  loading: false,
  requestFailure: false,
  errorMessage: null,
  pagination: {
    total: 0,
    totalPage: 0,
    page: {
      page: 1,
      pageSize: 12,
      sort: {}
    }
  }
};

export type ManagerClassState = Readonly<typeof initialState>;

// Reducer
export default (state: ManagerClassState = initialState, action): ManagerClassState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_MANAGER_CLASS_DATA):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.GET_MANAGER_CLASS_DATA):
      return {
        ...state,
        loading: false,
        managerClassData: action.payload.data
      };
    case FAILURE(ACTION_TYPES.GET_MANAGER_CLASS_DATA):
      return {
        ...initialState,
        loading: false,
        requestFailure: true,
        errorMessage: action.error
      };
    case ACTION_TYPES.SET_PAGE_NUMBER:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: {
            ...state.pagination.page,
            page: action.payload
          }
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

export const requestManagerClassData = () => async (dispatch, getState) => {
  const lang = getState().locale && getState().locale.currentLocale ? getState().locale.currentLocale : 'en';
  const q = getState().search.searchInput;
  const pagination = {
    ...getState().search.pagination,
    pageNumber: getState().search.pagination.pageNumber
  };
  // await dispatch({
  //   type: ACTION_TYPES.GET_MANAGER_CLASS_DATA,
  //   payload: axios.get(GET_MANAGER_CLASS_DATA, { pagination, lang })
  // });
};

export const setPageNumber = pageNumber => ({
  type: ACTION_TYPES.SET_PAGE_NUMBER,
  payload: pageNumber
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
