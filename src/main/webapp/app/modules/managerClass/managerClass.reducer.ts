import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import axios from 'axios';
import { REQUEST_API } from 'app/config/constants';
import { clearForm, copyDataToInput, copyRequireDataToInput, validateForm } from 'app/modules/inputCommon/inputCommon.reducer';
import { FORM_MANAGER_CLASS } from 'app/modules/managerClass/formDefine';
// import { BASE_IMG_URL, GET_MANAGER_CLASS_DATA } from 'app/config/constants';

const ACTION_TYPES = {
  GET_MANAGER_CLASS_DATA: 'ManagerClass/GET_MANAGER_CLASS_DATA',
  CLEAR_MANAGER_CLASS_DATA: 'ManagerClass/CLEAR_MANAGER_CLASS_DATA',
  GET_MANAGER_CLASS_DETAIL_DATA: 'ManagerClass/GET_MANAGER_CLASS_DETAIL_DATA',
  SET_REFER_DATA: 'ManagerClass/SET_REFER_DATA',
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
      pageSize: 5,
      sort: {}
    }
  },
  // detail screen params
  managerClassDetail: {},
  referData: {},
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
    // start get refer data
    // case SUCCESS(ACTION_TYPES.GET_TEACHER_MANAGER):
    //   return {
    //     ...state,
    //     referData: {
    //       ...state.referData,
    //       [ action.meta.key ]: action.payload.data
    //     }
    //   };
    // end get refer data
    case ACTION_TYPES.CLEAR_MANAGER_CLASS_DATA:
      return {
        ...state,
        managerClassData: [],
        pagination: initialState.pagination
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
  const schoolId = getState().userInfo.schools[ 0 ].id;
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

export const requestManagerClassDetailData = activeId => async (dispatch, getState) => {
  await dispatch(clearForm(FORM_MANAGER_CLASS.EDIT_FORM.id));
  if (activeId) {
    await dispatch({
      type: ACTION_TYPES.GET_MANAGER_CLASS_DETAIL_DATA,
      payload: axios.get(`${REQUEST_API.GET_MANAGER_CLASS_DETAIL}/${activeId}`)
    });
    const managerClassDetail = getState().managerClass.managerClassDetail;
    await dispatch(copyDataToInput(FORM_MANAGER_CLASS.EDIT_FORM.id, managerClassDetail));
  }
  const school = getState().userInfo.schools ? getState().userInfo.schools[ 0 ] : {};
  const _idSchool = school._id ? school._id : '';
  const idSchool = school.id ? school.id : '';
  const nameSchool = school.name ? school.name : '';
  dispatch(copyRequireDataToInput(FORM_MANAGER_CLASS.EDIT_FORM.id, {
    _idSchool, idSchool, nameSchool
  }));
};

export const getReferData = () => async (dispatch, getState) => {
  // const schoolId = getState().userInfo.schools[ 0 ].id;
  // await dispatch({
  //   type: ACTION_TYPES.GET_TEACHER_MANAGER,
  //   payload: axios.get(`${REQUEST_API.GET_TEACHER_MANAGER}/${schoolId}`),
  //   meta: {
  //     key: 'teacherManager'
  //   }
  // });
};

export const submitData = history => async (dispatch, getState) => {
  const isValid = await dispatch(validateForm(FORM_MANAGER_CLASS.EDIT_FORM.id, FORM_MANAGER_CLASS.EDIT_FORM.fields));
  if (isValid) {
    const formInputValue = getState().inputCommon.inputValue[ FORM_MANAGER_CLASS.EDIT_FORM.id ];
    FORM_MANAGER_CLASS.EDIT_FORM.fields.filter(v => !formInputValue.hasOwnProperty(v.fieldName))
      .map(v => {
        formInputValue[ v.fieldName ] = '';
      });
    const existedId = formInputValue._id;
    axios({
      method: existedId ? 'PUT' : 'POST',
      url: REQUEST_API.GET_MANAGER_CLASS_DETAIL,
      data: formInputValue
    })
      .then(response => {
        // handle success
        console.log(response);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  } else {
    console.log('data invalid');
  }
};

export const clearManagerClassData = () => ({
  type: ACTION_TYPES.CLEAR_MANAGER_CLASS_DATA
});

export const setPageNumber = pageNumber => ({
  type: ACTION_TYPES.SET_PAGE_NUMBER,
  payload: pageNumber
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
