import "./headerMedicine.scss";

import React from "react";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";

export interface IHeaderProps {}

export interface IHeaderState {}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {};
  render() {
    return (
      <div className="">
        <div className="top-header-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-9 d-flex">
                <div className="top-header-title">Chăm sóc khách hàng</div>
                <div className="top-header-title">Kiểm tra đơn hàng</div>
              </div>
              <div className="col-3">
                <div className="top-header-title text-right g-padding-right-0">Đăng Nhập</div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-header-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-2 d-flex">
                <div className="top-header-title">
                  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMzAiIGhlaWdodD0iMzUiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNOTguOTE4Ljc5MmwtNC42MDYgMjQuMjAyYTY5Ljk3IDY5Ljk3IDAgMCAwLTEuMTM3IDkuNzIyaC02LjQ3MmwuMzg4LTQuMzEyaC0uMDk3Yy0yLjEwNiAzLjE3LTUuMDIzIDQuMzk2LTcuODAyIDQuMzk2LTQuMDUgMC03LjQxNS0zLjIyMS03LjQxNS05LjAyMyAwLTguMjk1IDYtMTUuOTA4IDE1LjAxOS0xNS45MDhhOS43OTggOS43OTggMCAwIDEgMy4yNzYuNTUyTDkxLjkxNi44MDRsNy4wMDItLjAxMnpNODkuMDQgMTYuMDE3YTQuNzA3IDQuNzA3IDAgMCAwLTIuNzc5LS44NDJjLTQuMjEgMC03LjE1OCA0Ljg3Ni03LjE1OCA5LjQ1NyAwIDIuODggMS4yNjMgNC40ODggMy4zMTQgNC40ODggMi4wNSAwIDQuNDg4LTIuMTQzIDUuNDE1LTYuNjgybDEuMjA4LTYuNDIxek0zLjAxNSAyNi42MzZhMTUuNTE2IDE1LjUxNiAwIDAgMCA3Ljc2OCAyLjEwNWMyLjc0MSAwIDUuMjM0LTEuMjYzIDUuMjM0LTMuODYxIDAtMS44NjEtMS40Mi0zLjA3OC00LjQ1LTQuNjMyLTMuNTE2LTEuOTA3LTYuODQzLTQuNDQ2LTYuODQzLTguNzVDNC43MjQgNC44NTIgMTAuNTQ0LjggMTcuNzI2LjhjNC4wMDkgMCA2LjM1NC44NzYgNy43NzMgMS42NTlMMjMuMyA4LjMxNmExMy4xMDcgMTMuMTA3IDAgMCAwLTYuMTQzLTEuNDc4Yy0zLjI3NiAwLTQuOTg1IDEuNjYzLTQuOTg1IDMuNDcgMCAxLjkxIDIuMDA0IDMuMDg2IDQuNzg3IDQuNjMgNC4wMDggMi4xMDYgNi41NTIgNC43ODggNi41NTIgOC43MDQgMCA3LjMyNi02LjA2NCAxMS4wOTUtMTMuMzk0IDExLjA5NS00LjU5NCAwLTcuODctMS4xOC05LjQzMi0yLjM1bDIuMzI5LTUuNzUxem00MS4wNjEgNi4yNTdjLTIuNzggMS40MTQtNi4yNCAxLjg1Ni04Ljg3NiAxLjg1Ni02LjgyNSAwLTEwLjMzNy0zLjg1Ni0xMC4zMzctMTAuMDUgMC03LjI2NyA1LjI2My0xNC44MyAxMy44OTUtMTQuODMgNC44MyAwIDguMjkgMi42ODcgOC4yOSA3LjEyIDAgNi4xMDItNS44OTQgOC4yOTUtMTUuNDYgOC4wNTEuMDEzLjg2Ni4yNjUgMS43MS43MjggMi40NDIuOTI2IDEuMjE3IDIuNTI2IDEuODUzIDQuNTg1IDEuODUzIDIuMzE0LjAxOCA0LjYwMS0uNSA2LjY4Mi0xLjUxMmwuNDkzIDUuMDd6bS02LjE5NC0xNy45Yy0zLjI2MyAwLTUuMTIgMi42ODMtNS42MDQgNC45MjMgNS40NzQuMDU1IDguMTktLjcyOSA4LjE5LTIuODc2IDAtMS4yMTctLjk3My0yLjA0Ni0yLjU4Ni0yLjA0NnptOC4xNDggMTkuNzIzbDMuMTI4LTE2LjU1MmMuNTg1LTMuMDIzIDEuMDU3LTYuMjEgMS4zNDctOC4zMTFoNi4yMzJsLS41NjkgNC41MDVoLjA5N2MyLjI0NC0zLjExNiA1LjIyMS00LjQ4OSA4LjM4OC00LjQ4OSAzLjkwMyAwIDYuMDk2IDIuMzk2IDYuMDk2IDYuNDg5YTMwLjAxNyAzMC4wMTcgMCAwIDEtLjM4NyA0LjA1bC0yLjcxMSAxNC4yODdoLTcuMDQ1bDIuNTg2LTEzLjY3MmExNi41NyAxNi41NyAwIDAgMCAuMjQ0LTIuNjg2YzAtMS42NTUtLjU5LTIuODMtMi4zNDUtMi44My0yLjI5MSAwLTQuOTczIDIuODgtNS45NDYgOC4xNDhsLTIuMDcxIDExLjA4Mi03LjA0NS0uMDIxem03NS4xNTMtMTUuMDMyYzAgOC43MjktNS45NSAxNS4xMjQtMTQuMjQgMTUuMTI0LTYuMDUgMC0xMC4xMDUtMy45NTMtMTAuMTA1LTkuODUyIDAtOC4yOTUgNS43NTYtMTUuMDc4IDE0LjI0LTE1LjA3OCA2LjM4NyAwIDEwLjEwNSA0LjM5NiAxMC4xMDUgOS44MDZtLTE3LjA3IDUuMTE2YzAgMi43NzkgMS4zNjUgNC42MzIgMy43OSA0LjYzMiAzLjg1MyAwIDYtNS42MDkgNi05LjcwNiAwLTIuMTk4LS45MjYtNC41MzQtMy43NTYtNC41MzQtNC4wNDYgMC02LjA5MiA1Ljg5NC02LjA0NiA5LjYwOG0xOS4xNjItMjAuNDVhMy4zNjggMy4zNjggMCAxIDEgNi43MzcgMCAzLjM2OCAzLjM2OCAwIDAgMS02LjczNyAwem01Ljg5NSAwYTIuNTQxIDIuNTQxIDAgMSAwLTUuMDgyIDAgMi41NDEgMi41NDEgMCAwIDAgNS4wODIgMHptLTMuODQtMS45MjloMS40MTVjLjkxOCAwIDEuNDEuMzE2IDEuNDEgMS4xMmEuOTU2Ljk1NiAwIDAgMS0uOTk4IDEuMDIzbDEuMDIgMS42NmgtLjcybC0uOTktMS42MzloLS40MjF2MS42MzhoLS43MTJsLS4wMDQtMy44MDJ6bS43MTEgMS42M2guNjI0Yy40MiAwIC43NzktLjA2Ljc3OS0uNTY1IDAtLjUwNS0uNDIxLS41MjYtLjc2Ny0uNTI2aC0uNjM2djEuMDl6Ii8+PHBhdGggZD0iTS02LTZoMTQyLjYzNnY0Ny42MTdILTZ6Ii8+PC9nPjwvc3ZnPg==" />
                </div>
              </div>
              <div className="col-8 d-flex align-items-center">
                <input type="text" className="form-control search-input" placeholder={"Tìm kiếm"} />
              </div>
              <div className="col-2 d-flex align-items-center justify-content-end main-header-cart-icon">
                <svg viewBox="0 0 24 24" width="1em" height="1em" className="iconCart_17T7">
                  <path
                    fill-rule="evenodd"
                    d="M8 18c-1.104 0-1.99.895-1.99 2 0 1.104.886 2 1.99 2a2 2 0 0 0 0-4m10 0c-1.104 0-1.99.895-1.99 2 0 1.104.886 2 1.99 2a2 2 0 0 0 0-4M4 2H1.999v1.999H4l3.598 7.588-1.353 2.451A2 2 0 0 0 8 17h12v-2H8.423a.249.249 0 0 1-.249-.25l.03-.121L9.102 13h7.449c.752 0 1.408-.415 1.75-1.029l3.574-6.489A1 1 0 0 0 21 3.999H6.213l-.406-.854A1.997 1.997 0 0 0 4 2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
