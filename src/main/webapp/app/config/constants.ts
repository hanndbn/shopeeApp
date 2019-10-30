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

export const SCREEN_PATH = {
  PROJECTS: '/du-an'
};

export const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDThh:mm';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';

export const GET_NHAPDIEM_DATA = '/api/student/points';
