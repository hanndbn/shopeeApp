import './login.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { TITLE_HELMET } from 'app/config/constants';
import * as commonAction from 'app/shared/common/common.reducer';

export interface ILoginProp extends StateProps, DispatchProps {
  setFullScreen: Function;
}

export class Login extends React.Component<ILoginProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.setFullScreen(true);
  }

  componentWillUnmount() {
    this.props.setFullScreen(false);
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    const {} = this.props;
    return (
      <div className="login-container"
           style={{ backgroundImage: 'url(content/images/bg-login-giaovien.bmp)' }}
      >
        <Helmet>
          <title>{`${TITLE_HELMET}`}</title>
        </Helmet>
        <div className="h-100">
          <div className="row h-100">
            <div className="col-12 col-md-6 h-100">
              <div className="row justify-content-center align-items-center h-100">
                <div className="col-8 login-wrapper">
                  <div className="form-group">
                    <div><img src="content/images/user-login.png"/></div>
                  </div>
                  <div className="form-group">
                    <div className="login-title">ĐĂNG NHẬP</div>
                  </div>
                  <div className="form-group">
                    <div>Tên đăng nhập</div>
                    <input className="form-control" type="text"/>
                  </div>
                  <div className="form-group">
                    <div>Mật Khẩu</div>
                    <input className="form-control" type="text"/>
                  </div>
                  <div className="form-group row align-items-center justify-content-center">
                    <input type="checkbox"/>
                    <span>Lưu lại mật khẩu</span>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-common btn-login">Đăng nhập</button>
                  </div>
                  <div className="form-group">
                    <a className="btn-link" href="#">Quên mật khẩu</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({}: IRootState) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setFullScreen: isFullScreen => {
    dispatch(commonAction.setFullScreen(isFullScreen));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login));
