const config = {
  VERSION: process.env.VERSION
};

export default config;

// export const SERVER_API_URL = 'hanndbn.000webhostapp.com';
export const SERVER_API_URL = process.env.SERVER_API_URL;

export const TITLE_HELMET = 'PYRAMIDS';

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER'
};

export const MESSAGES = {
  DATA_ERROR_ALERT: 'Internal Error',
  CANCEL_BTN_LABEL: 'Cancel',
  OK_BTN_LABEL: 'OK',
  DELETE_BTN_LABEL: 'Delete',
  SUCCESS: 'Success',
  ERROR: 'Error',
  WARNING: 'Warning',
  ADD_RECORD_SUCCESS: 'Thêm mới bản ghi thành công!',
  EDIT_RECORD_SUCCESS: 'Cập nhật bản ghi thành công!',
  DELETE_RECORD_SUCCESS: 'Xóa bản ghi thành công!',
  ADD_RECORD_ERROR: 'Có lỗi xảy ra trong quá trình thêm mới bản ghi!',
  EDIT_RECORD_ERROR: 'Có lỗi xảy ra trong quá trình cập nhật bản ghi!',
  DELETE_RECORD_ERROR: 'Có lỗi xảy ra trong quá trình xóa bản ghi!',
  DELETE_WARNING: '',
  DELETE_MESSAGE: 'Bạn có chắc chắn muốn xóa bản ghi này?'
};
export const CONSTANTS = {
    LIST_ROLE: {
      ADMIN: {
        title: 'ADMIN',
        imgSrc: 'content/images/login-admin.png'
      },
      TEACHER: {
        title: 'GIÁO VIÊN',
        imgSrc: 'content/images/login-teacher.png'
      },
      STUDENT: {
        title: 'HỌC SINH',
        imgSrc: 'content/images/login-student.png'
      },
      PARENT: {
        title: 'PHỤ HUYNH',
        imgSrc: 'content/images/login-parent.png'
      }
    },
    FORM_TYPE: {
      TEXT: 'text',
      PASSWORD: 'password',
      EMAIL: 'email',
      DATE_MONTH_YEAR: 'dateMonthYear',
      SELECT: 'select',
      COUNTRY_CALLING_CODE: 'countryCallingCode',
      SELECT_WITHOUT_ERROR: 'selectWithoutError',
      TEXT_AREA: 'textArea',
      ATTACHMENT: 'attachment',
      SELECT_CONTACT_US: 'selectContactUs',
      CHECKBOX: 'checkbox',
      DISPLAY_NONE: 'none'
    },
    FORM_ERROR: {
      VALID: '',
      EMPTY_ERROR: 'This field is required',
      FULL_NAME_ERROR: 'Maximum 100 characters with no special characters',
      NAME_ERROR: 'Maximum 32 characters with no special characters',
      TEXT_ERROR: 'Maximum 50 characters with no special characters',
      COMPANY_NAME_ERROR: 'Maximum 50 characters',
      TEXT_34_ERROR: 'Maximum 34 characters with no special characters',
      TEXT_35_ERROR: 'Maximum 35 characters with no special characters',
      ADDRESS_ERROR: 'Maximum 50 characters with no special characters',
      FEEDBACK_ERROR: 'Maximum 2000 characters',
      ONLY_TEXT_ERROR: 'This field only contain digits, English alphabets, underscores.',
      PROMOTION_CODE_ERROR: 'It must be 10 characters with only digits and English alphabets.',
      PHONE_ERROR: 'Invalid phone number',
      OTHER_NUMBER_ERROR: 'Maximum 20 characters with no special characters',
      POST_CODE_ERROR: 'Maximum 5 characters with only digits.',
      PASSWORD_ERROR: 'Must contain at least 8 or more characters',
      EMAIL_ERROR: 'Invalid email address',
      LOGIN_ERROR: 'Wrong Email or Password'
    },
    FORM_PATTERN: {
      NONE: '',
      NUMBER: '^[0-9]+$',
      // NUMBER_DECIMAL: '((\d{0,3},)?(\d{3},)?\d{0,3})+(?:\.\d{0,2})?$',
      NUMBER_DECIMAL: '^\([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$',
      NUMBER_POINT: '^[0-9,]+$',
      TEXT: '^.{0,50}$',
      TEXT_35: '^.{0,35}$',
      TEXT_34: '^.{0,34}$',
      TEXT_50: '^.{0,50}$',
      NAME: '^.{1,32}$',
      FULL_NAME: '^[A-Za-z0-9_ ]{3,100}$',
      FEEDBACK: '^.{1,2000}$',
      NAME1: '^[A-Za-z0-9_ ]{3,30}$',
      PROMOTION_CODE: '^[A-Za-z0-9_]{10}$',
      PHONE: '^[0-9]{8,30}$',
      ORDER_NUMBER: '^.{0,20}$',
      SUB_ORDER_NUMBER: '^.{0,25}$',
      POST_CODE: '^[0-9]{0,6}$',
      EMAIL:
        '^(("[\\w-\\s]+")|([\\w-]+(?:\\.[\\w-]+)*)|("[\\w-\\s]+")([\\w-]+(?:\\.[\\w-]+)*))(@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-zA-Z]{2,6}(?:\\.[a-zA-Z]{2})?)$)|' +
        '(@\\[?((25[0-5]\\.|2[0-4][0-9]\\.|1[0-9]{2}\\.|[0-9]{1,2}\\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\]?$)',
      PASSWORD: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
      PASSWORD_2: '^.{8,32}$',
      ONLY_TEXT: '^[A-Za-z0-9_ ]{0,30}$',
      SPECIAL_SYMBOL: '[`!@#$%^&*(),-/~=+;\\\'.?":{}|\\\\<>\\[\\]]',
      SUB_SPECIAL_SYMBOL: '[`!@#$%^&*(),/~=+;\\\'.?":{}|\\\\<>\\[\\]]',
      COMPANY_SPECIAL_SYMBOL: '[`!@$%^&*(),-/~=+;\\\'.?":{}|\\\\<>\\[\\]]',
      SPECIAL_SYMBOL_FULL_NAME: '[`!@#$%^&*(),-/~=+;_\\\'.?":{}|\\\\<>\\[\\]]',
      SPECIAL_SYMBOL_SHORT: '[`!@$%^&*()~=+;\\\'.?":{}|\\\\<>\\[\\]]',
      ADDRESS_SPECIAL_SYMBOL_SHORT: '[`!@$%^&*~=+;\\\'?":{}|\\\\<>\\[\\]]'
    }
  }
