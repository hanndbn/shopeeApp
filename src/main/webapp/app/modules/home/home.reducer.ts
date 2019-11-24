import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { CREATE_SESSION_ANALYTIC, ELEMENT_TYPE, END_SESSION_ANALYTIC, GET_HOME_DATA_URL, SET_TRACKING_DATA } from 'app/config/constants';
// import { BASE_IMG_URL, GET_HOME_DATA } from 'app/config/constants';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import xmldom from 'xmldom';

const DOMParser = xmldom.DOMParser;

const ACTION_TYPES = {
  GET_HOME_DATA: 'Home/GET_HOME_DATA',
  SET_HOME_DATA: 'Home/SET_HOME_DATA',
  SET_TRACKING_ID: 'Home/SET_TRACKING_ID',
  SET_TIME_START: 'Home/SET_TIME_START',
  SET_CURRENT_IDX: 'Home/SET_CURRENT_IDX',
  SET_APP_ID: 'Home/SET_APP_ID',
  SET_ACTIVE_SLIDE_ID: 'Home/SET_ACTIVE_SLIDE_ID',
  SET_WINDOW_SIZE: 'Home/SET_WINDOW_SIZE',
  SET_SCROLL_POSITION: 'Home/SET_SCROLL_POSITION',
  SET_EXTERNAL_DATA: 'Home/SET_EXTERNAL_DATA',
  GET_ANALYTIC_ID: 'Home/GET_ANALYTIC_ID',
  SET_SLIDE_FLIPPED: 'SET_SLIDE_FLIPPED',
  RESET: 'Home/RESET'
};

const initialState = {
  data: {},
  activeSlideId: null,
  appId: null,
  slideFlipped: [],
  trackingId: null,
  analyticTrackingId: null,
  currentIdx: 0,
  timeStart: null,
  windowSize: null,
  loading: false,
  requestFailure: false,
  errorMessage: null,
  scrollPosition: 100,
  externalData: {}
};

export type HomeState = Readonly<typeof initialState>;

