import "./home.scss";
import "./CarouselItem/carouselListItem.scss";

import React from "react";
import { Link } from "react-router-dom";
import { Translate } from "react-jhipster";
import { connect } from "react-redux";
import { Alert, Col, Row } from "reactstrap";
import Carousel from "app/modules/carousel/carousel";
import { IRootState } from "app/shared/reducers";
import FeatureItem from "app/modules/home/Feature/feature";
import HospitalContainer from "app/modules/home/Hospital/hospitalContainer";
import CarouselListItemContainer from "app/modules/home/CarouselItem/carouselListItemContainer";
import Header from "app/shared/layout/header/header";

// import { getCategory } from "app/shared/reducers/category";

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    // this.props.getCategory();
  }

  render() {
    const { servicesData } = this.props;
    return (
      <div className="">
        <Header />
        <Carousel />
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex justify-content-between">
              {servicesData &&
                servicesData.map((service, idx) => (
                  <div className="service-wrapper" style={{ backgroundColor: service.backgroundColor }} key={idx}>
                    <div className="service-content">
                      <div className="service-icon">
                        <img src={service.iconImage} />
                      </div>
                      <div className="service-title">{service.title}</div>
                      <div dangerouslySetInnerHTML={{ __html: service.description }} />
                    </div>
                    <div className="server-more">
                      <Link to={service.url} className="server-link">
                        Xem Thêm
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content bg-white">
            <div className="s-carousel__header">
              <div className="d-flex align-items-center w-100">
                <div className="carousel-list-item-title">ƯU ĐÃI NỔI BẬT</div>
                <div className="carousel-list-item-hr" />
              </div>
            </div>
            <div className="s-carousel__cards">
              <div className="u-d__flex">
                <div className="u-margin--10__left u-margin--10__right outline-none">
                  <div className="card">
                    <div className="card__img--280x280">
                      <a href="/health-checkup-packages/hanoi/master?utm_campaign=packages_section&utm_medium=referral&utm_source=practo_home_page">
                        <img
                          src="https://www.practostatic.com/consumer-home/desktop/images/1540976352/desktop-health-checkups-home@2x.jpg"
                          alt="Health checkups at home starting just at Rs.999"
                          className="card__img card-border"
                          style={{ backgroundColor: "" }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="u-margin--10__left u-margin--10__right outline-none">
                  <div className="card">
                    <div className="card__img--280x280">
                      <a href="/consult/direct/new_consultation?plan=paid">
                        <img
                          src="https://www.practostatic.com/consumer-home/desktop/images/1540976352/desktop-offer-online-consultation-at-99.jpg"
                          alt="Chat with a doctor at Rs.99"
                          className="card__img card-border"
                          style={{ backgroundColor: "" }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="u-margin--10__left u-margin--10__right outline-none">
                  <div className="card">
                    <div className="card__img--280x280">
                      <a href="/labs?utm_campaign=free_hs&utm_medium=referral&utm_source=practo_home_page">
                        <img
                          src="https://www.practostatic.com/consumer-home/desktop/images/1540976352/desktop-free-home-sample-collection-diagnostic-tests.jpg"
                          alt="Free home sample collection of diagnostic tests"
                          className="card__img card-border"
                          style={{ backgroundColor: "" }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="u-margin--10__left u-margin--10__right outline-none">
                  <div className="card">
                    <div className="card__img--280x280">
                      <a href="/order/">
                        <img
                          src="https://www.practostatic.com/consumer-home/desktop/images/1540976352/desktop-offer-on-prescription-medicine.jpg"
                          alt="Upto 20% off on prescription medicine"
                          className="card__img card-border"
                          style={{ backgroundColor: "" }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-list-item-wrapper">
          <div className="container">
            <div className="row bg-white">
              <div className="col-12 d-flex align-items-center">
                <div className="carousel-list-item-title g-font-size-20">BẠN ĐANG TÌM KIẾM BÁC SĨ GIỎI CHUYÊN KHOA ?</div>
                {/*<div className="carousel-list-item-hr"/>*/}
              </div>
              <div className="col-12 d-flex">
                <div className="u-margin--10__left u-margin--10__right outline-none" tabIndex={-1} style={{ width: "100%", display: "inline-block" }}>
                  <div className="card--280">
                    <a href="/hanoi/dentist" className="card-link" />
                    <a href="/hanoi/dentist">
                      <img
                        src="https://www.practostatic.com/consumer-home/desktop/images/1540452836/sp-dentist@2x.jpg"
                        alt="Dentist"
                        className="card__img card__img--280x200"
                        style={{ backgroundColor: "#d7d8e2" }}
                      />
                    </a>
                    <div className="u-margin--12__top">
                      <h6 className="u-font--16 u-margin--0 u-font--bold card__header g-padding-top-10">Nha sĩ</h6>
                    </div>
                    <div className="u-t-c--black_1 u-font--14">Vấn đề về răng miệng? Lên lịch kiểm tra nha khoa ngay</div>
                  </div>
                </div>
                <div className="u-margin--10__left u-margin--10__right outline-none" tabIndex={-1} style={{ width: "100%", display: "inline-block" }}>
                  <div className="card--280">
                    <a href="/hanoi/dentist" className="card-link" />
                    <a href="/hanoi/dentist">
                      {" "}
                      <img
                        src="https://www.practostatic.com/consumer-home/desktop/images/1540452836/sp-gynecologist@2x.jpg"
                        alt="Gynecologist/Obstetrician"
                        className="card__img card__img--280x200"
                        style={{ backgroundColor: "#d7d8e2" }}
                      />
                    </a>
                    <div className="u-margin--12__top">
                      <h6 className="u-font--16 u-margin--0 u-font--bold card__header g-padding-top-10">Phụ khoa / Sản khoa</h6>
                    </div>
                    <div className="u-t-c--black_1 u-font--14">Khám sưc khỏe cho phụ nữ mang thai và điều trị vô sinh</div>
                  </div>
                </div>
                <div className="u-margin--10__left u-margin--10__right outline-none" tabIndex={-1} style={{ width: "100%", display: "inline-block" }}>
                  <div className="card--280">
                    <a href="/hanoi/dentist" className="card-link" />
                    <a href="/hanoi/dentist">
                      <img
                        src="https://www.practostatic.com/consumer-home/desktop/images/1540452836/sp-dietitian@2x.jpg"
                        alt="Dentist"
                        className="card__img card__img--280x200"
                        style={{ backgroundColor: "#d7d8e2" }}
                      />
                    </a>
                    <div className="u-margin--12__top">
                      <h6 className="u-font--16 u-margin--0 u-font--bold card__header g-padding-top-10">Chuyên gia dinh dưỡng</h6>
                    </div>
                    <div className="u-t-c--black_1 u-font--14">Hướng dẫn về ăn uống hợp lý, quản lý cân nặng và dinh dưỡng thể thao</div>
                  </div>
                </div>
                <div className="u-margin--10__left u-margin--10__right outline-none" tabIndex={-1} style={{ width: "100%", display: "inline-block" }}>
                  <div className="card--280">
                    <a href="/hanoi/dentist" className="card-link" />
                    <a href="/hanoi/dentist">
                      <img
                        src="https://www.practostatic.com/consumer-home/desktop/images/1540452836/sp-physiotherapist@2x.jpg"
                        alt="Dentist"
                        className="card__img card__img--280x200"
                        style={{ backgroundColor: "#d7d8e2" }}
                      />
                    </a>
                    <div className="u-margin--12__top">
                      <h6 className="u-font--16 u-margin--0 u-font--bold card__header g-padding-top-10">Vật lý trị liệu</h6>
                    </div>
                    <div className="u-t-c--black_1 u-font--14">Một cơ thể săn chắc? Bạn sẽ ược điều trị bởi một nhà vật lý trị liệu được đào tạo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container g-margin-top-30">
          <div className="row bg-white">
            <div className="col-12 d-flex align-items-center">
              <div className="carousel-list-item-title">VẬN CHUYỂN TỨC THÌ</div>
              <div className="carousel-list-item-hr" />
            </div>
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
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex align-items-center">
              <div className="carousel-list-item-title">Tin tức sự kiện</div>
              <div className="carousel-list-item-hr" />
            </div>
            <div className="col-12">
              <ul className="d-flex">
                <li className="d-flex">
                  <div className="thumb">
                    <div>
                      <img
                        src="https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec19_1.png"
                        alt="10 quận huyện tại Hà Nội được tầm soát ung thư đại trực tràng miễn phí"
                        className="home-thumb-img"
                        data-src="https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec19_1.png"
                      />
                    </div>
                    <a title="10 quận huyện tại Hà Nội được tầm soát ung thư đại trực tràng miễn phí">
                      <img
                        width={400}
                        height={250}
                        src="https://benhvienthucuc.vn/wp-content/uploads/2018/03/MG_0706-400x250.jpg"
                        className="thumb-400x250 wp-post-image"
                        alt="10 quận huyện tại Hà Nội được tầm soát ung thư đại trực tràng miễn phí"
                        data-src="https://benhvienthucuc.vn/wp-content/uploads/2018/03/MG_0706-400x250.jpg"
                      />{" "}
                    </a>
                  </div>
                  <div className="text">
                    <h4>
                      <a>10 quận huyện tại Hà Nội được tầm soát ung thư đại trực tràng miễn phí</a>
                    </h4>
                    <p>
                      Nối tiếp thành công tại quận Tây Hồ, chiến dịch Tầm soát ung thư đại trực tràng miễn phí tiếp tục được triển khai tại 10 quận huyện Hà Nội đem lại cơ hội tiếp
                      cận thông tin và khám sàng lọc, phát hiện sớm ung thư cho hàng ngàn người dân. (more…)
                      <span>
                        <a title="10 quận huyện tại Hà Nội được tầm soát ung thư đại trực tràng miễn phí" className="read-more">
                          Xem tiếp
                        </a>
                      </span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/*<CarouselListItemContainer/>*/}
        {/*<CarouselListItemContainer/>*/}
        {/*<FeatureItem/>*/}
        {/*<HospitalContainer/>*/}
      </div>
    );
  }
}

const mapStateToProps = ({ common }: IRootState) => ({
  servicesData: common.servicesData
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
