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
import { requestCategoryData } from 'app/modules/category/category.reducer';
import InfoModal from 'app/InfoModal/infoModal';

export interface IAppProps extends StateProps, DispatchProps {
  location: any;
  getCommonData: Function;
}

export class App extends React.Component<IAppProps> {
  componentDidMount() {
    // this.props.getCommonData();
    // this.props.getProfile();
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

const mapStateToProps = ({ common, projects, contactUs, projectDetail, carousel }: IRootState) => ({
  displayLoading: common.displayLoading || contactUs.loading || projectDetail.loading || carousel.loading
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getCommonData: () => {
    dispatch(requestCategoryData());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
