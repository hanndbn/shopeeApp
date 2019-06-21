import './projectDetail.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { requestProjectDetailData } from 'app/modules/projectDetail/projectDetail.reducer';
import { paramObj } from 'app/shared/util/util';
import Slider from 'react-slick';

const NextArrow = props => (
  <div onClick={props.onClick} className="arrow-carousel animation-delay next-arrow-carousel">
    <i className="next-arrow-icon"/>
  </div>
);

const PrevArrow = props => (
  <div onClick={props.onClick} className="arrow-carousel animation-delay prev-arrow-carousel">
    <i className="prev-arrow-icon"/>
  </div>
);

const Settings = {
  dots: false,
  infinite: true,
  speed: 2000,
  autoplaySpeed: 3000,
  pauseOnHover: true,
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

export interface IProjectDetailProp extends StateProps, DispatchProps {
  location: any;
  projectDetailData: any;
  initScreen: Function;
}

export class ProjectDetail extends React.Component<IProjectDetailProp> {
  componentDidMount() {
    this.props.initScreen();
  }

  getSnapshotBeforeUpdate(prevProps, prevState): any | null {
    const currentParams = paramObj(this.props.location.search);
    const prevParams = paramObj(prevProps.location.search);
    if (currentParams[ 'id' ] !== prevParams[ 'id' ]) {
      this.props.initScreen();
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    const { projectDetailData } = this.props;
    const project = {
      ...projectDetailData.acf,
      list_images: projectDetailData.list_images
    };
    return (
      <div className="">
        <div className="item-detail-container">
          <div className="row no-gutters">
            <div className="col-md-12 col-lg-3 col-xl-3">
              <div className="left-panel">
                <h3>{project.project_name}</h3>
                <div className="w-100 d-flex">
                  <div className="separator"/>
                </div>
                <p>{project.description}</p>
                <h4>Info</h4>
                <div className="project-details">
                  <div>
                    <span>Date :</span> {project.date}
                  </div>
                  <div>
                    <span>Client :</span> {project.client}
                  </div>
                  <div>
                    <span>Status :</span> {project.status}
                  </div>
                  <div>
                    <span>Location : </span> {project.location}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-9">
              {project.display_slide ?
                <Slider {...Settings}>
                  {project.list_images &&
                  project.list_images.map((img, idx) => (
                    <div key={idx}>
                      <div key={idx} className="card">
                        <img className="card-img-top" src={img.guid}/>
                      </div>
                    </div>
                  ))}
                </Slider>
                :
                <>
                  {project.list_images &&
                  project.list_images.map((img, idx) => (
                    <div key={idx} className="card">
                      <img className="card-img-top" src={img.guid}/>
                    </div>
                  ))}
                </>
              }

            </div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ projectDetail }: IRootState) => ({
  projectDetailData: projectDetail.projectDetailData
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
    const params = paramObj(ownProps.location.search);
    const projectId = params[ 'id' ] ? params[ 'id' ] : '';
    dispatch(requestProjectDetailData(projectId));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetail);
