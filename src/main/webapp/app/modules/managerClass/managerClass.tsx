import './managerClass.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router';
import { TITLE_HELMET } from 'app/config/constants';
import { Helmet } from 'react-helmet';

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
    const { pagination } = this.props;
    return (
      <div className="manager-class-container table-container">
        <Helmet>
          <title>{`${TITLE_HELMET} QUẢN LÝ LỚP HỌC`}</title>
        </Helmet>
        <div className="row no-gutters">
          <div className="col-12 title">QUẢN LÝ LỚP HỌC</div>
          <div className="col-12 action-wrapper">
            <button className="btn btn-action">Lớp học</button>
            <button className="btn btn-action ml-2">Import</button>
            <button className="btn btn-action ml-2">Export</button>
          </div>
          <div className="col-12 custom-table">
            <div className="row custom-table-header no-gutters">
              <div className="col-1">Select</div>
              <div className="col-1">Tên khối</div>
              <div className="col-2">Mã lớp</div>
              <div className="col-2">Tên lớp</div>
              <div className="col-2">Giáo viên chủ nhiệm</div>
              <div className="col-2">Lớp chuyên</div>
              <div className="col-2">Action</div>
            </div>
            <div className="row no-gutters custom-table-data">
              <div className="col-1">select</div>
              <div className="col-1">10</div>
              <div className="col-2">2018.10A1</div>
              <div className="col-2">47</div>
              <div className="col-2">Vũ Thị Tuyết Mai</div>
              <div className="col-2">Toán</div>
              <div className="col-2">Action</div>
            </div>
            <div className="row no-gutters custom-table-data">
              <div className="col-1">select</div>
              <div className="col-1">10</div>
              <div className="col-2">2018.10A1</div>
              <div className="col-2">47</div>
              <div className="col-2">Vũ Thị Tuyết Mai</div>
              <div className="col-2">Toán</div>
              <div className="col-2">Action</div>
            </div>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ common, nhapDiem }: IRootState) => ({
  pagination: nhapDiem.pagination
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: async () => {
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerClass));
