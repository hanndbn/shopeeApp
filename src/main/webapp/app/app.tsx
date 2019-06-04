import "react-toastify/dist/ReactToastify.css";
import "./app.scss";
import "bootstrap";

import React from "react";
import { connect } from "react-redux";
import { Card } from "reactstrap";
import { HashRouter as Router } from "react-router-dom";

import { IRootState } from "app/shared/reducers";
import { getSession } from "app/shared/reducers/authentication";
import { getProfile } from "app/shared/reducers/application-profile";
import { setLocale } from "app/shared/reducers/locale";
import { hasAnyAuthority } from "app/shared/auth/private-route";
import ErrorBoundary from "app/shared/error/error-boundary";
import { AUTHORITIES } from "app/config/constants";
import AppRoutes from "app/routes";
import Footer from "app/shared/layout/footer/footer";
import Header from "app/shared/layout/header/header";

export interface IAppProps extends StateProps, DispatchProps {}

export class App extends React.Component<IAppProps> {
  componentDidMount() {
    // this.props.getSession();
    // this.props.getProfile();
  }

  render() {
    return (
      <Router>
        <div className="site">
          {/*<ToastContainer position={toast.POSITION.TOP_LEFT as ToastPosition} className="toastify-container" toastClassName="toastify-toast" />*/}
          <div className="site-header">
            <Header />
          </div>
          <div className="site-content">
            <div className="view-container" id="app-view-container">
              <ErrorBoundary>
                <AppRoutes />
              </ErrorBoundary>
            </div>
          </div>
          <div className="site-footer">
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ authentication, applicationProfile, locale }: IRootState) => ({
  currentLocale: locale.currentLocale,
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled
});

const mapDispatchToProps = { setLocale, getSession, getProfile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
