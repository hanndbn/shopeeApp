import "./header.scss";

import React from "react";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import { Link } from "react-router-dom";
import { IRootState } from "app/shared/reducers";
import { reset } from "app/shared/common/common.reducer";
import { connect } from "react-redux";

export interface IHeaderProps {
  headerBackground: any;
}

export interface IHeaderState {}

class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {};

  render() {
    const { headerBackground } = this.props;
    return (
      <div className="">
        <div className="header-wrapper" style={{ background: headerBackground }}>
          <div className="">
            <div className="row">
              <div className="col-12">
                <nav className="navbar navbar-expand-lg">
                  <Link to="/" className="navbar-brand" href="#">
                    <img className="logo-image" src="http://pyramids.com.vn/wp-content/themes/pyramids/images/logofooter.png" />
                  </Link>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" focusable="false">
                        <title>Menu</title>
                        <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" d="M4 7h22M4 15h22M4 23h22" />
                      </svg>
                    </span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav header-menu-wrapper">
                      <li className="nav-item active">
                        <Link className="nav-link" to="/">
                          <span className="nav-text">Home</span>
                          <span className="sr-only">(current)</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/about-me">
                          <span className="nav-text">Giới thiệu</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/projects">
                          <span className="nav-text">Dự án</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/tin-tuc">
                          <span className="nav-text">Tin tức</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/contact-us">
                          <span className="nav-text">Liên hệ</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ common }: IRootState) => ({
  headerBackground: common.headerBackground
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
    dispatch(reset());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
