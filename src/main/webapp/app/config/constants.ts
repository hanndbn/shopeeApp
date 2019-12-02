const config = {
  VERSION: process.env.VERSION
};

export default config;

// export const SERVER_API_URL = 'hanndbn.000webhostapp.com';
export const SERVER_API_URL = 'https://us-central1-silverbullet-sandbox.cloudfunctions.net';

export const TITLE_HELMET = 'FLOW';
export const CONSTANT = {
  DEFAULT_RATIO: 19.5 / 9
};

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER'
};

export const messages = {
  DATA_ERROR_ALERT: 'Internal Error'
};

export const ABOUT_TABS = [
  {
    id: 'office',
    link: 'van-phong-thiet-ke',
    title: 'Văn phòng thiết kế'
  },
  {
    id: 'factory',
    link: 'xuong-noi-that',
    title: 'Xưởng nội thất'
  },
  {
    id: 'employee',
    link: 'nhan-su',
    title: 'Nhân sự'
  }
];

export const HEADER_LINK = [
  {
    title: 'Home',
    pathname: '/'
  },
  {
    title: 'Giới thiệu',
    pathname: '/about'
  },
  {
    title: 'Dự án',
    pathname: '/du-an'
  },
  {
    title: 'Tin tức',
    pathname: '/tin-tuc'
  },
  {
    title: 'Liên hệ',
    pathname: 'contact-us'
  }
];

export const SCREEN_PATH = {
  PROJECTS: '/du-an'
};

export const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDThh:mm';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';

export const GET_HOME_DATA_URL = SERVER_API_URL + '/api/viewApp';
export const SET_TRACKING_DATA = SERVER_API_URL + '/api/addTrackingApp';
export const GET_MODAL_LISTING_URL = SERVER_API_URL + '/api/editorModalListing';

export const CREATE_SESSION_ANALYTIC = SERVER_API_URL + '/api/createSessionAnalytic';
export const END_SESSION_ANALYTIC = SERVER_API_URL + '/api/endSessionAnalytic';

export const ELEMENT_TYPE = {
  TEXT: 'text',
  IMAGE: 'image',
  BUTTON: 'button',
  GAME: 'game',
  HOME: 'home',
  YOUTUBE: 'YOUTUBE',
  SPOTIFY: 'SPOTIFY',
  VIMEO: 'VIMEO',
  YOUTUBE_VERT: 'YOUTUBE_VERT',
  LINK: 'LINK',
  IMAGE_SLIDE: 'IMAGE_SLIDE',
  SOCIAL: 'SHARE_BUBBLE',
  PERSONAL_DESIGN_MANAGER: 'PERSONAL_DESIGN_MANAGER'
};
