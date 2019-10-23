import './sidebar.scss';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';

export interface ISidebarProps {
}

export interface ISidebarState {
}

class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
  componentDidMount() {
  }

  render() {
    const {} = this.props;
    return (
      <div className="sidebar-container">
        <div className="sidebar-wrapper">
          <div className="sidebar-item">Trang chủ</div>
        </div>

        <div className="sidebar-wrapper">
          <div className="sidebar-item">Nhật kí hoạt động</div>
        </div>

        <div className="sidebar-wrapper">
          <div className="sidebar-item active">Thi</div>
          <div className="sidebar-sub-item-wrapper">
            <div className="sidebar-sub-item active">Thi thử</div>
            <div className="sidebar-sub-item">Thực hiện bài thi</div>
            <div className="sidebar-sub-item">Kết quả bài thi</div>
            <div className="sidebar-sub-item">Phúc khảo</div>
          </div>
        </div>
        <div className="sidebar-wrapper">
          <div className="sidebar-item">Thông tin cá nhân</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ common }: IRootState) => ({
  isFullScreen: common.isFullScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar));
