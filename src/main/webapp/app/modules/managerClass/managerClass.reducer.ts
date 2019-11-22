import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import axios from 'axios';
import { FORM_DEFINE, REQUEST_API } from 'app/config/constants';
import { copyDataToInput } from 'app/modules/inputCommon/inputCommon.reducer';
// import { BASE_IMG_URL, GET_MANAGER_CLASS_DATA } from 'app/config/constants';

const ACTION_TYPES = {
  GET_MANAGER_CLASS_DATA: 'ManagerClass/GET_MANAGER_CLASS_DATA',
  CLEAR_MANAGER_CLASS_DATA: 'ManagerClass/CLEAR_MANAGER_CLASS_DATA',
  GET_MANAGER_CLASS_DETAIL_DATA: 'ManagerClass/GET_MANAGER_CLASS_DETAIL_DATA',
  SET_ACTIVE_ID: 'ManagerClass/SET_ACTIVE_ID',
  SET_PAGE_NUMBER: 'ManagerClass/SET_PAGE_NUMBER',
  RESET: 'ManagerClass/RESET'
};

const initialState = {
  // listing screen params
  managerClassData: [],
  pagination: {
    total: 0,
    totalPage: 0,
    page: {
      page: 0,
      pageSize: 2,
      sort: {}
    }
  },
  // detail screen params
  activeId: null,
  managerClassDetail: {},

  // shared params
  loading: false,
  requestFailure: false,
  errorMessage: null
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
        managerClassData: action.payload.data.data,
        pagination: {
          ...state.pagination,
          total: action.payload.data.total,
          totalPage: action.payload.data.totalPage,
          page: {
            ...state.pagination.page,
            page: action.payload.data.page.page
          }
        }
      };
    case FAILURE(ACTION_TYPES.GET_MANAGER_CLASS_DATA):
      return {
        ...state,
        loading: false,
        requestFailure: true,
        errorMessage: action.error
      };
    case REQUEST(ACTION_TYPES.GET_MANAGER_CLASS_DETAIL_DATA):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.GET_MANAGER_CLASS_DETAIL_DATA):
      return {
        ...state,
        loading: false,
        managerClassDetail: action.payload.data
      };
    case FAILURE(ACTION_TYPES.GET_MANAGER_CLASS_DETAIL_DATA):
      return {
        ...state,
        loading: false,
        requestFailure: true,
        errorMessage: action.error
      };
    case ACTION_TYPES.CLEAR_MANAGER_CLASS_DATA:
      return {
        ...state,
        managerClassData: [],
        pagination: initialState.pagination
      };
    case ACTION_TYPES.SET_ACTIVE_ID:
      return {
        ...state,
        activeId: action.payload
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

export const requestManagerClassData = () => (dispatch, getState) => {
  const pagination = getState().managerClass.pagination;
  const schoolId = getState().userInfo.userInfoData.schoolId;
  const params = {
    pageSize: pagination.page.pageSize,
    page: pagination.page.page,
    criteria: {
      school_id: schoolId
    }
  };
  dispatch({
    type: ACTION_TYPES.GET_MANAGER_CLASS_DATA,
    payload: axios.get(REQUEST_API.GET_MANAGER_CLASS_DATA, { params })
  });
};

export const requestManagerClassDetailData = () => async (dispatch, getState) => {
  // const pagination = {
  //   ...getState().search.pagination,
  //   pageNumber: getState().search.pagination.pageNumber
  // };
  await dispatch({
    type: ACTION_TYPES.GET_MANAGER_CLASS_DETAIL_DATA,
    payload: axios.get(REQUEST_API.GET_MANAGER_CLASS_DETAIL)
  });
  const managerClassDetail = getState().managerClass.managerClassDetail;
  dispatch(copyDataToInput(FORM_DEFINE.FORM_MANAGER_CLASS.id, managerClassDetail));
};

export const clearManagerClassData = () => ({
  type: ACTION_TYPES.CLEAR_MANAGER_CLASS_DATA
});

export const setPageNumber = pageNumber => ({
  type: ACTION_TYPES.SET_PAGE_NUMBER,
  payload: pageNumber
});

export const setActiveId = activeId => ({
  type: ACTION_TYPES.SET_ACTIVE_ID,
  payload: activeId
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
