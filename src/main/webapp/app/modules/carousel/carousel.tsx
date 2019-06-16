import React from 'react';
import './carousel.scss';
// import logo from 'static/images/logo/oe-logo.png'
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { IRootState } from 'app/shared/reducers';
import * as carouselAction from 'app/modules/carousel/carousel.reducer';
import _ from 'lodash';

const NextArrow = props => (
  <div onClick={props.onClick} className="arrow-carousel animation-delay next-arrow-carousel">
    <i className="next-arrow"/>
  </div>
);

const PrevArrow = props => (
  <div onClick={props.onClick} className="arrow-carousel animation-delay prev-arrow-carousel">
    <i className="prev-arrow"/>
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
    const carouselDataSorted = carouselData ? _.orderBy(carouselData.map(carousel => carousel.acf), ['display_order'], ['asc']) : [];
    const settings = {
      dots: true,
      infinite: true,
      speed: 2000,
      autoplaySpeed: 10000,
      pauseOnHover: false,
      pauseOnFocus: true,
      lazyLoad: 'ondemand',
      cssEase: 'linear',
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      nextArrow: <NextArrow/>,
      prevArrow: <PrevArrow/>,
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
              {carouselDataSorted.map((carousel, idx) => (
                  <div key={idx}>
                    <div className="carousel-container no-gutters">
                      <div className="col-12 d-flex flex-wrap">
                        <img className="carousel-img" src={carousel.imageurl}/>
                        <div className="carousel-text-wrapper">
                          <div className="carousel-text">
                            <div>
                              <div>{carousel.display_title}</div>
                            </div>
                          </div>
                        </div>
                      </div>
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
    dispatch(carouselAction.requestCarouselData(ownProps.history));
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
