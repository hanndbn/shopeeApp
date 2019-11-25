import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'bootstrap';

import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import ErrorBoundary from 'app/shared/error/error-boundary';
import AppRoutes from 'app/routes';
import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';
import Loader from 'app/shared/layout/loader/loader';
import cn from 'classnames';
import { setDefaultSelectFormData } from 'app/shared/common/common.reducer';

export interface IAppProps extends StateProps, DispatchProps {
  location: any;
  getCommonData: Function;
}

export class App extends React.Component<IAppProps> {
  componentDidMount() {
    this.props.getCommonData();
    // this.props.getProfile();
  }

  render() {
    const { displayLoading, isFullScreen } = this.props;
    return (
      <Router>
        <div className="site container-fluid no-padding">
          {displayLoading && <Loader/>}
          {/*<ToastContainer position={toast.POSITION.TOP_LEFT as ToastPosition} className="toastify-container" toastClassName="toastify-toast" />*/}
          {
            !isFullScreen &&
            <div className="site-header">
              <Header/>
            </div>
          }
          <div className="site-content">
            <div className="row h-100 no-gutters">
              <div className={cn('col-3 col-md-3 col-xl-2 h-100', { 'd-none': isFullScreen })}>
                <Sidebar/>
              </div>
              <div className={cn('content-wrapper col-9 col-md-9 col-xl-10', { 'col-12': isFullScreen })}>
                <div className="view-container" id="app-view-container">
                  <ErrorBoundary>
                    <AppRoutes/>
                  </ErrorBoundary>
                </div>
              </div>
            </div>
          </div>
          {/*{*/}
          {/*!isFullScreen &&*/}
          {/*<div className="site-footer">*/}
          {/*<Footer/>*/}
          {/*</div>*/}
          {/*}*/}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ common }: IRootState) => ({
  displayLoading: common.displayLoading,
  isFullScreen: common.isFullScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getCommonData: () => {
    dispatch(setDefaultSelectFormData());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
