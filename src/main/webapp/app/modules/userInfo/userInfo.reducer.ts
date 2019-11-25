import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
// import { BASE_IMG_URL, GET_USER_INFO_DATA } from 'app/config/constants';

const ACTION_TYPES = {
  GET_USER_INFO_DATA: 'UserInfo/GET_USER_INFO_DATA',
  SET_USER_INFO_ROLE: 'UserInfo/SET_USER_INFO_ROLE',
  RESET: 'UserInfo/RESET'
};

const initialState = {
  user: {
    '_id': '5d42fb9edd74ca3e92157cc1',
    'userId': 'mai_ss005_admin',
    'name': 'Mai Vu',
    'phone': '123123123',
    'email': 'mai_ss005_admin@email.com',
    'address': '',
    'passport': '',
    'typeUser': 'QTV',
    'degree': '',
    'password': '$2a$10$3IW7xjdBbJIugWS4xlPzQ.22NHe.g6LXhxe3M3LmxQwn4NZRYVkbS',
    'avatar': '',
    'userRole': {
      '_id': '5d42fb9edd74ca3e92157cc0',
      'nameSchool': '',
      'idSchool': 'SS005',
      'nameClassManage': '',
      'nameClassTeach': '',
      'nameClassStudy': '',
      'roleName': '',
      'roleId': 'xlqm9n',
      'subjectNameTeach': '',
      'status': 'A',
      '__v': 0
    },
    'createDate': '2019-08-01T14:47:58.855Z',
    'lastUpdateDate': '2019-08-01T14:47:58.855Z',
    '__v': 0
  },
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDJmYjllZGQ3NGNhM2U5MjE1N2NjMSIsIm5hbWUiOiJNYWkgVnUiLCJhdmF0YXIiOiIiLCJ0eXBlIjoiVSIsImlhdCI6MTU3NDQxMjQ0MCwiZXhwIjoxNTc0NDE2MDQwfQ.DJdzfhW3MTcRniTHhimPTPbkjeHl5eJRAqecx-YIxSk',
  role: {
    '_id': '5d0a6bb428e1fe01aa4c1b69',
    'role_id': 'xlqm9n',
    'name': 'All Access Rights',
    'type_user': 'P',
    'rights': [
      {
        '_id': '5d0a6bb428e1fe01aa4c1b7e',
        'tabIndex': 0,
        'id': 'manageSchool',
        'name': 'Quản lý trường học',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b7d',
        'tabIndex': 0,
        'id': 'manageClass',
        'name': 'Quản lý lớp học',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b7c',
        'tabIndex': 0,
        'id': 'manageStudent',
        'name': 'Quản lý học sinh',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b7b',
        'tabIndex': 0,
        'id': 'manageTeacher',
        'name': 'Quản lý giáo viên',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b7a',
        'tabIndex': 1,
        'id': 'manageGroupSubject',
        'name': 'Quản lý tổ môn',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b79',
        'tabIndex': 1,
        'id': 'manageSubject',
        'name': 'Quản lý môn học',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b78',
        'tabIndex': 1,
        'id': 'managePlanTeacher',
        'name': 'Quản lý kế hoạch giáo viên',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b77',
        'tabIndex': 1,
        'id': 'managePoint',
        'name': 'Quản lý nhập điểm',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b76',
        'tabIndex': 2,
        'id': 'manageQuestionPack',
        'name': 'Quản lý gói câu hỏi',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b75',
        'tabIndex': 2,
        'id': 'manageTopic',
        'name': 'Quản lý chuyên đề',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b74',
        'tabIndex': 2,
        'id': 'manageQuestion',
        'name': 'Quản lý câu hỏi',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b73',
        'tabIndex': 2,
        'id': 'manageExamination',
        'name': 'Quản lý đề thi/kiểm tra',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b72',
        'tabIndex': 2,
        'id': 'manageCheckExamination',
        'name': 'Quản lý phúc khảo',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b71',
        'tabIndex': 3,
        'id': 'manageCommon',
        'name': 'Cài đặt chung',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b70',
        'tabIndex': 3,
        'id': 'manageRoleApprove',
        'name': 'Phân quyền phê duyệt',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b6f',
        'tabIndex': 3,
        'id': 'manageRolePhucKhao',
        'name': 'Phân quyền xử lý phúc khảo',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b6e',
        'tabIndex': 3,
        'id': 'manageRoleUser',
        'name': 'Người dùng',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b6d',
        'tabIndex': 3,
        'id': 'manageRole',
        'name': 'Quyền hạn',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b6c',
        'tabIndex': 4,
        'id': 'manageApproveChangePoint',
        'name': 'Phê duyệt yêu cầu chuyển điểm',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b6b',
        'tabIndex': 4,
        'id': 'manageApproveExam',
        'name': 'Phê duyệt đề thi',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      },
      {
        '_id': '5d0a6bb428e1fe01aa4c1b6a',
        'tabIndex': 4,
        'id': 'manageApproveQuestion',
        'name': 'Phê duyệt câu hỏi',
        'view': true,
        'update': true,
        'delete': true,
        'create': true
      }
    ],
    'school_id': '',
    'create_date': '2019-06-19T17:07:00.184Z',
    '__v': 0
  },
  schools: [
    {
      '_id': '5d42fb2edd74ca3e92157cbf',
      'id': 'SS005',
      'name': 'THPT Xuân Trường',
      'degree_number': '3',
      'type': 'Dân lập',
      'website': '',
      'phone': '123123124',
      'fax': '123123124',
      'email': 'ss005@email.com',
      'standard_school': true,
      'standard_year': '2019 - 2020',
      'city': 'NAD',
      'district': 'HXT',
      'address': 'Xuân Hồng, Xuân Trường, NĐ',
      'contact': '',
      'create_date': '2019-08-01T14:46:06.259Z',
      '__v': 0
    }
  ],
  userInfoRole: 'STUDENT',
  loading: false,
  requestFailure: false,
  errorMessage: null
};

export type UserInfoState = Readonly<typeof initialState>;

// Reducer
export default (state: UserInfoState = initialState, action): UserInfoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_USER_INFO_DATA):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.GET_USER_INFO_DATA):
      return {
        ...state,
        loading: false,
        ...action.payload.data
      };
    case FAILURE(ACTION_TYPES.GET_USER_INFO_DATA):
      return {
        ...state,
        loading: false,
        requestFailure: true,
        errorMessage: action.error
      };
    case ACTION_TYPES.SET_USER_INFO_ROLE:
      return {
        ...state,
        userInfoRole: action.payload
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const requestUserInfo = () => async (dispatch, getState) => {
  // const isValid = await dispatch(validateForm('FORM_USER_INFO', FORM_DEFINE.FORM_USER_INFO));
  // if (isValid) {
  //   await dispatch({
  //     type: ACTION_TYPES.GET_USER_INFO_DATA,
  //     payload: axios.get(``)
  //   });
  // }
};

export const setUserInfoRole = userInfoRole => ({
  type: ACTION_TYPES.SET_USER_INFO_ROLE,
  payload: userInfoRole
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