// Reducer
export default (state: HomeState = initialState, action): HomeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_HOME_DATA):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.GET_HOME_DATA):
      return {
        ...state,
        loading: false,
        data: action.data,
        appId: action.appId
      };
    case FAILURE(ACTION_TYPES.GET_HOME_DATA):
      return {
        ...state,
        loading: false,
        requestFailure: true,
        errorMessage: action.payload.response.data.message
      };
    case REQUEST(ACTION_TYPES.GET_ANALYTIC_ID):
      return {
        ...state,
        analyticTrackingId: null
      };
    case SUCCESS(ACTION_TYPES.GET_ANALYTIC_ID):
      return {
        ...state,
        analyticTrackingId: action.payload.data.analyticTrackingId
      };
    case ACTION_TYPES.SET_EXTERNAL_DATA:
      return {
        ...state,
        externalData: {
          ...state.externalData,
          [action.id]: {
            ...state.externalData[action.id],
            [action.dataType]: action.data
          }
        }
      };
    case ACTION_TYPES.SET_HOME_DATA:
      return {
        ...state,
        data: action.payload
      };
    case ACTION_TYPES.SET_TRACKING_ID:
      return {
        ...state,
        trackingId: action.payload
      };
    case ACTION_TYPES.SET_TIME_START:
      return {
        ...state,
        timeStart: action.payload
      };
    case ACTION_TYPES.SET_CURRENT_IDX:
      return {
        ...state,
        currentIdx: action.payload
      };
    case ACTION_TYPES.SET_ACTIVE_SLIDE_ID:
      return {
        ...state,
        activeSlideId: action.payload
      };
    case ACTION_TYPES.SET_WINDOW_SIZE:
      return {
        ...state,
        windowSize: action.payload
      };
    case ACTION_TYPES.SET_SCROLL_POSITION:
      return {
        ...state,
        scrollPosition: action.payload
      };
    case ACTION_TYPES.SET_SLIDE_FLIPPED:
      return {
        ...state,
        slideFlipped: action.payload
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const requestHomeData = appName => (dispatch, getState) => {
  dispatch({
    type: REQUEST(ACTION_TYPES.GET_HOME_DATA)
  });

  axios.get(`${GET_HOME_DATA_URL}?appName=${appName}`)
    .then(async response => {
      // handle success
      const content = response.data.content ? response.data.content : '';
      const doc = new DOMParser().parseFromString(content, 'text/xml');
      if (doc) {
        const node = doc.documentElement;
        const data = {
          root: {},
          elements: [],
          relation: []
        };
        await decode(node, data);
        const firstSlide = data.elements.find(v => v.isFirstSlide);
        await dispatch(setActiveSlideId(firstSlide ? firstSlide.id : data.elements[0] ? data.elements[0].id : null));
        await dispatch({
          type: SUCCESS(ACTION_TYPES.GET_HOME_DATA),
          appId: response.data.appId,
          data
        });
        dispatch(getExternalData(data.elements));
        dispatch(createSessionAnalytic(response.data.appId));
      }
    })
    .catch(error => {
      // handle error
      dispatch({
        type: FAILURE(ACTION_TYPES.GET_HOME_DATA)
      });
    });
};

export const getExternalData = (elements = []) => (dispatch, getState) => {
  elements.map(element => {
    const style: any = getSlideStyle(element.style);
    if (style.type === ELEMENT_TYPE.VIMEO) {
      const url = style.linkUrl;
      if (url) {
        axios.get(`https://vimeo.com/api/oembed.json?url=${url}&width=100%&height=100%`)
          .then(response => {
            // handle success
            dispatch(setExternalData(element.id, style.type, response.data.html));
          });
      }
    }
  });
};

export const saveTrackingData = () => async (dispatch, getState) => {
  const timeStart = getState().home.timeStart ? getState().home.timeStart : null;
  const currentIdx = getState().home.activeSlideId;
  const appId = getState().home.appId;
  if (!timeStart || !appId) return;
  const displayTime = moment().diff(timeStart);
  let data: any = {
    appId, slide: `Slide Id ${currentIdx}`,
    time: displayTime
  };
  const trackingId = getState().home.trackingId ? getState().home.trackingId : null;
  if (trackingId) {
    data = {
      ...data,
      trackingId
    };
  }
  await axios.post(SET_TRACKING_DATA, data).then(response => {
    dispatch(setTrackingId(response.data.trackingId));
  });
  await setTimeStart(new Date());
};

export const setTrackingId = trackingId => ({
  type: ACTION_TYPES.SET_TRACKING_ID,
  payload: trackingId
});

export const setTimeStart = timeStart => ({
  type: ACTION_TYPES.SET_TIME_START,
  payload: timeStart
});

export const setCurrentIdx = idx => ({
  type: ACTION_TYPES.SET_CURRENT_IDX,
  payload: idx
});

export const setActiveSlideId = id => ({
  type: ACTION_TYPES.SET_ACTIVE_SLIDE_ID,
  payload: id
});

export const setWindowSize = windowSize => ({
  type: ACTION_TYPES.SET_WINDOW_SIZE,
  payload: windowSize
});

export const setScrollPosition = scrollPosition => ({
  type: ACTION_TYPES.SET_SCROLL_POSITION,
  payload: scrollPosition
});

export const setExternalData = (id, dataType, data) => ({
  type: ACTION_TYPES.SET_EXTERNAL_DATA,
  id,
  dataType,
  data
});

export const setSlideFlipped = slideFlipped => ({
  type: ACTION_TYPES.SET_SLIDE_FLIPPED,
  payload: slideFlipped
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const createSessionAnalytic = appId => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.GET_ANALYTIC_ID,
    payload: axios.post(CREATE_SESSION_ANALYTIC, { appId })
  });
};

export const endSessionAnalytic = () => async (dispatch, getState) => {
  const analyticTrackingId = getState().home.analyticTrackingId;
  const appId = getState().home.appId;
  axios.put(END_SESSION_ANALYTIC, { appId, analyticTrackingId });
};

export const decode = (node, data) => {
  let obj = {};
  if (node != null && node.nodeType === 1) {
    obj['name'] = node.nodeName;
    // decodeAttributes
    const attrs = node.attributes;
    for (const attr of attrs) {
      if (attr.nodeName !== 'name') {
        obj[attr.nodeName] = attr.value !== '' && Number.isInteger(parseInt(attr.value, 10)) ? parseInt(attr.value, 10) : attr.value;
      }
    }
    // decodeChildren
    let child = node.firstChild;
    while (child != null) {
      const tmp = child.nextSibling;
      if (child.nodeType === 1) {
        let childObj = decode(child, data);
        if (childObj) {
          if (childObj['name'] === 'mxGeometry') {
            obj = {
              ...obj,
              x: childObj['x'],
              y: childObj['y'],
              width: childObj['width'],
              height: childObj['height']
            };
          } else if (childObj['name'] === 'mxCell' && childObj['vertex'] === 1) {
            // element not arrow add element
            const parentId = childObj['parent'] ? childObj['parent'] : '';
            if (!data.elements.find(v => v.id === parentId)) {
              childObj = _.omit(childObj, 'parent');
            }
            data.elements.push(childObj);
          } else if (childObj['name'] === 'mxCell' && (childObj['source'] || childObj['target'])) {
            // element is arrow add relationship
            const relation = data.relation.find(v => v.source === childObj['source'] && v.target === childObj['target']);
            if (!relation) {
              data.relation.push({
                source: childObj['source'],
                target: childObj['target']
              });
            }
          }
        }
      }
      child = tmp;
    }
    // data.elements.push(obj);
    if (node.nodeName === 'mxGraphModel') {
      data.root = _.omit(obj, 'child');
    }
    return obj;
  }
  return null;
};

