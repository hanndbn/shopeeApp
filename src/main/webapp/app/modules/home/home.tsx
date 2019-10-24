import './home.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router';
import { TITLE_HELMET } from 'app/config/constants';
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

export interface IHomeProp extends StateProps, DispatchProps {
  initScreen: Function;
  saveTrackingData: Function;
  setActiveSlideId: Function;
  setWindowSize: Function;
  setScrollPosition: Function;
  displayModalUrl: Function;
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
    window.removeEventListener('resize', this.updateWindowDimensions);
    this.hammer.off('swipeleft', this.swipeLeft);
    this.hammer.off('swiperight', this.swipeRight);
  }

  swipeLeft(e, _self) {
    if (_self.props.data) {
      const { relation, elements } = _self.props.data;
      const currentRelation = relation.find(v => v.source === _self.props.activeSlideId && v.target);
      if (currentRelation) {
        const nextSlide = elements.find(v => v.id === currentRelation.target && !v.parent);
        if (nextSlide) {
          _self.props.setActiveSlideId(nextSlide.id);
        }
      }
    }
  }

  swipeRight(e, _self) {
    if (_self.props.data) {
      const { relation, elements } = _self.props.data;
      const currentRelation = relation.find(v => v.target === _self.props.activeSlideId && v.source);
      if (currentRelation) {
        const nextSlide = elements.find(v => v.id === currentRelation.source && !v.parent);
        if (nextSlide) {
          _self.props.setActiveSlideId(nextSlide.id);
        }
      }
    }
  }

  updateWindowDimensions() {
    this.props.setWindowSize({ width: window.innerWidth, height: window.innerHeight - 4 });
  }

  getSnapshotBeforeUpdate(prevProps, prevState): any | null {
    const preAppId = prevProps.match.params.appId ? prevProps.match.params.appId : '';
    const currentAppId = this.props.match.params.appId ? this.props.match.params.appId : '';
    if (preAppId !== currentAppId) {
      this.props.initScreen();
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

  parse2html(data, activeSlideId) {
    const { root, elements, relation } = data;
    if (!elements) return;
    const slide = activeSlideId ? elements.find(v => v.id === activeSlideId) : elements[0];
    return (
      <div className="d-flex justify-content-center h-100 w-100">
        {this.slide2html(data, slide, null, null, activeSlideId)}
      </div>
    );
  }

  slide2html(data, slide, parentStyle, zoomVal, idx = 0) {
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
    if (isRoot) {
      let windowWidth = this.props.windowSize ? this.props.windowSize.width : 0;
      let windowHeight = this.props.windowSize ? this.props.windowSize.height : 0;
      if (windowWidth > 768) {
        windowWidth = 360;
        windowHeight = 640;
      }
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
        top: `${_.round(style.top / parentHeight, 2) * 100}%`
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

    return (<div className={cn('slide', {
      'g-cursor-pointer': relation,
      'root-slide': isRoot,
      'opacity-animation': isRoot
    })}
                 style={style}
                 key={idx}
                 onClick={() => {
                   if (!isRoot) {
                     if (slideStyle['modalPopup'] === '1' && this.props.modalListing) {
                       const modalType = this.props.modalListing.find(v => v.group_key === slideStyle['modalType']);
                       if (modalType && modalType.types) {
                         const modalTypeDetail = modalType.types.find(v => v.key === slideStyle['modalTypeDetail']);
                         if (modalTypeDetail) {
                           this.props.displayModalUrl(modalTypeDetail.baseUrl + modalTypeDetail.hasExtendUrl ? slideStyle['modalSiteUrl'] : '');
                         }
                       }
                     } else if (relation) {
                       this.props.setActiveSlideId(nextSlideId);
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
        {childs && childs.length > 0 && childs.map((child, idxChild) => this.slide2html(data, child, style, zoomVal, idxChild))}
        {slide.value && <div
          className="slide-value"
          style={valueStyle}
        >
          <div dangerouslySetInnerHTML={{ __html: this.decodeHTMLEntities(slide.value) }}/>
        </div>}
      </div>
    </div>);
  }

  decodeHTMLEntities(str) {
    return str.replace(/&#(\d+)/g, (match, dec) => String.fromCharCode(dec));
  }

  getRootSlides(data) {
    const { root, elements, relation } = data;
    const listRootSlide = elements ? elements.filter(v => !v.parent) : [];
    // const firstSlide = data.elements ? data.elements.find(v => v.isFirstSlide) : null;
    // if (firstSlide) {
    //   const stackSlide = data.relation.filter(v => v.source === firstSlide.id);
    //   stackSlide.map(v=> )
    // }
    return listRootSlide;
  }

  render() {
    const { data, requestFailure, errorMessage, saveTrackingData, setCurrentIdx, activeSlideId }: any = this.props;
    const displaySlide = this.parse2html(data, activeSlideId);
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ home, common }: IRootState) => ({
  data: home.data,
  modalListing: common.modalListing,
  activeSlideId: home.activeSlideId,
  requestFailure: home.requestFailure,
  windowSize: home.windowSize,
  scrollPosition: home.scrollPosition,
  errorMessage: home.errorMessage
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: async () => {
    await dispatch(homeAction.reset());
    await dispatch(homeAction.setWindowSize({ width: window.innerWidth, height: window.innerHeight }));
    const appName = ownProps.match.params.appName ? ownProps.match.params.appName : '';
    await dispatch(homeAction.requestHomeData(appName));
    await dispatch(homeAction.setTimeStart(new Date()));
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
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));
