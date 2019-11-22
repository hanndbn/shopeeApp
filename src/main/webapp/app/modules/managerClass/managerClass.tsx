import './managerClass.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router';
import { TITLE_HELMET } from 'app/config/constants';
import { Helmet } from 'react-helmet';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import ViewData from 'app/modules/managerClass/viewData';
import EditData from 'app/modules/managerClass/editData';

// import { getCategory } from "app/shared/reducers/category";

export interface INhapDiemProp extends StateProps, DispatchProps {
  initScreen: Function;
  location: any;
}

export class ManagerClass extends React.Component<INhapDiemProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.initScreen();
  }

  render() {
    const { managerClassData, pagination, loading } = this.props;
    return (
      <div className="manager-class-container table-container">
        <Helmet>
          <title>{`${TITLE_HELMET} QUẢN LÝ LỚP HỌC`}</title>
        </Helmet>
        <div className="row no-gutters">
          <div className="col-12 title">QUẢN LÝ LỚP HỌC</div>
          <ErrorBoundaryRoute exact={true} path="/quan-ly-lop-hoc" component={ViewData}/>
          <ErrorBoundaryRoute path="/quan-ly-lop-hoc/edit" component={EditData}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ common, managerClass }: IRootState) => ({
  managerClassData: managerClass.managerClassData,
  loading: managerClass.loading,
  pagination: managerClass.pagination
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerClass));
