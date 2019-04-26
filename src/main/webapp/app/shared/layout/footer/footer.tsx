import "./footer.scss";
import "./footer_copy.scss";

import React from "react";
import { Col, Row } from "reactstrap";

const Footer = props => (
  <div id="footer_bvtc">
    <section className="container12 foot1">
      <div className="wrap">
        <div className="d_flex">
          <div className="foot1_col3">
            <h2>
              <b className="ttu">Công ty CP TNHH Dương Nhật Plus</b>
            </h2>
            <p>
              <br />
              ĐKKD số: 0102624215-001 – Sở Kế hoạch và Đầu tư thành phố Hà Nội cấp ngày 11/02/2009 <br />
              Giấy phép hoạt động cơ sở khám chữa bệnh số 26/BYT-GPHD do Bộ y tế cấp ngày 21/02/2017 <br />
            </p>
            <p>
              Email: contact@duongnhatplus.vn <br />
              Hỗ trợ chăm sóc khách hàng: <a href="tel:1900 5588 92">1900 1931</a> <br />
              Email: cskh@duongnhatplus.com <br />
            </p>
          </div>
          <div className="foot1_col2">
            <ul id="menu-menu-footer" className="menu">
              <li className="menu-item current-menu-item">
                <a rel="dofollow" href="/">
                  Trang chủ
                </a>
              </li>
              <li className="menu-item">
                <a rel="dofollow" href="/loi-gioi-thieu/">
                  Lời giới thiệu
                </a>
              </li>
              <li className="menu-item">
                <a rel="dofollow" href="/dich-vu/">
                  Dịch vụ
                </a>
              </li>
              <li className="menu-item">
                <a rel="dofollow" href="/bac-si-tu-van/">
                  Bác sĩ tư vấn
                </a>
              </li>
              <li className="menu-item">
                <a rel="nofollow" href="/chinh-sach-bao-mat-thong-tin-ca-nhan-khach-hang-tai-benh-vien-thu-cuc/">
                  Chính sách bảo mật thông tin
                </a>
              </li>
              <li className="menu-item">
                <a rel="nofollow" href="/lien-he/">
                  Liên hệ
                </a>
              </li>
            </ul>
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  width={700}
                  height={250}
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=165%20th%C3%A1i%20h%C3%A0&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  frameBorder={0}
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                />
                <a href="https://www.emojilib.com" />
              </div>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    ".mapouter{position:relative;text-align:right;height:250px;width:700px;}.gmap_canvas {overflow:hidden;background:none!important;height:250px;width:700px;}"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Footer;
