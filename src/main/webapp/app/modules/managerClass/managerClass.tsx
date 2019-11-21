import './managerClass.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router';
import { TITLE_HELMET } from 'app/config/constants';
import { Helmet } from 'react-helmet';
import ViewData from 'app/modules/managerClass/viewData';
import EditData from 'app/modules/managerClass/editData';
import { paramObj } from 'app/shared/util/util';
import * as managerClassAction from 'app/modules/managerClass/managerClass.reducer';
import _ from 'lodash';

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

  // getSnapshotBeforeUpdate(prevProps: Readonly<INhapDiemProp>, prevState: Readonly<{}>): any | null {
  //   const currentParams = paramObj(this.props.location.search);
  //   const prevParams = paramObj(prevProps.location.search);
  //   if (currentParams['activeId'] !== prevParams['activeId']) {
  //     this.props.initScreen();
  //   }
  //   return null;
  // }

  // componentDidUpdate(prevProps: Readonly<INhapDiemProp>, prevState: Readonly<{}>, snapshot?: any): void {
  // }

  render() {
    const { managerClassData, pagination, loading } = this.props;
    return (
      <div className="manager-class-container table-container">
        <Helmet>
          <title>{`${TITLE_HELMET} QUẢN LÝ LỚP HỌC`}</title>
        </Helmet>
        <div className="row no-gutters">
          <div className="col-12 title">QUẢN LÝ LỚP HỌC</div>
          {
            this.props.activeId ? <EditData/> : <ViewData/>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ common, managerClass }: IRootState) => ({
  managerClassData: managerClass.managerClassData,
  loading: managerClass.loading,
  activeId: managerClass.activeId,
  pagination: managerClass.pagination
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
    const params = paramObj(ownProps.location.search);
    const activeId = params['activeId'] ? params['activeId'] : null;
    dispatch(managerClassAction.setActiveId(activeId));
    const page = params['page'] && _.isInteger(_.toInteger(params['page'])) && _.toInteger(params['page']) > 0 ? _.toInteger(params['page']) - 1 : 0;
    dispatch(managerClassAction.setPageNumber(page));
    dispatch(managerClassAction.requestManagerClassData());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerClass));
