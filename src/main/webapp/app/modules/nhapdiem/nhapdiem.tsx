import './nhapDiem.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router';
import { TITLE_HELMET } from 'app/config/constants';
import { Helmet } from 'react-helmet';
import ReactPaginate from 'react-paginate';

// import { getCategory } from "app/shared/reducers/category";

export interface INhapDiemProp extends StateProps, DispatchProps {
  initScreen: Function;
  location: any;
}

export class NhapDiem extends React.Component<INhapDiemProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.initScreen();
  }

  render() {
    const { pagination } = this.props;
    return (
      <div className="nhapdiem-container">
        <Helmet>
          <title>{`${TITLE_HELMET}`}</title>
        </Helmet>
        <div className="row no-gutters">
          <div className="col-12 title">Nhập điểm</div>
          <div className="col-12 sub-title">Tìm Kiếm Điểm</div>
          <div className="col-12 search-wrapper">
            <div className="row">
              <div className="col-9">
                <div className="row">
                  <div className="col-3">
                    <div className="row align-items-center">
                      <div className="col-6">Khối lớp</div>
                      <div className="col-6">
                        <select className="form-control">
                          <option>11</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="row align-items-center">
                      <div className="col-6">Lớp học</div>
                      <div className="col-6">
                        <select className="form-control">
                          <option>11A1</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="row align-items-center">
                      <div className="col-6">Mã HS</div>
                      <div className="col-6">
                        <select className="form-control">
                          <option>11A1</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <input className="form-control"/>
              </div>
            </div>
          </div>
          <div className="col-12 sub-title">Nhập Điểm</div>
          <div className="col-12 custom-table">
            <div className="row custom-table-header no-gutters">
              <div className="col-1">STT</div>
              <div className="col-2">Học Sinh</div>
              <div className="col-2">Ngày Sinh</div>
              <div className="col-1">Miệng</div>
              <div className="col-1">15 phút</div>
              <div className="col-1">1 tiết</div>
              <div className="col-1">Học kỳ</div>
              <div className="col-1">TBHK</div>
              <div className="col-2">Action</div>
            </div>
            <div className="row no-gutters custom-table-data">
              <div className="col-1">1</div>
              <div className="col-2">Nguyễn Văn A</div>
              <div className="col-2">01/01/2000</div>
              <div className="col-1 d-flex justify-content-center">
                <div className="table-point">7</div>
              </div>
              <div className="col-1 d-flex justify-content-center">
                <div className="table-point">7</div>
                <div className="table-point">8</div>
                <div className="table-point">9</div>
              </div>
              <div className="col-1 d-flex justify-content-center">
                <div className="table-point">7</div>
                <div className="table-point">8</div>
              </div>
              <div className="col-1 d-flex justify-content-center">
                <div className="table-point">7</div>
              </div>
              <div className="col-1 d-flex justify-content-center">
                <div className="table-point">6.2</div>
              </div>
              <div className="col-2">icon</div>
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
)(NhapDiem));
