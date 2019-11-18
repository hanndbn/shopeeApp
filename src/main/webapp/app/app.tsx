import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'bootstrap';

import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import ErrorBoundary from 'app/shared/error/error-boundary';
import AppRoutes from 'app/routes';
import Loader from 'app/shared/layout/loader/loader';
import InfoModal from 'app/InfoModal/infoModal';
import { getModalListing } from 'app/shared/common/common.reducer';
import ReactGA from 'react-ga';

export interface IAppProps extends StateProps, DispatchProps {
  location: any;
  getCommonData: Function;
  createSession: Function;
}

export class App extends React.Component<IAppProps> {
  componentDidMount() {
    this.props.getCommonData();
    // this.props.getProfile();
    this.initializeReactGA();
  }

  initializeReactGA() {
    ReactGA.initialize('UA-148081507-2');
    const location = this.props.location ? this.props.location.pathname + this.props.location.search : '/homepage';
    ReactGA.pageview(location);
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (
      this.props.location &&
      prevProps.location &&
      (this.props.location.pathname !== prevProps.location.pathname || this.props.location.search !== prevProps.location.search)
    ) {
      const newURL = this.props.location.pathname + this.props.location.search;
      ReactGA.pageview(newURL);
    }
    return null;
  }

  render() {
    const { displayLoading } = this.props;
    return (
      <Router>
        <div className="site">
          {displayLoading && <Loader/>}
          {/*<ToastContainer position={toast.POSITION.TOP_LEFT as ToastPosition} className="toastify-container" toastClassName="toastify-toast" />*/}
          <div className="site-content">
            <div className="view-container" id="app-view-container">
              <ErrorBoundary>
                <AppRoutes/>
              </ErrorBoundary>
            </div>
          </div>
          <InfoModal/>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ common }: IRootState) => ({
  displayLoading: common.displayLoading
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getCommonData: () => {
    dispatch(getModalListing());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
