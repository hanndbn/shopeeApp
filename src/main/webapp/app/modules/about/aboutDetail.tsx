import Slider from 'react-slick';
import LazyLoad from 'react-lazyload';
import React from 'react';

const NextArrow = props1 => (
  <div onClick={props1.onClick} className="arrow-carousel animation-delay next-arrow-carousel">
    <i className="next-arrow-icon"/>
  </div>
);

const PrevArrow = props1 => (
  <div onClick={props1.onClick} className="arrow-carousel animation-delay prev-arrow-carousel">
    <i className="prev-arrow-icon"/>
  </div>
);

// import { getCategory } from "app/shared/reducers/category";
export const AboutDetail = props => {
  const { data, initIdx } = props;
  const settings = {
    initialSlide: initIdx,
    dots: true,
    infinite: true,
    speed: 1500,
    fade: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
    lazyLoad: 'ondemand',
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>
  };
  return (
    <Slider {...settings} key={new Date()}>
      {
        data && data.map((item, idx1) => (<div key={idx1} className="card about-detail-container">
            <LazyLoad height={200} offset={100} once>
              <img className="card-img-top" src={item.guid}/>
            </LazyLoad>
          </div>)
        )
      }
    </Slider>
  );
};