;

export const DEFAULT_FORM_DATA = {
  typeClass: [
    {
      value: 'CB',
      label: 'Ban Cơ Bản'
    },
    {
      value: 'NC',
      label: 'Ban Nâng Cao'
    },
    {
      value: 'NK',
      label: 'Năng Khiếu'
    }
  ],
  professionalClass: [
    {
      value: 'true',
      label: 'Có'
    },
    {
      value: 'false',
      label: 'Không'
    }
  ]
};
export const FORM_DEFINE = {
  FORM_LOGIN: {
    id: 'FORM_LOGIN',
    fields: [
      {
        fieldName: 'userName',
        fieldType: CONSTANTS.FORM_TYPE.TEXT,
        classWrapper: 'col-12',
        label: 'Tên đăng nhập',
        labelClass: 'col-12 text-center mb-1',
        inputType: 'text',
        inputName: 'userName',
        inputClass: 'col-12',
        inputPlaceHolder: '',
        inputMaxLength: 32,
        required: true,
        validPattern: CONSTANTS.FORM_PATTERN.NAME,
        invalidPattern: CONSTANTS.FORM_PATTERN.SPECIAL_SYMBOL,
        typingPattern: '',
        invalidMessage: CONSTANTS.FORM_ERROR.NAME_ERROR
      },
      {
        fieldName: 'password',
        fieldType: CONSTANTS.FORM_TYPE.TEXT,
        classWrapper: 'col-12',
        label: 'Mật Khẩu',
        labelClass: 'col-12 text-center mb-1',
        inputType: 'password',
        inputName: 'password',
        inputClass: 'col-12',
        inputPlaceHolder: '',
        inputMaxLength: 32,
        required: true,
        validPattern: CONSTANTS.FORM_PATTERN.PASSWORD_2,
        invalid_msg: CONSTANTS.FORM_ERROR.PASSWORD_ERROR
      },
      {
        fieldName: 'remember',
        fieldType: CONSTANTS.FORM_TYPE.CHECKBOX,
        classWrapper: 'col-12 mt-2',
        label: 'Lưu lại mật khẩu',
        labelClass: '',
        isRevertLabel: false,
        inputName: 'remember',
        inputClass: ''
      }
    ]
  }
};

export const REQUEST_API = {
  GET_MANAGER_CLASS_DATA: 'http://171.244.0.59:3000/api/classes/info',
  GET_MANAGER_CLASS_DETAIL: 'http://171.244.0.59:3000/api/classes',
  GET_TEACHER_MANAGER: 'http://171.244.0.59:3000/api/teacher/getBySchoolId'
};

export const SCREEN_PATH = {
  MANAGER_CLASS: '/quan-ly-lop-hoc'
};
