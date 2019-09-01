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
  location: any;
  match: any;
}

export class Home extends React.Component<IHomeProp, { input: any, content: any }> {

  constructor(props) {
    super(props);
    this.state = {
      input: '', content: ``
    };
    window.addEventListener('beforeunload', ev => {
      ev.preventDefault();
      this.props.saveTrackingData();
      return ev.returnValue = 'Are you sure you want to close?';
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.initScreen();
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
      <div className="container">
        <div className="slide-container">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            {this.slide2html(data, slide)};
          </div>
        </div>
      </div>
    );
  }

  slide2html(data, slide, idx = 0) {
    const slideStyle = homeAction.getSlideStyle(slide['style']);
    const style: any = homeAction.getStyle(slide, slideStyle);
    const childStyle: any = homeAction.getChildStyle(slide, slideStyle);
    const valueStyle: any = homeAction.getValueStyle(slide, slideStyle);
    const childs = data.elements.filter(v => v.parent === slide.id);
    const relation = data.relation.find(v => v.source === slide.id && v.target);
    let nextSlideId = null;
    if (relation) {
      nextSlideId = homeAction.getSlideContainerId(relation.target, data.elements);
    }
    return (<div className={cn('slide', { 'g-cursor-pointer': relation })}
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
        <div className="container input-wrapper">
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
  errorMessage: home.errorMessage
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: async () => {
    await dispatch(homeAction.reset());
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
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));
