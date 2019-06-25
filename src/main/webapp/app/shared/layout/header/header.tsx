import './header.scss';

import React from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { reset } from 'app/shared/common/common.reducer';
import { connect } from 'react-redux';
import { HEADER_LINK } from 'app/config/constants';

export interface IHeaderProps {
  headerBackground: any;
  location: any;
}

export interface IHeaderState {
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {};

  render() {
    const { headerBackground } = this.props;
    const logo = this.props.location.pathname === '/' ? 'logo-white.jpg' : 'logo-black.jpg';
    return (
      <div className="">
        {/*<div className="header-wrapper" style={{ background: headerBackground }}>*/}
        <div className="header-wrapper" id="header-wrapper">
          <div className="">
            <div className="row">
              <div className="col-12">
                <nav className="navbar navbar-custom navbar-expand-lg">
                  <Link to="/" className="navbar-brand" href="#">
                    <img className="logo-image" src={`content/images/logo/${logo}`}/>
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
                        <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" d="M4 7h22M4 15h22M4 23h22"/>
                      </svg>
                    </span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav header-menu-wrapper">
                      {
                        HEADER_LINK.map((item, idx) =>
                          <li className="nav-item active" key={idx}
                              data-toggle="collapse"
                              data-target="#navbarNav"
                              aria-controls="navbarNav"
                              aria-expanded="false"
                          >
                            <Link className="nav-link" to={item.pathname}>
                              <span className="nav-text">{item.title}</span>
                            </Link>
                          </li>
                        )
                      }
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

const mapStateToProps = ({}: IRootState) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
    dispatch(reset());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header));
