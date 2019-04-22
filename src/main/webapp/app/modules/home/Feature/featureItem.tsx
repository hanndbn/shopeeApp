import "./feature.scss";

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

const FeatureItem = () => {
  return (
    <div className="feature-item">
      <div>
        <img className="w-100" src={itemImg} />
      </div>
      <div className="feature-item-hr" />
      <div className="feature-item-name">Nha Khoa</div>
    </div>
  );
};

export default FeatureItem;
