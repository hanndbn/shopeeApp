import { CONSTANTS } from 'app/config/constants';

export const FORM_MANAGER_CLASS = {
  LISTING_FORM: {
    id: 'FORM_MANAGER_CLASS_LISTING',
    fields: []
  },
  EDIT_FORM: {
    id: 'FORM_MANAGER_CLASS_EDITING',
    fields: [
      {
        fieldName: 'idSchool',
        fieldType: CONSTANTS.FORM_TYPE.TEXT,
        classWrapper: 'col-6',
        label: 'Mã trường học',
        labelClass: 'col-4',
        inputType: 'text',
        inputName: 'idSchool',
        inputClass: 'col-7',
        inputPlaceHolder: '',
        inputMaxLength: 32,
        inputReadOnly: true,
        required: true,
        validPattern: CONSTANTS.FORM_PATTERN.NAME,
        invalidPattern: CONSTANTS.FORM_PATTERN.SPECIAL_SYMBOL,
        typingPattern: '',
        invalidMessage: CONSTANTS.FORM_ERROR.NAME_ERROR
      },
      {
        fieldName: 'nameSchool',
        fieldType: CONSTANTS.FORM_TYPE.TEXT,
        classWrapper: 'col-6',
        label: 'Tên trường học',
        labelClass: 'col-4',
        inputType: 'text',
        inputName: 'nameSchool',
        inputClass: 'col-7',
        inputPlaceHolder: '',
        inputMaxLength: 32,
        inputReadOnly: true,
        required: true,
        validPattern: CONSTANTS.FORM_PATTERN.NAME,
        invalidPattern: CONSTANTS.FORM_PATTERN.SPECIAL_SYMBOL,
        typingPattern: '',
        invalidMessage: CONSTANTS.FORM_ERROR.NAME_ERROR
      },
      {
        fieldName: 'schoolYear',
        fieldType: CONSTANTS.FORM_TYPE.SELECT,
        classWrapper: 'col-6',
        label: 'Niên khóa',
        labelClass: 'col-4',
        defaultLabel: 'Select',
        inputName: 'class',
        inputClass: 'col-7',
        required: true,
        selectData: null
      },
      {
        fieldName: 'groupOfClass',
        fieldType: CONSTANTS.FORM_TYPE.SELECT,
        classWrapper: 'col-6',
        label: 'Khối lớp',
        labelClass: 'col-4',
        defaultLabel: 'Select',
        inputName: 'class',
        inputClass: 'col-7',
        required: true,
        selectData: null
      },
      {
        fieldName: 'typeClass',
        fieldType: CONSTANTS.FORM_TYPE.SELECT,
        classWrapper: 'col-6',
        label: 'Ban học',
        labelClass: 'col-4',
        defaultLabel: 'Select',
        inputName: 'class',
        inputClass: 'col-7',
        required: false,
        selectData: null
      },
      {
        fieldName: 'idClass',
        fieldType: CONSTANTS.FORM_TYPE.TEXT,
        classWrapper: 'col-6',
        label: 'Mã lớp học',
        labelClass: 'col-4',
        inputType: 'text',
        inputName: 'idClass',
        inputClass: 'col-7',
        inputPlaceHolder: '',
        inputMaxLength: 32,
        required: true,
        validPattern: CONSTANTS.FORM_PATTERN.NAME,
        invalidPattern: CONSTANTS.FORM_PATTERN.SPECIAL_SYMBOL,
        typingPattern: '',
        invalidMessage: CONSTANTS.FORM_ERROR.NAME_ERROR
      },
      {
        fieldName: 'nameClass',
        fieldType: CONSTANTS.FORM_TYPE.TEXT,
        classWrapper: 'col-6',
        label: 'Tên lớp học',
        labelClass: 'col-4',
        inputType: 'text',
        inputName: 'nameClass',
        inputClass: 'col-7',
        inputPlaceHolder: '',
        inputMaxLength: 32,
        required: true,
        validPattern: CONSTANTS.FORM_PATTERN.NAME,
        invalidPattern: CONSTANTS.FORM_PATTERN.SPECIAL_SYMBOL,
        typingPattern: '',
        invalidMessage: CONSTANTS.FORM_ERROR.NAME_ERROR
      },
      {
        fieldName: 'teacherManage',
        fieldType: CONSTANTS.FORM_TYPE.SELECT,
        classWrapper: 'col-6',
        label: 'Giáo viên chủ nhiệm',
        labelClass: 'col-4',
        defaultLabel: 'Select',
        inputName: 'teacherManage',
        inputClass: 'col-7',
        required: false,
        selectData: null
      },
      {
        fieldName: 'professionalClass',
        fieldType: CONSTANTS.FORM_TYPE.SELECT,
        classWrapper: 'col-6',
        label: 'Lớp chuyên',
        labelClass: 'col-4',
        defaultLabel: 'Select',
        inputName: 'professionalClass',
        inputClass: 'col-7',
        required: false,
        selectData: null
      },
      {
        fieldName: 'totalStudent',
        fieldType: CONSTANTS.FORM_TYPE.TEXT,
        classWrapper: 'col-6',
        label: 'Sĩ số',
        labelClass: 'col-4',
        inputType: 'text',
        inputName: 'totalStudent',
        inputClass: 'col-7',
        inputPlaceHolder: '',
        inputMaxLength: 32,
        inputReadOnly: true,
        required: false,
        validPattern: '',
        invalidPattern: '',
        typingPattern: '',
        invalidMessage: ''
      }
    ]
  }
};
