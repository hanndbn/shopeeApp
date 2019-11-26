import { CONSTANTS } from 'app/config/constants';

export const FORM_LOGIN = {
  id: 'FORM_LOGIN',
  fields: [
    {
      fieldName: 'email',
      fieldType: CONSTANTS.FORM_TYPE.TEXT,
      classWrapper: 'col-12',
      label: 'Tên đăng nhập',
      labelClass: 'col-12 text-center mb-1',
      inputType: 'text',
      inputName: 'email',
      inputClass: 'col-12',
      inputPlaceHolder: '',
      inputMaxLength: 32,
      required: true,
      validPattern: CONSTANTS.FORM_PATTERN.TEXT,
      invalidPattern: '',
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
      validPattern: CONSTANTS.FORM_PATTERN.TEXT_50,
      invalidMessage: CONSTANTS.FORM_ERROR.PASSWORD_ERROR
    },
    {
      fieldName: 'remember',
      fieldType: CONSTANTS.FORM_TYPE.CHECKBOX,
      classWrapper: 'col-12 mb-4',
      label: 'Lưu lại mật khẩu',
      labelClass: '',
      isRevertLabel: false,
      inputName: 'remember',
      inputClass: ''
    }
  ]
};
