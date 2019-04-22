import "./hospital.scss";

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

const HospitalContainer = () => {
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
    <div className="feature-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center feature-header">
            <div>DỊCH VỤ NỔI BẬT</div>
            <hr className="feature-hr" />
          </div>
          <div className="col-12">
            <div className="">
              <Slider {...settings}>
                <Hospital />
                <Hospital />
                <Hospital />
                <Hospital />
                <Hospital />
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalContainer;
