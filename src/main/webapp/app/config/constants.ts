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
  },
  {
    id: 'activity',
    link: 'hoat-dong',
    title: 'Hoạt động'
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

export const GET_CAROUSEL_DATA_URL = '/wp-json/acf/v3/carousel?per_page=100';
export const GET_CATEGORY_DATA_URL = '/wp-json/wp/v2/categories?per_page=100';
export const GET_PROJECTS_DATA_URL = '/wp-json/wp/v2/projects?per_page=100';
export const GET_PROJECT_DETAIL_DATA_URL = '/wp-json/wp/v2/projects/';
export const POST_CONTACT_US_URL = '/wp-json/wp/v2/comments';
export const GET_CONTACT_US_ADDRESS_URL = '/wp-json/wp/v2/contact-us';
export const GET_ABOUT_DATA_URL = '/wp-json/wp/v2/about';
