import './about.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { animationDisplayLoading, reset } from 'app/shared/common/common.reducer';
import { withRouter } from 'react-router';
import { ABOUT_TABS, TITLE_HELMET } from 'app/config/constants';
import { Helmet } from 'react-helmet';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import * as aboutAction from 'app/modules/about/about.reducer';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { AboutDetail } from 'app/modules/about/aboutDetail';

// import { getCategory } from "app/shared/reducers/category";

export interface IAboutProp extends StateProps, DispatchProps {
  initScreen: Function;
  handleChangeData: Function;
  setActiveTab: Function;
  showDetailContent: Function;
  match: any;
}

export class About extends React.Component<IAboutProp> {
  async componentDidMount() {
    window.scrollTo(0, 0);
    await this.props.initScreen();
    await this.props.handleChangeData();
  }

  getSnapshotBeforeUpdate(prevProps, prevState): any | null {
    const preLink = prevProps.match.params.link ? prevProps.match.params.link : '';
    const currentLink = this.props.match.params.link ? this.props.match.params.link : '';
    if (preLink !== currentLink) {
      this.props.setActiveTab(currentLink);
    }
    return null;
  }

  render() {
    const { aboutData, activeTab, showDetail, detailData, initIdx, showDetailContent } = this.props;
    return (
      <div className="about-container">
        <Helmet>
          <title>{`${TITLE_HELMET} - Giới Thiệu`}</title>
        </Helmet>
        <div>
          <Nav tabs className="tab-header">
            {
              ABOUT_TABS.map((tab, idx) =>
                <NavItem key={idx}>
                  <Link to={`/about/${tab.link}`} className={cn('nav-link', { active: activeTab === tab.link })}>
                    {tab.title}
                  </Link>
                </NavItem>
              )
            }
          </Nav>
          <TabContent activeTab={activeTab}>
            {aboutData && ABOUT_TABS.map((tab, idx) => {
                const data = aboutData && aboutData.length > 0 && aboutData[ 0 ][ tab.id ] ? aboutData[ 0 ][ tab.id ] : [];
                return (
                  <TabPane tabId={tab.link} key={idx} className="opacity-animation">
                    <div className="row no-gutters">
                      {
                        showDetail ?
                          <div className="col-12">
                            <AboutDetail data={...detailData} initIdx={initIdx} key={tab.id}/>
                          </div>
                          :
                          data.map((item, idx1) => (<div key={idx1} className="col-lg-3 col-md-4 col-sm-6 col-12 about-item">
                              <a onClick={() => showDetailContent(data, idx1)}>
                                <img src={item.guid} alt={tab.id} className="img-responsive"/>
                              </a>
                            </div>)
                          )
                      }
                    </div>
                  </TabPane>
                );
              }
            )};
          </TabContent>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ about }: IRootState) => ({
  activeTab: about.activeTab,
  aboutData: about.aboutData,
  showDetail: about.showDetail,
  detailData: about.detailData,
  initIdx: about.initIdx
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
    dispatch(reset());
    dispatch(aboutAction.reset());
    dispatch(animationDisplayLoading());
  },
  handleChangeData: async () => {
    const currentLink = ownProps.match.params.link ? ownProps.match.params.link : ABOUT_TABS[ 0 ].link;
    await dispatch(aboutAction.setActiveTab(currentLink));
    await dispatch(aboutAction.requestAboutData());
  },
  showDetailContent: async (data, idx) => {
    await dispatch(aboutAction.setDetailData(data));
    await dispatch(aboutAction.setInitIdx(idx));
    await dispatch(aboutAction.setShowDetail(true));
  },
  setActiveTab: activeTab => {
    dispatch(aboutAction.setActiveTab(activeTab));
    dispatch(aboutAction.setShowDetail(false));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(About));
