import './home.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router';
import { ELEMENT_TYPE, TITLE_HELMET } from 'app/config/constants';
import { Helmet } from 'react-helmet';
// import x2js from 'x2js';
import * as homeAction from 'app/modules/home/home.reducer';
// const jsdom = require("jsdom");
// import { getCategory } from "app/shared/reducers/category";
import cn from 'classnames';
import _ from 'lodash';
import Slider from 'rc-slider';
import * as infoModaAction from 'app/InfoModal/infoModal.reducer';
import Hammer from 'hammerjs';
import ImageSlide from 'app/modules/imageSlide/imageSlide';
import Social from 'app/modules/social/social';
import Pdm from 'app/modules/pdm/pdm';
import WellCome from 'app/modules/pdm/wellcome';

export interface IHomeProp extends StateProps, DispatchProps {
  initScreen: Function;
  setActiveSlideId: Function;
  saveTrackingData: Function;
  setWindowSize: Function;
  setScrollPosition: Function;
  displayModalUrl: Function;
  displayModalMedia: Function;
  endSessionAnalytic: Function;
  setSlideFlipped: Function;
  location: any;
  match: any;
}

export class Home extends React.Component<IHomeProp, { input: any, content: any }> {
  private parentContainer: any = React.createRef();
  private hammer: any = null;

  constructor(props) {
    super(props);
    window.addEventListener('beforeunload', ev => {
      ev.preventDefault();
      this.props.saveTrackingData();
      this.props.endSessionAnalytic();
      return null;
    });
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.initScreen();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.hammer = Hammer(this.parentContainer.current);
    this.hammer.on('swipeleft', e => this.swipeLeft(e, this));
    this.hammer.on('swiperight', e => this.swipeRight(e, this));
  }

  componentWillUnmount() {
    this.props.endSessionAnalytic();
    window.removeEventListener('resize', this.updateWindowDimensions);
    this.hammer.off('swipeleft', this.swipeLeft);
    this.hammer.off('swiperight', this.swipeRight);
  }

  swipeLeft(e, _self) {
    // console.log('left');
    if (_self.props.data) {
      const { relation, elements } = _self.props.data;
      const currentRelation = relation.find(v => v.source === _self.props.activeSlideId && v.target);
      if (currentRelation) {
        const nextSlide = elements.find(v => v.id === currentRelation.target && !v.parent);
        if (nextSlide) {
          const slideFlipped = _self.props.slideFlipped;
          slideFlipped.push(_self.props.activeSlideId);
          _self.props.setSlideFlipped(slideFlipped);
          _self.props.setActiveSlideId(nextSlide.id);
        }
      }
    }
  }

  swipeRight(e, _self) {
    // console.log('right');
    if (_self.props.data) {
      const { relation, elements } = _self.props.data;
      const currentRelation = relation.find(v => v.target === _self.props.activeSlideId && v.source);
      if (currentRelation) {
        const nextSlide = elements.find(v => v.id === currentRelation.source && !v.parent);
        if (nextSlide) {
          const slideFlipped = _self.props.slideFlipped.filter(v => v !== nextSlide.id);
          _self.props.setSlideFlipped(slideFlipped);
          _self.props.setActiveSlideId(nextSlide.id);
        }
      }
    }
  }

  previousSlide() {
    const data: any = this.props.data;
    if (data) {
      const { relation, elements } = data;
      const currentRelation = relation.find(v => v.target === this.props.activeSlideId && v.source);
      if (currentRelation) {
        const nextSlide = elements.find(v => v.id === currentRelation.source && !v.parent);
        if (nextSlide) {
          const slideFlipped = this.props.slideFlipped.filter(v => v !== nextSlide.id);
          this.props.setSlideFlipped(slideFlipped);
          this.props.setActiveSlideId(nextSlide.id);
        }
      }
    }
  }

  nextSlide() {
    const data: any = this.props.data;
    if (data) {
      const { relation, elements } = data;
      const currentRelation = relation.find(v => v.source === this.props.activeSlideId && v.target);
      if (currentRelation) {
        const nextSlide = elements.find(v => v.id === currentRelation.target && !v.parent);
        if (nextSlide) {
          const slideFlipped = this.props.slideFlipped;
          slideFlipped.push(this.props.activeSlideId);
          this.props.setSlideFlipped(slideFlipped);
          this.props.setActiveSlideId(nextSlide.id);
        }
      }
    }
  }

  updateWindowDimensions() {
    this.props.setWindowSize({ width: window.innerWidth, height: window.innerHeight - 4 });
  }

