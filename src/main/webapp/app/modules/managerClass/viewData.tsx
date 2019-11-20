import './managerClass.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router';
import Loading from 'app/shared/Loader/loading';
import * as managerClassAction from 'app/modules/managerClass/managerClass.reducer';

// import { getCategory } from "app/shared/reducers/category";

export interface IViewDataProp extends StateProps, DispatchProps {
  initScreen: Function;
  location: any;
}

export class ViewData extends React.Component<IViewDataProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.initScreen();
  }

  render() {
    const { managerClassData, pagination, loading } = this.props;
    return (
      <>
        <div className="col-12 action-wrapper">
          <button className="btn btn-action">Lớp học</button>
          <button className="btn btn-action ml-2">Import</button>
          <button className="btn btn-action ml-2">Export</button>
        </div>
        <div className="col-12 custom-table">
          <div className="row custom-table-header no-gutters">
            <div className="col-1">STT</div>
            <div className="col-1">Tên khối</div>
            <div className="col-1">Mã lớp</div>
            <div className="col-1">Tên lớp</div>
            <div className="col-1">Sĩ Số</div>
            <div className="col-3">Giáo viên chủ nhiệm</div>
            <div className="col-2">Lớp chuyên</div>
            <div className="col-2">Action</div>
          </div>
          {!loading ?
            <>
              {
                managerClassData && managerClassData.length === 0 ?
                  <div className="row no-gutters custom-table-data">
                    <div className="col-12">No record found</div>
                  </div> :
                  managerClassData.map((v, idx) => (
                    <div className="row no-gutters custom-table-data">
                      <div className="col-1">{idx + 1}</div>
                      <div className="col-1">{v.groupOfClass}</div>
                      <div className="col-1">{v.idClass}</div>
                      <div className="col-1">{v.nameClass}</div>
                      <div className="col-1">{v.totalStudent}</div>
                      <div className="col-3">{v.teacherManage}</div>
                      <div className="col-2">{v.professionalClass}</div>
                      <div className="col-2">Action</div>
                    </div>
                  ))
              }
            </> : <Loading/>
          }
        </div>
        {/*{pagination &&*/}
        {/*!loading &&*/}
        {/*pagination.numOfPages > 1 && (*/}
        {/*<div className="paging-container d-flex justify-content-center">*/}
        {/*<ReactPaginate*/}
        {/*breakLabel={<a>...</a>}*/}
        {/*breakClassName={'break-me'}*/}
        {/*pageCount={pagination.totalRecords / pagination.pageSize <= 1 ? 1 : pagination.totalRecords / pagination.pageSize}*/}
        {/*marginPagesDisplayed={1}*/}
        {/*pageRangeDisplayed={2}*/}
        {/*onPageChange={setPageNumber}*/}
        {/*containerClassName={'pagination'}*/}
        {/*subContainerClassName={'pages pagination'}*/}
        {/*activeClassName={'current'}*/}
        {/*nextLabel={translateUtil('Next')}*/}
        {/*previousLabel={translateUtil('Prev')}*/}
        {/*forcePage={pagination.pageNumber - 1}*/}
        {/*/>*/}
        {/*/!* End Pagination *!/*/}
        {/*</div>*/}
        {/*)}*/}
      </>
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
    dispatch(managerClassAction.requestManagerClassData());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewData));
