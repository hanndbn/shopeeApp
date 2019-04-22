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

const Hospital = () => {
  return (
    <div className="feature-item">
      <div>
        <img className="w-100" src={itemImg} />
      </div>
      <div className="hospital-name-wrapper">
        <div className="hospital-name">Nha Khoa</div>
      </div>
      <div className="hospital-overlay" />
    </div>
  );
};

export default Hospital;
