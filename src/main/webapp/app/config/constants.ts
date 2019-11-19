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

export const messages = {
  DATA_ERROR_ALERT: 'Internal Error'
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
  }
};

export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDThh:mm';
