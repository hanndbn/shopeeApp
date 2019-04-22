import "./home.scss";

import React from "react";
import { Link } from "react-router-dom";
import { Translate } from "react-jhipster";
import { connect } from "react-redux";
import { Alert, Col, Row } from "reactstrap";
import Carousel from "app/modules/carousel/carousel";
import { IRootState } from "app/shared/reducers";
import FeatureItem from "app/modules/home/Feature/feature";
import HospitalContainer from "app/modules/home/Hospital/hospitalContainer";

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
        <Carousel />
        <hr />
        <div className="container">
          <div className="row justify-content-between">
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
                    <div className="server-link">Xem Thêm</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <FeatureItem />
        <HospitalContainer />
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
