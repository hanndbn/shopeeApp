import "./carouselListItem.scss";

import React from "react";
import { Link } from "react-router-dom";
import { Translate } from "react-jhipster";
import { connect } from "react-redux";
import { Alert, Col, Row } from "reactstrap";
import Carousel from "app/modules/carousel/carousel";
import { IRootState } from "app/shared/reducers";
// tslint:disable-next-line
const itemImg = require("static/images/temp/sp-dentist@3x.jpg");
import Slider from "react-slick";
import FeatureItem from "app/modules/home/Feature/featureItem";
import Hospital from "app/modules/home/Hospital/hospital";
// tslint:disable-next-line
// const carousel1 = require('static/images/temp/pills-300x320.png');
// tslint:disable-next-line
// const carousel2 = require('static/images/temp/cheap7.jpg');

const NextArrow = props => (
  <div onClick={props.onClick} className="arrow-carousel animation-delay next-arrow-carousel">
    <i className="next-arrow" />
  </div>
);

const PrevArrow = props => (
  <div onClick={props.onClick} className="arrow-carousel animation-delay prev-arrow-carousel">
    <i className="prev-arrow" />
  </div>
);

const CarouselListItemContainer = () => {
  const carousel1 = "/content/images/temp/pills-300x320.png";
  const carousel2 = "/content/images/temp/cheap7.jpg";
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
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
    <div className="carousel-list-item-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex align-items-center">
            <div className="carousel-list-item-title">Bệnh viện hàng đầu</div>
            <div className="carousel-list-item-hr" />
          </div>
          <div className="col-12 d-flex">
            <div className="carousel-list-item-summary">
              <img src="content/images/temp/benh_vien_108_zing_9.jpg" />
            </div>
            <div className="carousel-list-item-detail">
              <div className="row h-100">
                <div className="col-6">
                  <div className="row h-50">
                    <div className="col-6 carousel-list-item-detail-sub ">
                      <div className="carousel-list-item-detail-sub-title">LCD Monitor</div>
                      <div className="carousel-list-item-detail-sub-img">
                        <img className="home-category-info-tab-word-img" src={carousel2} />
                      </div>
                    </div>
                    <div className="col-6 carousel-list-item-detail-sub ">
                      <div className="carousel-list-item-detail-sub-title">LCD Monitor</div>
                      <div className="carousel-list-item-detail-sub-img">
                        <img className="home-category-info-tab-word-img" src={carousel2} />
                      </div>
                    </div>
                  </div>
                  <div className="row h-50">
                    <div className="col-6 carousel-list-item-detail-sub ">
                      <div className="carousel-list-item-detail-sub-title">LCD Monitor</div>
                      <div className="carousel-list-item-detail-sub-img">
                        <img className="home-category-info-tab-word-img" src={carousel2} />
                      </div>
                    </div>
                    <div className="col-6 carousel-list-item-detail-sub ">
                      <div className="carousel-list-item-detail-sub-title">LCD Monitor</div>
                      <div className="carousel-list-item-detail-sub-img">
                        <img className="home-category-info-tab-word-img" src={carousel2} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row h-50">
                    <div className="col-6 carousel-list-item-detail-sub ">
                      <div className="carousel-list-item-detail-sub-hot-title">HOT SELLING LIST</div>
                      <div className="carousel-list-item-detail-sub-hot-detail">Data Cables</div>
                      <div className="hot-topic-image-wrap">
                        <img className="hot-topic-image" src={carousel2} />
                        <div className="img-mask" />
                      </div>
                    </div>
                    <div className="col-6 carousel-list-item-detail-sub ">
                      <div className="carousel-list-item-detail-sub-hot-title">HOT SEARCHED LIST</div>
                      <div className="carousel-list-item-detail-sub-hot-detail">Data Cables</div>
                      <div className="hot-topic-image-wrap">
                        <img className="hot-topic-image" src={carousel2} />
                        <div className="img-mask" />
                      </div>
                    </div>
                  </div>
                  <div className="row h-50">
                    <div className="col-6 carousel-list-item-detail-sub ">
                      <div className="carousel-list-item-detail-sub-hot-title">HOT SEARCHED LIST</div>
                      <div className="carousel-list-item-detail-sub-hot-detail">Data Cables</div>
                      <div className="hot-topic-image-wrap">
                        <img className="hot-topic-image" src={carousel2} />
                        <div className="img-mask" />
                      </div>
                    </div>
                    <div className="col-6 carousel-list-item-detail-sub ">
                      <div className="carousel-list-item-detail-sub-hot-title">View More</div>
                      <div className="carousel-list-item-detail-sub-img hot-topic-image-wrap">
                        <img className="hot-topic-image" src={carousel2} />
                        <div className="img-mask" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselListItemContainer;
