import './login.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CONSTANTS, TITLE_HELMET } from 'app/config/constants';
import * as commonAction from 'app/shared/common/common.reducer';
import * as loginAction from 'app/modules/login/login.reducer';
import _ from 'lodash';
import CustomInputText from 'app/modules/inputCommon/CustomInputText';

export interface ILoginProp extends StateProps, DispatchProps {
  initScreen: Function;
  setFullScreen: Function;
  match: any;
}

export class Login extends React.Component<ILoginProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.setFullScreen(true);
    this.props.initScreen();
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (this.props.match.params.role !== prevProps.match.params.role) {
      this.props.initScreen();
    }
    return null;
  }

  componentWillUnmount() {
    this.props.setFullScreen(false);
  }

  render() {
    const { loginRole } = this.props;
    const role = CONSTANTS.LIST_ROLE[ loginRole ] ? CONSTANTS.LIST_ROLE[ loginRole ] : {};
    return (
      <div className="login-container"
           style={{ backgroundImage: 'url(content/images/login-bg.png)' }}
      >
        <Helmet>
          <title>{`${TITLE_HELMET}`}</title>
        </Helmet>
        <div className="h-100">
          <div className="row h-100">
            <div className="col-12 col-md-6 h-100">
              <div className="row justify-content-center align-items-center h-100">
                <div className="col-8 col-md-10 col-xl-7 col-lg-6 login-wrapper">
                  <div className="form-group">
                    <div><img src="content/images/login-user-icon.png"/></div>
                  </div>
                  <div className="form-group">
                    <div className="login-title">ĐĂNG NHẬP {role.title}</div>
                  </div>
                  <div className="form-group">
                    <div>Tên đăng nhập</div>
                    <CustomInputText formType={'FORM_SHIPPING_FIELD'} fieldName={'fullName'}/>
                  </div>
                  <div className="form-group">
                    <div>Mật Khẩu</div>
                    <CustomInputText formType={'FORM_SHIPPING_FIELD'} fieldName={'mobilePhone1'}/>
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
            <div className="g-hide-xs g-hide-sm col-md-6 logo-wrapper">
              <div className="logo-content">
                <img src="content/images/login-logo.png"/>
                <img src={role.imgSrc}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ login }: IRootState) => ({
  loginRole: login.loginRole
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
    dispatch(loginAction.reset());
    const role = ownProps.match.params.role;
    if (role && CONSTANTS.LIST_ROLE[ _.upperCase(role) ]) {
      dispatch(loginAction.setLoginRole(_.upperCase(role)));
    }
  },
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
