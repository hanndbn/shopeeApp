import React from "react";
import "./carousel.scss";
// import logo from 'static/images/logo/oe-logo.png'
import { connect } from "react-redux";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { IRootState } from "app/shared/reducers";
import * as carouselAction from "app/modules/carousel/carousel.reducer";
import _ from "lodash";

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

export interface ICarouselProp extends StateProps, DispatchProps {
  requestCarouselData: Function;
  reset: Function;
  carouselData: any;
}

export class Carousel extends React.Component<ICarouselProp> {
  componentDidMount() {
    this.props.requestCarouselData();
  }

  render() {
    const { carouselData } = this.props;
    const settings = {
      dots: true,
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
      autoplay: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 320,
          settings: {
            dots: true,
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
      <div className="site-carousel-wrapper">
        <div className="">
          <div className="">
            <Slider {...settings}>
              {carouselData &&
                carouselData.map(
                  (carousel, idx) =>
                    carousel && (
                      <div key={idx}>
                        <div className="carousel-container no-gutters">
                          <div className="col-12">
                            <img className="carousel-img" src={carousel.imageUrl} />
                          </div>
                          {/*<div className="col-12 col-sm-5 position-relative">*/}
                          {/*<div className="listItem-carousel-buttons">*/}
                          {/*<div className="carousel-title">*/}
                          {/*<img className="carousel-logo" src={carousel.imageUrlLine1 ? BASE_IMG_URL + carousel.imageUrlLine1 : ''} />*/}
                          {/*{carousel.description ? (*/}
                          {/*<div*/}
                          {/*style={{*/}
                          {/*fontSize: `${27 / LAYOUT_CONFIG.FONT_SIZE_GLOBAL}em`,*/}
                          {/*color: _.toString(carousel.textColor),*/}
                          {/*fontWeight: 600,*/}
                          {/*marginTop: '1.25em',*/}
                          {/*marginBottom: '1em'*/}
                          {/*}}*/}
                          {/*>*/}
                          {/*{carousel.description}*/}
                          {/*</div>*/}
                          {/*) : (*/}
                          {/*''*/}
                          {/*)}*/}
                          {/*</div>*/}
                          {/*<div className="text-center">*/}
                          {/*<Link*/}
                          {/*className="btn carousel-btn"*/}
                          {/*to={{*/}
                          {/*pathname: carousel.url,*/}
                          {/*state: { reset: true }*/}
                          {/*}}*/}
                          {/*>*/}
                          {/*{translateUtil('Shop Now')}*/}
                          {/*</Link>*/}
                          {/*</div>*/}
                          {/*</div>*/}
                          {/*</div>*/}
                        </div>
                      </div>
                    )
                )}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ carousel }: IRootState) => ({
  carouselData: carousel.carouselData
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestCarouselData: () => {
    dispatch(carouselAction.reset());
    // dispatch(carouselAction.requestCarouselData(ownProps.history));
  },
  reset: () => {
    dispatch(carouselAction.reset());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carousel);