export const getSlideStyle = styleStr => {
  const slideStyle = {};
  styleStr && styleStr.split(';').map(v => {
    const equalIndex = v.indexOf('=');
    if (equalIndex > 0) {
      const styleName = v.substring(0, equalIndex);
      const styleValue = v.substring(equalIndex + 1, v.length);
      if (styleName === ELEMENT_TYPE.TEXT) {
        slideStyle['elementStyle'] = ELEMENT_TYPE.TEXT;
      } else if (styleName === ELEMENT_TYPE.IMAGE) {
        slideStyle['elementStyle'] = ELEMENT_TYPE.IMAGE;
      } else if (styleName === 'rounded' && styleValue === '1') {
        slideStyle['elementStyle'] = ELEMENT_TYPE.BUTTON;
      }
      if (styleName !== null && styleValue !== null) {
        slideStyle[styleName] = styleValue;
      }
    }
  });
  return slideStyle;
};

export const getStyle = (slide, slideStyle) => {
  let style: any = {};
  const isMediaContent = isMedia(slideStyle['type']);
  const isImageSlide = slideStyle['type'] === ELEMENT_TYPE.IMAGE_SLIDE;
  let linkOpenInModal = false;
  if (isMediaContent) {
    linkOpenInModal = slideStyle['linkOpenInModal'] === '1';
  }
  // add common style
  const opacityHex = slideStyle['opacity'] != null ? parseInt(slideStyle['opacity'], 10) : '';
  style = {
    ...style,
    border: slideStyle['strokeColor'] === 'none'
    || slideStyle['elementStyle'] === ELEMENT_TYPE.IMAGE
    || (isMediaContent && !linkOpenInModal)
    || isImageSlide ?
      '' : `1px solid ${getColorWithOpacity('#000000', opacityHex)}`,
    width: slide['width'],
    height: slide['height'],
    fontSize: slideStyle.fontSize ? `${slideStyle.fontSize}px` : '',
    fontFamily: slideStyle['fontFamily'] ? `${slideStyle['fontFamily']}` : '',
    borderRadius: slideStyle['rounded'] === '1' ? '5px' : '',
    backgroundColor: slideStyle['fillColor'] ? `${getColorWithOpacity(slideStyle['fillColor'], opacityHex)}` : ''
  };
  // add special style
  if (slideStyle['elementStyle'] === ELEMENT_TYPE.IMAGE) {
    style = {
      ...style,
      backgroundImage: `url(${slideStyle['image']})`
    };
  } else if (slideStyle['elementStyle'] === ELEMENT_TYPE.BUTTON) {
    style = {
      ...style,
      cursor: `pointer`
    };
  }
  // if (slideStyle['type'] === ELEMENT_TYPE.HOME) {
  //   style = {
  //     ...style,
  //     zIndex: '999'
  //   };
  // }

  if (slide['parent']) {
    style = {
      ...style,
      position: 'absolute',
      left: slide.x,
      top: slide.y
    };
  }
  return style;
};

export const getChildStyle = (slide, slideStyle) => {
  let childStyle: any = {};
  const opacityHex = slideStyle['opacity'] != null ? parseInt(slideStyle['opacity'], 10) : '';
  childStyle = {
    ...childStyle,
    // border: slideStyle['strokeColor'] === 'none' || slideStyle['elementStyle'] === ELEMENT_TYPE.IMAGE ?
    //   '' : `1px solid ${this.getColorWithOpacity('#000000', opacityHex)}`,
    borderRadius: slideStyle['rounded'] === '1' ? '5px' : ''
    // backgroundColor: slideStyle['fillColor'] ? `${getColorWithOpacity(slideStyle['fillColor'], opacityHex)}` : ''
  };
  return childStyle;
};

