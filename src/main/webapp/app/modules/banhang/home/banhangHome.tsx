import "./banhangHome.scss";
import "./category_copy.scss";
import "./temp_copy.scss";

import React from "react";
import { connect } from "react-redux";
import { Alert, Col, Row } from "reactstrap";
import { IRootState } from "app/shared/reducers";
import Carousel from "app/modules/carousel/carousel";
import Header from "app/shared/layout/header/header";
import Slider from "react-slick";
import { setCarouselBanHang } from "app/modules/carousel/carousel.reducer";

// import { getCategory } from "app/shared/reducers/category";

export interface IHomeProp extends StateProps, DispatchProps {
  setCarousel: Function;
}

export class BanhangHome extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.setCarousel();
  }

  render() {
    const { servicesData } = this.props;
    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 700,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      pauseOnFocus: true,
      lazyLoad: "ondemand",
      cssEase: "linear",
      fade: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      responsive: [
        {
          breakpoint: 320,
          settings: {
            dots: false,
            arrows: true
          }
        },
        {
          breakpoint: 992,
          settings: {
            dots: false,
            arrows: true
          }
        }
      ]
    };
    return (
      <div className="ban-hang-home">
        <Header />
        <div className="container">
          <Carousel />
        </div>
        <div className="container g-margin-top-50 bg-white">
          <div className="container category">
            <div className="d-flex align-items-center">
              <div className="carousel-list-item-title">Sản Phẩm</div>
              <div className="carousel-list-item-hr" />
            </div>
            <div className="row distance-sm">
              {/**/}
              <div className="col-md-3 col-sm-6 col-6 ng-star-inserted">
                <div
                  className="category-item outline-none text-center lazyloaded"
                  tabIndex={0}
                  data-bg="https://cdn.jiohealth.com/pharmacy/category/1/bg_1_m.jpg"
                  style={{ backgroundImage: 'url("https://cdn.jiohealth.com/pharmacy/category/1/bg_1_m.jpg")', opacity: 1, transitionDelay: "0.1s" }}
                >
                  {/**/}
                  <div className="category-overlay ng-star-inserted">
                    <img
                      data-src="https://cdn.jiohealth.com/pharmacy/category/1/icon_1_m.png"
                      className=" lazyloaded "
                      src="https://cdn.jiohealth.com/pharmacy/category/1/icon_1_m.png"
                      style={{ opacity: 1, transitionDelay: "0.1s" }}
                    />
                    <p className="name text-center font-bold text-white">Mẹ &amp; bé</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-6 ng-star-inserted">
                <div
                  className="category-item outline-none text-center lazyloaded"
                  tabIndex={0}
                  data-bg="https://cdn.jiohealth.com/pharmacy/category/2/bg_1_m.png"
                  style={{ backgroundImage: 'url("https://cdn.jiohealth.com/pharmacy/category/2/bg_1_m.png")', opacity: 1, transitionDelay: "0.1s" }}
                >
                  {/**/}
                  <div className="category-overlay ng-star-inserted">
                    <img
                      data-src="https://cdn.jiohealth.com/pharmacy/category/2/icon_1_m.png"
                      className=" lazyloaded "
                      src="https://cdn.jiohealth.com/pharmacy/category/2/icon_1_m.png"
                      style={{ opacity: 1, transitionDelay: "0.1s" }}
                    />
                    <p className="name text-center font-bold text-white">Thực phẩm chức năng</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-6 ng-star-inserted">
                <div
                  className="category-item outline-none text-center lazyloaded"
                  tabIndex={0}
                  data-bg="https://cdn.jiohealth.com/pharmacy/category/3/bg_1_m.png"
                  style={{ backgroundImage: 'url("https://cdn.jiohealth.com/pharmacy/category/3/bg_1_m.png")', opacity: 1, transitionDelay: "0.1s" }}
                >
                  {/**/}
                  <div className="category-overlay ng-star-inserted">
                    <img
                      data-src="https://cdn.jiohealth.com/pharmacy/category/3/icon_1_m.png"
                      className=" lazyloaded "
                      src="https://cdn.jiohealth.com/pharmacy/category/3/icon_1_m.png"
                      style={{ opacity: 1, transitionDelay: "0.1s" }}
                    />
                    <p className="name text-center font-bold text-white">Chăm sóc cá nhân</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-6 ng-star-inserted">
                <div
                  className="category-item outline-none text-center lazyloaded"
                  tabIndex={0}
                  data-bg="https://cdn.jiohealth.com/pharmacy/category/4/bg_1_m.png"
                  style={{ backgroundImage: 'url("https://cdn.jiohealth.com/pharmacy/category/4/bg_1_m.png")', opacity: 1, transitionDelay: "0.1s" }}
                >
                  {/**/}
                  <div className="category-overlay ng-star-inserted">
                    <img
                      data-src="https://cdn.jiohealth.com/pharmacy/category/4/icon_1_m.png"
                      className=" lazyloaded "
                      src="https://cdn.jiohealth.com/pharmacy/category/4/icon_1_m.png"
                      style={{ opacity: 1, transitionDelay: "0.1s" }}
                    />
                    <p className="name text-center font-bold text-white">Chăm sóc sức khỏe</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-6 ng-star-inserted">
                <div
                  className="category-item outline-none text-center lazyloaded"
                  tabIndex={0}
                  data-bg="https://cdn.jiohealth.com/pharmacy/category/5/bg_1_m.png"
                  style={{ backgroundImage: 'url("https://cdn.jiohealth.com/pharmacy/category/5/bg_1_m.png")', opacity: 1, transitionDelay: "0.1s" }}
                >
                  {/**/}
                  <div className="category-overlay ng-star-inserted">
                    <img
                      data-src="https://cdn.jiohealth.com/pharmacy/category/5/icon_1_m.png"
                      className=" lazyloaded "
                      src="https://cdn.jiohealth.com/pharmacy/category/5/icon_1_m.png"
                      style={{ opacity: 1, transitionDelay: "0.1s" }}
                    />
                    <p className="name text-center font-bold text-white">Tủ thuốc gia đình</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-6 ng-star-inserted">
                <div
                  className="category-item outline-none text-center lazyloaded"
                  tabIndex={0}
                  data-bg="https://cdn.jiohealth.com/pharmacy/category/6/bg_1_m.png"
                  style={{ backgroundImage: 'url("https://cdn.jiohealth.com/pharmacy/category/6/bg_1_m.png")', opacity: 1, transitionDelay: "0.1s" }}
                >
                  {/**/}
                  <div className="category-overlay ng-star-inserted">
                    <img
                      data-src="https://cdn.jiohealth.com/pharmacy/category/6/icon_1_m.png"
                      className=" lazyloaded "
                      src="https://cdn.jiohealth.com/pharmacy/category/6/icon_1_m.png"
                      style={{ opacity: 1, transitionDelay: "0.1s" }}
                    />
                    <p className="name text-center font-bold text-white">Chăm sóc phụ nữ</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-6 ng-star-inserted">
                <div
                  className="category-item outline-none text-center lazyloaded"
                  tabIndex={0}
                  data-bg="https://cdn.jiohealth.com/pharmacy/category/7/bg_1_m.png"
                  style={{ backgroundImage: 'url("https://cdn.jiohealth.com/pharmacy/category/7/bg_1_m.png")', opacity: 1, transitionDelay: "0.1s" }}
                >
                  {/**/}
                  <div className="category-overlay ng-star-inserted">
                    <img
                      data-src="https://cdn.jiohealth.com/pharmacy/category/7/icon_1_m.png"
                      className=" lazyloaded "
                      src="https://cdn.jiohealth.com/pharmacy/category/7/icon_1_m.png"
                      style={{ opacity: 1, transitionDelay: "0.1s" }}
                    />
                    <p className="name text-center font-bold text-white">Chăm sóc sắc đẹp</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 col-6 ng-star-inserted">
                <div
                  className="category-item outline-none text-center lazyloaded"
                  tabIndex={0}
                  data-bg="https://cdn.jiohealth.com/pharmacy/category/8/bg_1_m.png"
                  style={{ backgroundImage: 'url("https://cdn.jiohealth.com/pharmacy/category/8/bg_1_m.png")', opacity: 1, transitionDelay: "0.1s" }}
                >
                  {/**/}
                  <div className="category-overlay ng-star-inserted">
                    <img
                      data-src="https://cdn.jiohealth.com/pharmacy/category/8/icon_1_m.png"
                      className=" lazyloaded "
                      src="https://cdn.jiohealth.com/pharmacy/category/8/icon_1_m.png"
                      style={{ opacity: 1, transitionDelay: "0.1s" }}
                    />
                    <p className="name text-center font-bold text-white">Sức khỏe giới tính</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container g-margin-top-50">
          <div className="pharmacy-made-easy g-padding-10">
            <div className="d-flex align-items-center">
              <div className="carousel-list-item-title">Tạo Đơn Thuốc</div>
              <div className="carousel-list-item-hr" />
            </div>
            <div className="container">
              <div className="pharmacy-wrapper">
                <div className="item-5">
                  <div className="card product card-white">
                    <img
                      alt="prescription"
                      className=" lazyloaded"
                      data-src="https://cdn.jiohealth.com/pharmacy/otc-website/assets/icons/prescription-pic-image@3x.png"
                      style={{ height: "66px", width: "40px", opacity: 1, transitionDelay: "0.1s" }}
                      src="https://cdn.jiohealth.com/pharmacy/otc-website/assets/icons/prescription-pic-image@3x.png"
                    />
                    <h4 className="font-bold card-title">Chụp hình Đơn Thuốc Của Bạn</h4>
                    <p className="text-justify">Và tải ảnh lên website hoặc ứng dụng Jio Health.</p>
                  </div>
                </div>
                <div className="item-5">
                  <div className="card product card-white">
                    <img
                      alt="pharm-consultation"
                      className=" lazyloaded"
                      data-src="https://cdn.jiohealth.com/pharmacy/otc-website/assets/icons/pharm-consultation@3x.png"
                      style={{ height: "66px", width: "66px", opacity: 1, transitionDelay: "0.1s" }}
                      src="https://cdn.jiohealth.com/pharmacy/otc-website/assets/icons/pharm-consultation@3x.png"
                    />
                    <h4 className="font-bold card-title">Tham Vấn Dược Sĩ</h4>
                    <p className="text-justify">
                      Các dược sĩ kinh nghiệm sẽ gọi điện tư vấn và xác nhận đơn thuốc. Dược sĩ sẽ tận tình hướng dẫn và trả lời bất cứ câu hỏi nào về việc dùng thuốc của bạn.
                    </p>
                  </div>
                </div>
                <div className="item-5">
                  <div className="card product card-white">
                    <img
                      alt="package"
                      className=" lazyloaded"
                      data-src="https://cdn.jiohealth.com/pharmacy/otc-website/assets/icons/package-icon@3x.png"
                      style={{ height: "45px", width: "60px", marginTop: "20px", opacity: 1, transitionDelay: "0.1s" }}
                      src="https://cdn.jiohealth.com/pharmacy/otc-website/assets/icons/package-icon@3x.png"
                    />
                    <h4 className="font-bold card-title">Giao hàng Miễn Phí Trong 2 Giờ</h4>
                    <p className="text-justify">Chúng tôi sẽ cẩn thận đóng gói đơn hàng và giao tận tay vào khung giờ thuận tiện nhất cho bạn.</p>
                  </div>
                </div>
                <div className="item-5">
                  <div className="card product card-white">
                    <img
                      alt="card"
                      className=" lazyloaded"
                      data-src="https://cdn.jiohealth.com/pharmacy/otc-website/assets/icons/card-header-icon@3x.png"
                      style={{ height: "66px", width: "72px", opacity: 1, transitionDelay: "0.1s" }}
                      src="https://cdn.jiohealth.com/pharmacy/otc-website/assets/icons/card-header-icon@3x.png"
                    />
                    <h4 className="font-bold card-title">Thanh toán Tiện Lợi</h4>
                    <p className="text-justify">Bạn có thể thanh toán bằng tiền mặt hoặc thẻ thông qua máy POS khi nhận hàng. Bạn cũng có thể yêu cầu xuất hoá đơn VAT nếu cần.</p>
                  </div>
                </div>
                <div className="item-5">
                  <div className="card product card-white">
                    <img
                      alt="contact"
                      className=" lazyloaded"
                      data-src="https://cdn.jiohealth.com/pharmacy/otc-website/assets/icons/contact-icon@3x.png"
                      style={{ height: "66px", width: "66px", opacity: 1, transitionDelay: "0.1s" }}
                      src="https://cdn.jiohealth.com/pharmacy/otc-website/assets/icons/contact-icon@3x.png"
                    />
                    <h4 className="font-bold card-title">Hỗ Trợ Tận Tình</h4>
                    <p className="text-justify">Các dược sĩ sẽ luôn tận tình trả lời những thắc mắc về toa thuốc của bạn, từ 8:00 đến 22:00 tất cả các ngày trong tuần.</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="btn btn-create-order" tabIndex={0}>
                  Tạo Đơn Thuốc Ngay
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container g-margin-top-30">
          <div className="row">
            <div className="col-sm-6 col-12">
              <div className="row">
                <div className="col-sm-6 col-8">
                  <div className="card blue">
                    <div className="card-header">
                      <img className="pill-icon" width={25} src="https://cdn.jiohealth.com/pharmacy/otc-website/assets/icons/pill-icon@3x.png" />
                      <p _ngcontent-c11>Đơn hàng #A5639</p>
                      <h4 className="title">Giao hàng thành công</h4>
                    </div>
                    <div className="card-body">
                      <ul _ngcontent-c11>
                        <li _ngcontent-c11>
                          <h5 _ngcontent-c11>Giao thành công</h5>
                          <small _ngcontent-c11>15:28</small>
                        </li>
                        <li _ngcontent-c11>
                          <h5 _ngcontent-c11>Đang trên đường</h5>
                          <small _ngcontent-c11>14:37</small>
                        </li>
                        <li _ngcontent-c11>
                          <h5 _ngcontent-c11>Đơn hàng được xác nhận</h5>
                          <small _ngcontent-c11>14:08</small>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-6 motobike">
                  <img
                    alt="delivery image"
                    className="w-100 delivery-image lazyloaded"
                    data-src="https://cdn.jiohealth.com/pharmacy/otc-website/assets/images/delivery-image@3x.png"
                    src="https://cdn.jiohealth.com/pharmacy/otc-website/assets/images/delivery-image@3x.png"
                    style={{ opacity: 1, transitionDelay: "0.1s" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-12">
              <div className="right-pill-content">
                <h3 className="text-white">Siêu Thuận Tiện, Nhanh Không Ngờ</h3>
                <p _ngcontent-c11 className="text-white text-justify">
                  Hiện tại Nhà thuốc trực tuyến Jio mới cung cấp dịch vụ tại TP.HCM. Vui lòng đặt thuốc trước 8 giờ tối để được giao thuốc trong cùng ngày bạn nhé.
                </p>
                <div className="free-shipping">
                  <div className="media">
                    <div className="media-left media-middle">
                      <img
                        alt="free ribbon"
                        className=" lazyloaded"
                        data-src="https://cdn.jiohealth.com/pharmacy/otc-website/assets/icons/free-ribbon@3x.png"
                        width={80}
                        src="https://cdn.jiohealth.com/pharmacy/otc-website/assets/icons/free-ribbon@3x.png"
                        style={{ opacity: 1, transitionDelay: "0.1s" }}
                      />
                    </div>
                    <div className="media-body">
                      <p className="top-sub-title text-uppercase">Đặc biệt</p>
                      <h3 _ngcontent-c11 className="text-white title">
                        Giao Hàng Miễn Phí
                      </h3>
                      <p className="bottom-sub-title text-white">Dành cho tất cả đơn hàng trị giá trên 100.000đ.</p>
                    </div>
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

const mapStateToProps = ({ common }: IRootState) => ({
  servicesData: common.servicesData
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setCarousel: () => {
    dispatch(setCarouselBanHang());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BanhangHome);
