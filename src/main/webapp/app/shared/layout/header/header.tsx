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
          <div className="top-header-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-8 d-flex align-items-center g-font-size-14">
                  <div className="g-margin-right-20">Tải ứng dụng</div>
                  <div className="g-margin-right-20">Chăm sóc khách hàng</div>
                  <div className="g-margin-right-20">
                    <span className="hotline-tile">Hotline: </span>
                    <span className="hotline-value">0985 584 989</span>
                  </div>
                </div>
                <div className="col-4 d-flex align-items-center justify-content-end">
                  <div className="text-right">Đăng Nhập</div>
                </div>
              </div>
            </div>
          </div>
          <div className="search-input-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-2 d-flex justify-content-center align-items-center">
                  <Link to={"/"} className="tmp-logo">
                    DuongNhatPlus
                  </Link>
                </div>
                <div className="col-10 search-input-wrapper">
                  <input className="search-input form-control" placeholder="Tìm kiếm..." />
                  <div className="btn btn-search-input">Search</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
