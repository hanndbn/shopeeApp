import "./home.scss";
import "./CarouselItem/carouselListItem.scss";

import React from "react";
import { connect } from "react-redux";
import { Alert, Col, Row } from "reactstrap";
import Carousel from "app/modules/carousel/carousel";
import { IRootState } from "app/shared/reducers";

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
        <div className="container">
          <div className="row category-container">
            <div className="col-12 d-flex flex-wrap justify-content-center">
              <div className="category-item">Tất cả</div>
              <div className="category-item">Kiến trúc</div>
              <div className="category-item">Nội thất</div>
              <div className="category-item">Cửa hàng</div>
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

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
