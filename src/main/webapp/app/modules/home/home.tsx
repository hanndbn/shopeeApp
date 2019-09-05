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

export interface IHomeProp extends StateProps, DispatchProps {
  initScreen: Function;
  saveTrackingData: Function;
  setActiveSlideId: Function;
  setWindowSize: Function;
  location: any;
  match: any;
}

export class Home extends React.Component<IHomeProp, { input: any, content: any }> {

  constructor(props) {
    super(props);
    window.addEventListener('beforeunload', ev => {
      ev.preventDefault();
      this.props.saveTrackingData();
      return ev.returnValue = 'Are you sure you want to close?';
    });
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.initScreen();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.props.setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  getSnapshotBeforeUpdate(prevProps, prevState): any | null {
    const preAppId = prevProps.match.params.appId ? prevProps.match.params.appId : '';
    const currentAppId = this.props.match.params.appId ? this.props.match.params.appId : '';
    if (preAppId !== currentAppId) {
      this.props.initScreen();
    }
    return null;
  }

  parse2html(data, activeSlideId) {
    const { root, elements, relation } = data;
    if (!elements) return;
    const slide = activeSlideId ? elements.find(v => v.id === activeSlideId) : elements[0];
    return (
      <div className="slide-container">
        <div className="d-flex align-items-center justify-content-center h-100 w-100">
          {this.slide2html(data, slide, activeSlideId)};
        </div>
      </div>
    );
  }

  slide2html(data, slide, idx = 0) {
    const slideStyle = homeAction.getSlideStyle(slide['style']);
    let style: any = homeAction.getStyle(slide, slideStyle);
    const childStyle: any = homeAction.getChildStyle(slide, slideStyle);
    const valueStyle: any = homeAction.getValueStyle(slide, slideStyle);
    const childs = data.elements.filter(v => v.parent === slide.id);
    const isRoot = !slide['parent'];
    const relation = data.relation.find(v => v.source === slide.id && v.target);
    let nextSlideId = null;
    if (relation) {
      nextSlideId = homeAction.getSlideContainerId(relation.target, data.elements);
    }
    if (isRoot) {
      const windowWidth = this.props.windowSize ? this.props.windowSize.width : 0;
      const windowHeight = this.props.windowSize ? this.props.windowSize.height : 0;
      const slideWidth = style['width'] ? style['width'] : 0;
      const slideHeight = style['height'] ? style['height'] : 0;
      if (slideWidth < windowWidth) {
        style = { ...style, width: '100%' };
      }
      if (slideHeight < windowHeight) {
        style = { ...style, height: '100%' };
      }
    }
    return (<div className={cn('slide', {
      'g-cursor-pointer': relation,
      'root-slide': isRoot,
      'opacity-animation': isRoot
    })}
                 style={style}
                 key={idx}
                 onClick={() => relation ? this.props.setActiveSlideId(nextSlideId) : ''}
    >
      <div className="slide-child"
           style={childStyle}
      >
        {childs && childs.length > 0 && childs.map((child, idxChild) => this.slide2html(data, child, idxChild))}
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
    return str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
  }

  render() {
    const { data, requestFailure, errorMessage, saveTrackingData, setCurrentIdx, activeSlideId }: any = this.props;
    const displaySlide = this.parse2html(data, activeSlideId);
    return (
      <div className="">
        <Helmet>
          <title>{`${TITLE_HELMET}`}</title>
        </Helmet>
        <div className="">
          <div className="row">
            <div className="col-12">
              {requestFailure && <div className="alert alert-danger">{errorMessage}</div>}
              {displaySlide}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ home }: IRootState) => ({
  data: home.data,
  activeSlideId: home.activeSlideId,
  requestFailure: home.requestFailure,
  windowSize: home.windowSize,
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
  setActiveSlideId: id => {
    dispatch(homeAction.setActiveSlideId(id));
  },
  setWindowSize: windowSize => {
    dispatch(homeAction.setWindowSize(windowSize));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));