  getSnapshotBeforeUpdate(prevProps, prevState): any | null {
    const preAppName = prevProps.match.params.appName ? prevProps.match.params.appName : '';
    const currentAppName = this.props.match.params.appName ? this.props.match.params.appName : '';
    if (preAppName !== currentAppName) {
      this.props.initScreen(preAppName);
    }
    return null;
  }

  toTopHandle() {
    this.parentContainer.current.scrollTop = 0;
  }

  scrollParentEvent(e) {
    this.props.setScrollPosition(100 -
      ((e.target.scrollTop) / (e.target.scrollHeight - this.props.windowSize.height)) * 100);
  }

  parse2html(data, activeSlideId, slideFlipped = []) {
    const { root, elements, relation } = data;
    if (!elements) return;
    const rootSlide = this.getRootSlides(data);
    return rootSlide.map((v, idx) => (
      <React.Fragment key={idx}>
        <div
          className={cn('d-flex justify-content-center h-100 w-100 slide-content-wrapper', {
            active: v.id === activeSlideId,
            flipped: slideFlipped.indexOf(v.id) > -1
          })}>
          {this.slide2html(data, v, null, null, v.id)}
        </div>
      </React.Fragment>));
  }

  slide2html(data, slide, parentStyle, zoomVal, idx = 0, hasIFrame = false) {
    const slideStyle = homeAction.getSlideStyle(slide['style']);
    let style: any = homeAction.getStyle(slide, slideStyle);
    const childStyle: any = homeAction.getChildStyle(slide, slideStyle);
    let valueStyle: any = homeAction.getValueStyle(slide, slideStyle);
    const childs = data.elements.filter(v => v.parent === slide.id);
    const isRoot = !slide['parent'];
    const relation = data.relation.find(v => v.source === slide.id && v.target);
    let nextSlideId = null;
    if (relation) {
      nextSlideId = homeAction.getSlideContainerId(relation.target, data.elements);
    }
    let isScrollSlide = false;
    let windowWidth = this.props.windowSize ? this.props.windowSize.width : 0;
    let windowHeight = this.props.windowSize ? this.props.windowSize.height : 0;
    if (windowWidth > 768) {
      windowWidth = 360;
      windowHeight = 640;
    }
    if (isRoot) {
      const slideWidth = style['width'] ? style['width'] : 0;
      const slideHeight = style['height'] ? style['height'] : 0;
      const screenRatio = windowHeight / windowWidth;
      const needHeightEditor = slideWidth * screenRatio;
      const slideRatio = slideHeight / slideWidth;
      const needHeightScreen = windowWidth * slideRatio;
      zoomVal = windowWidth / slideWidth;
      style = {
        ...style,
        originalWith: style.width,
        originalHeight: style.height,
        width: '100%'
      };
      if (slideHeight <= needHeightEditor) {
        style = {
          ...style,
          height: 'calc(100% - 4px)'
        };
      } else {
        isScrollSlide = true;
        style = {
          ...style,
          height: needHeightScreen
        };
      }
    } else {
      const parentWith = parentStyle.originalWith ? parentStyle.originalWith : parentStyle.width;
      const parentHeight = parentStyle.originalHeight ? parentStyle.originalHeight : parentStyle.height;

      style = {
        ...style,
        width: `${_.round(style.width / parentWith, 2) * 100}%`,
        left: `${_.round(style.left / parentWith, 2) * 100}%`,
        height: `${_.round(style.height / parentHeight, 2) * 100}%`,
        top: `${_.round(style.top / parentHeight, 2) * 100}%`,
        widthValue: _.round(style.width / parentWith, 2) * windowWidth
      };

      const fontSize = style.fontSize ? style.fontSize : null;
      if (fontSize && zoomVal) {
        const fontSizeVal = _.toInteger(fontSize.substring(0, fontSize.length - 2));
        const zoomFontSize = fontSizeVal * zoomVal;
        style = {
          ...style,
          fontSize: zoomFontSize
        };
      }
      const fontSizeValueElement = valueStyle.fontSize ? valueStyle.fontSize : null;
      if (fontSizeValueElement && zoomVal) {
        const fontSizeVal = _.toInteger(fontSizeValueElement.substring(0, fontSizeValueElement.length - 2));
        const zoomFontSize = fontSizeVal * zoomVal;
        valueStyle = {
          ...valueStyle,
          fontSize: zoomFontSize
        };
      }
    }

    const elementType = slideStyle['type'] ? slideStyle['type'] : '';
    const isGame = elementType === 'game';
    const isMedia = homeAction.isMedia(elementType);
    const isLink = elementType === ELEMENT_TYPE.LINK;
    const isImageSlide = elementType === ELEMENT_TYPE.IMAGE_SLIDE;
    const isSocial = elementType === ELEMENT_TYPE.SOCIAL;
    const isPDM = elementType === ELEMENT_TYPE.PERSONAL_DESIGN_MANAGER;
    const isWellComeCard = elementType === ELEMENT_TYPE.WELL_COME_CARD;
    let mediaContent = '';
    let linkUrl = '';
    let linkOpenInModal = false;
    let imageSlides = [];
    let shareSocialList = [];
    let pdmInfo = [];
    let fullName = '';
    if (isMedia) {
      mediaContent = homeAction.getMediaContent(slide.id, elementType, slideStyle['linkUrl'], this.props.externalData);
      linkOpenInModal = slideStyle['linkOpenInModal'] === '1';
    } else if (isLink) {
      linkUrl = slideStyle['linkUrl'] ? slideStyle['linkUrl'] : '';
      linkOpenInModal = slideStyle['linkOpenInModal'] === '1';
    } else if (isImageSlide) {
      const listImageStr = slideStyle['imageSlide'] ? slideStyle['imageSlide'] : '';
      imageSlides = decodeURIComponent(listImageStr).split(',');
    } else if (isSocial) {
      const shareSocial = slideStyle['shareSocial'] ? slideStyle['shareSocial'] : '';
      shareSocialList = shareSocial ? shareSocial.split(',') : [];
    } else if (isPDM) {
      const pdmInfoStr = slideStyle['pdmInfo'] ? slideStyle['pdmInfo'] : '';
      pdmInfo = pdmInfoStr ? JSON.parse(pdmInfoStr) : [];
    } else if (isWellComeCard) {
      fullName = slideStyle['fullName'] ? slideStyle['fullName'] : '';
    }

    if (isGame || hasIFrame) {
      style = {
        ...style,
        zIndex: '999'
      };
    }

    return (<div className={cn('slide', {
      'g-cursor-pointer': relation,
      'root-slide': isRoot,
      'opacity-animation': isRoot
    })}
                 style={style}
                 key={idx}
                 onClick={() => {
                   if (!isRoot) {
                     if (isLink) {
                       if (linkOpenInModal) {
                         this.props.displayModalUrl(linkUrl);
                       } else {
                         window.location.href = linkUrl;
                       }
                     } else if (isMedia && linkOpenInModal) {
                       this.props.displayModalMedia(elementType, mediaContent);
                     } else if (isSocial || isPDM) {

                     } else if (slideStyle['modalPopup'] === '1' && this.props.modalListing) {
                       const modalType = this.props.modalListing.find(v => v.group_key === slideStyle['modalType']);
                       if (modalType && modalType.types) {
                         const modalTypeDetail = modalType.types.find(v => v.key === slideStyle['modalTypeDetail']);
                         if (modalTypeDetail && modalTypeDetail.key !== ELEMENT_TYPE.YOUTUBE) {
                           this.props.displayModalUrl(modalTypeDetail.baseUrl + (modalTypeDetail.hasExtendUrl ? decodeURIComponent(slideStyle['modalSiteUrl']) : ''));
                         }
                       }
                     } else if (relation) {
                       this.props.setActiveSlideId(nextSlideId);
                     } else if (elementType === ELEMENT_TYPE.HOME) {
                       const firstSlide = data.elements.find(v => v.isFirstSlide);
                       this.props.setActiveSlideId(firstSlide ? firstSlide.id : data.elements[0] ? data.elements[0].id : null);
                     }
                   }
                 }}
    >
      {
        isRoot && isScrollSlide &&
        <div className="slide-scroll-container">
          <Slider vertical min={0} max={100} defaultValue={100}
                  value={this.props.scrollPosition}
            // onChange={value => this.props.setScrollPosition(value)}
                  trackStyle={{ backgroundColor: '#52a1a78a', height: 10 }}
                  handleStyle={{
                    backgroundColor: '#3d7c81',
                    border: 'none',
                    height: 10,
                    width: 10,
                    left: 7
                  }}
                  railStyle={{ backgroundColor: '#52a1a78a' }}
          />
        </div>
      }
      {
        isRoot && isScrollSlide && this.props.scrollPosition <= 90 &&
        <div className="toTopBtn" onClick={() => this.toTopHandle()}>
          <span className="topBtnContent">SWIPE <span className="fa fa-chevron-up"/></span>
        </div>
      }
      <div className="slide-child"
           style={childStyle}
      >
        {
          <>
            {childs && childs.length > 0 && childs.map((child, idxChild) => this.slide2html(data, child, style, zoomVal, idxChild, isGame))}
            {
              (isGame || (isMedia && !linkOpenInModal) || isImageSlide || isSocial || isPDM || isWellComeCard) ?
                <div
                  className="slide-value"
                  style={valueStyle}
                >
                  {
                    isGame ?
                      <iframe src="https://phanducminh.github.io/scratchcard/" className="custom-iframe w-100 h-100 bg-white"/> :
                      (isMedia && !linkOpenInModal) ? <div className="w-100 h-100" dangerouslySetInnerHTML={{ __html: mediaContent }}/> :
                        isImageSlide ? <ImageSlide imageSlides={imageSlides}/> :
                          isSocial ? <Social shareSocialList={shareSocialList} width={style.widthValue}/> :
                            isPDM ? <Pdm pdmInfo={pdmInfo} cardId={slide.id}/> :
                              isWellComeCard ? <WellCome fullName={fullName}/> : ''
                  }
                </div> :
                slide.value ?
                  <div
                    className="slide-value"
                    style={valueStyle}
                  >
                    <div dangerouslySetInnerHTML={{ __html: this.decodeHTMLEntities(slide.value) }}/>
                  </div> : ''
            }
          </>
        }
      </div>
    </div>);
  }

