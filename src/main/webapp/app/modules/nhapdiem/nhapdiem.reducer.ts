import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
// import { BASE_IMG_URL, GET_NHAPDIEM_DATA } from 'app/config/constants';

const ACTION_TYPES = {
  GET_NHAPDIEM_DATA: 'NhapDiem/GET_NHAPDIEM_DATA',
  SET_PAGE_NUMBER: 'Search/SET_PAGE_NUMBER',
  RESET: 'NhapDiem/RESET'
};

const initialState = {
  nhapDiemData: [],
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

export type NhapDiemState = Readonly<typeof initialState>;

// Reducer
export default (state: NhapDiemState = initialState, action): NhapDiemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_NHAPDIEM_DATA):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.GET_NHAPDIEM_DATA):
      return {
        ...state,
        loading: false,
        nhapDiemData: action.payload.data
      };
    case FAILURE(ACTION_TYPES.GET_NHAPDIEM_DATA):
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

export const requestNhapDiemData = () => async (dispatch, getState) => {
  const lang = getState().locale && getState().locale.currentLocale ? getState().locale.currentLocale : 'en';
  const q = getState().search.searchInput;
  const pagination = {
    ...getState().search.pagination,
    pageNumber: getState().search.pagination.pageNumber
  };
  // await dispatch({
  //   type: ACTION_TYPES.GET_NHAPDIEM_DATA,
  //   payload: axios.get(GET_NHAPDIEM_DATA, { pagination, lang })
  // });
};

export const setPageNumber = pageNumber => ({
  type: ACTION_TYPES.SET_PAGE_NUMBER,
  payload: pageNumber
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