export const getValueStyle = (slide, slideStyle) => {
  let valueStyle: any = {};
  const opacityHex = slideStyle['opacity'] != null ? parseInt(slideStyle['opacity'], 10) : '';
  valueStyle = {
    ...valueStyle,
    color: slideStyle['fontColor'] ? slideStyle['fontColor'] : '',
    backgroundColor: slideStyle['labelBackgroundColor'] && slideStyle['labelBackgroundColor'] !== 'none' ?
      `${getColorWithOpacity(slideStyle['labelBackgroundColor'], opacityHex)}` : ''
    // border: (slideStyle['labelBorderColor'] && slideStyle['labelBorderColor'] !== 'none') ?
    //   `1px solid ${this.getColorWithOpacity(slideStyle['labelBorderColor'], opacityHex)}` : ''
  };

  // set align
  if (slideStyle['labelPosition'] !== 'center') {
    if (slideStyle['labelPosition'] === 'left') {
      valueStyle = {
        ...valueStyle,
        right: `${slide['width']}px`
      };
    } else if (slideStyle['labelPosition'] === 'right') {
      valueStyle = {
        ...valueStyle,
        left: `${slide['width']}px`
      };
    }
  }

  // set vertical align
  if (slideStyle['verticalLabelPosition'] !== 'middle') {
    if (slideStyle['verticalLabelPosition'] === 'top') {
      valueStyle = {
        ...valueStyle,
        bottom: `${slide['height']}px`
      };
    } else if (slideStyle['labelPosition'] === 'bottom') {
      valueStyle = {
        ...valueStyle,
        top: `${slide['height']}px`
      };
    }
  }
  // set font style
  if (slideStyle['fontStyle']) {
    const fontStyleArray = parseInt(slideStyle['fontStyle'], 10).toString(2).split('');
    valueStyle = {
      ...valueStyle,
      fontWeight: fontStyleArray[0] === '1' ? 'bold' : '',
      fontStyle: fontStyleArray[1] === '1' ? 'italic' : '',
      textDecoration: fontStyleArray[1] === '1' ? 'underline' : ''
    };
  }

  // set padding
  valueStyle = {
    ...valueStyle,
    padding: slideStyle['spacing'] ? `${slideStyle['spacing']}px` : '',
    paddingLeft: slideStyle['spacingLeft'] ? `${slideStyle['spacingLeft']}px` : '',
    paddingRight: slideStyle['spacingRight'] ? `${slideStyle['spacingRight']}px` : '',
    paddingBottom: slideStyle['spacingBottom'] ? `${slideStyle['spacingBottom']}px` : '',
    paddingTop: slideStyle['spacingTop'] ? `${slideStyle['spacingTop']}px` : ''
  };
  return valueStyle;
};

export const getColorWithOpacity = (hex, opacity) => {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return opacity !== null && opacity !== '' ? `rgba(${r}, ${g}, ${b}, ${opacity / 100})` : `rgb(${r}, ${g}, ${b})`;
};

export const getSlideContainerId = (id, elements) => {
  const element = elements.find(v => v.id === id);
  if (element.parent) {
    return getSlideContainerId(element.parent, elements);
  } else {
    return element.id;
  }
};

export const getMediaContent = (id, type, url, externalData) => {
  let content = '';
  url = decodeURIComponent(url);
  if (type === ELEMENT_TYPE.YOUTUBE || type === ELEMENT_TYPE.YOUTUBE_VERT) {
    const youtubeId = getYoutubeId(url);
    content = `
    <iframe allowFullScreen=${true}
        src=${`https://www.youtube.com/embed/${youtubeId}`}
        width="100%" height="100%" allowTransparency=${true} frameBorder="0"/>
    `;
  } else if (type === ELEMENT_TYPE.VIMEO && externalData[id]) {
    const slideData = externalData[id];
    const divWrapper = document.createElement('div');
    divWrapper.innerHTML = slideData[type];
    const iframe = divWrapper.querySelector('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    content = iframe.outerHTML;
  } else if (type === ELEMENT_TYPE.SPOTIFY) {
    content = `
    <iframe allowFullScreen=${true}
        src=${`https://embed.spotify.com/?uri=${url}`}
        width="100%" height="100%" allowTransparency=${true} frameBorder="0"/>
    `;
  }
  return content;
};

export const getYoutubeId = url => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return 'error';
  }
};

export const isMedia = type => type === ELEMENT_TYPE.YOUTUBE
  || type === ELEMENT_TYPE.SPOTIFY
  || type === ELEMENT_TYPE.VIMEO
  || type === ELEMENT_TYPE.YOUTUBE_VERT;

// export const getVimeoContent = (url) => {
//   axios.get(`https://vimeo.com/api/oembed.json?url=${url}`)
//     .then(async response => {
//       // handle success
//       return response.data.html;
//     })
//     .catch(error => {
//       return '';
//     });
// };