  decodeHTMLEntities(str) {
    if (str && typeof str === 'string') {
      const element = document.createElement('div');
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

  getRootSlides(data) {
    const { root, elements, relation } = data;
    const listRootSlide = [];
    elements && elements.map(v => {
      if (!v.parent) {
        listRootSlide.push(v);
      }
    });
    // const firstSlide = data.elements ? data.elements.find(v => v.isFirstSlide) : null;
    // if (firstSlide) {
    //   const stackSlide = data.relation.filter(v => v.source === firstSlide.id);
    //   stackSlide.map(v=> )
    // }
    return listRootSlide;
  }

  render() {
    const { data, requestFailure, errorMessage, saveTrackingData, setCurrentIdx, activeSlideId, slideFlipped }: any = this.props;
    const displaySlide = this.parse2html(data, activeSlideId, slideFlipped);
    const listRootSlide = this.getRootSlides(data);
    return (
      <div className="">
        <Helmet>
          <title>{`${TITLE_HELMET}`}</title>
        </Helmet>
        <div className="">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              {requestFailure && <div className="alert alert-danger">{errorMessage}</div>}
              <div className={cn('slide-container')} id="slide-container" ref={this.parentContainer} onScroll={e => this.scrollParentEvent(e)}>
                {displaySlide}
              </div>
            </div>
          </div>
          <div className="slide-tab-wrapper">
            {listRootSlide && listRootSlide.map((slide, idx) =>
              <div key={idx} style={{ width: `${100 / listRootSlide.length}%` }} className={cn('slide-tab', { active: slide.id === activeSlideId })}/>
            )}
          </div>
          <div className="card-arrow-btn back-btn"
               onClick={() => this.previousSlide()}
          />
          <div className="card-arrow-btn next-btn"
               onClick={() => this.nextSlide()}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ home, common }: IRootState) => ({
  data: home.data,
  externalData: home.externalData,
  modalListing: common.modalListing,
  activeSlideId: home.activeSlideId,
  requestFailure: home.requestFailure,
  windowSize: home.windowSize,
  scrollPosition: home.scrollPosition,
  slideFlipped: home.slideFlipped,
  errorMessage: home.errorMessage
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: async (preAppName = null) => {
    if (preAppName) {
      dispatch(homeAction.endSessionAnalytic());
    }
    await dispatch(homeAction.reset());
    await dispatch(homeAction.setWindowSize({ width: window.innerWidth, height: window.innerHeight }));
    const appName = ownProps.match.params.appName ? ownProps.match.params.appName : '';
    await dispatch(homeAction.requestHomeData(appName));
    await dispatch(homeAction.setTimeStart(new Date()));
  },
  endSessionAnalytic: () => {
    dispatch(homeAction.endSessionAnalytic());
  },
  setCurrentIdx: idx => {
    dispatch(homeAction.setCurrentIdx(idx));
  },
  saveTrackingData: () => {
    dispatch(homeAction.saveTrackingData());
  },
  setActiveSlideId: async id => {
    await dispatch(homeAction.setActiveSlideId(id));
    await dispatch(homeAction.saveTrackingData());
    await dispatch(homeAction.setScrollPosition(100));
  },
  setWindowSize: windowSize => {
    dispatch(homeAction.setWindowSize(windowSize));
  },
  setScrollPosition: scrollPosition => {
    dispatch(homeAction.setScrollPosition(scrollPosition));
  },
  displayModalUrl: url => {
    dispatch(infoModaAction.displayModalUrl(url));
  },
  displayModalMedia: (type, content) => {
    dispatch(infoModaAction.displayModalMedia(type, content));
  },
  setSlideFlipped: slideFlipped => {
    dispatch(homeAction.setSlideFlipped(slideFlipped));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));
