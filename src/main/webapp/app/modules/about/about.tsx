import './about.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { animationDisplayLoading, reset } from 'app/shared/common/common.reducer';
import { withRouter } from 'react-router';
import { ABOUT_TABS, TITLE_HELMET } from 'app/config/constants';
import { Helmet } from 'react-helmet';
import { Button, Card, CardText, CardTitle, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import cn from 'classnames';
import * as aboutAction from 'app/modules/about/about.reducer';
import { paramObj } from 'app/shared/util/util';

// import { getCategory } from "app/shared/reducers/category";

export interface IAboutProp extends StateProps, DispatchProps {
  initScreen: Function;
  handleChangeData: Function;
  setActiveTab: Function;
}

export class About extends React.Component<IAboutProp> {
  async componentDidMount() {
    window.scrollTo(0, 0);
    await this.props.initScreen();
    await this.props.handleChangeData();
  }

  render() {
    const { aboutData, activeTab, setActiveTab } = this.props;
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
                  <NavLink
                    className={cn({ active: activeTab === idx })}
                    onClick={() => setActiveTab(idx)}
                  >
                    {tab.title}
                  </NavLink>
                </NavItem>
              )
            }
          </Nav>
          <TabContent activeTab={activeTab} className="tab-content">
            {aboutData && ABOUT_TABS.map((tab, idx) => {
                const data = aboutData && aboutData.length > 0 && aboutData[0][tab.id] ? aboutData[0][tab.id] : [];
                return (
                  <TabPane tabId={idx} key={idx} className="opacity-animation">
                    <div className="row">
                      {
                        data.map((item, idx1) => (<div key={idx1} className="col-lg-3 col-md-4 col-sm-6 col-12 about-item">
                            <a>
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
  aboutData: about.aboutData
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
    dispatch(reset());
    dispatch(animationDisplayLoading());
  },
  handleChangeData: () => {
    const params = paramObj(ownProps.location.search);
    const subCategory = params['subCategory'] ? params['subCategory'] : null;
    dispatch(aboutAction.requestAboutData());
  },
  setActiveTab: activeTab => {
    dispatch(aboutAction.setActiveTab(activeTab));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(About));
