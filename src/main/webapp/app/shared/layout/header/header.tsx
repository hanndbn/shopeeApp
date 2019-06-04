import "./header.scss";

import React from "react";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import { Link } from "react-router-dom";

export interface IHeaderProps {}

export interface IHeaderState {}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {};

  render() {
    return (
      <div className="">
        <div className="header-wrapper">
          <div className="container-fluid">
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
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav header-menu-wrapper">
                      <li className="nav-item active">
                        <a className="nav-link" href="#">
                          <span className="nav-text">Home</span>
                          <span className="sr-only">(current)</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <span className="nav-text">Giới thiệu</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <span className="nav-text">Dự án</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <span className="nav-text">Tin tức</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          <span className="nav-text">Liên hệ</span>
                        </a>
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
