import './projectDetail.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { requestProjectDetailData } from 'app/modules/projectDetail/projectDetail.reducer';
import { paramObj } from 'app/shared/util/util';
import Slider from 'react-slick';
import { requestProjectsData } from 'app/modules/projects/projects.reducer';
import qs from 'querystring';
import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import { SCREEN_PATH, TITLE_HELMET } from 'app/config/constants';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

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
  speed: 1500,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  pauseOnFocus: true,
  lazyLoad: 'ondemand',
  cssEase: 'linear',
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
  getProjectDetailData: Function;
  getProjectsData: Function;
  handleChangeProject: Function;
}

export class ProjectDetail extends React.Component<IProjectDetailProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.initScreen();
  }

  getSnapshotBeforeUpdate(prevProps, prevState): any | null {
    const currentParams = paramObj(this.props.location.search);
    const prevParams = paramObj(prevProps.location.search);
    if (currentParams['id'] !== prevParams['id']) {
      this.props.getProjectDetailData();
    }
    if (currentParams['category'] !== prevParams['category']
      || currentParams['subCategory'] !== prevParams['subCategory']) {
      this.props.getProjectsData();
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    const { projectDetailData, projectNextPreviousData, handleChangeProject, activeCategory } = this.props;
    const project = {
      ...projectDetailData.acf,
      list_images: projectDetailData.list_images
    };
    const projectName = project && project.project_name ? project.project_name : '';
    return (
      <div className="">
        <Helmet>
          <title>{`${TITLE_HELMET} - ${projectName}`}</title>
        </Helmet>
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
                <div className="row w-100 no-gutters g-margin-top-10">
                  <div className="col-4 action-btn">
                    <button className="action-txt previous-btn"
                            disabled={projectNextPreviousData.previous === null}
                            onClick={() => handleChangeProject(projectNextPreviousData.previous)}
                    >Previous
                    </button>
                  </div>
                  <div className="col-4 text-center icon-grid-wrapper">
                    <Link to={`${SCREEN_PATH.PROJECTS}${activeCategory ? `?category=${activeCategory}` : ''}`}>
                      <span className="icon_grid-3x3"/>
                    </Link>
                  </div>
                  <div className="col-4 text-right action-btn">
                    <button className="action-txt next-btn"
                            disabled={projectNextPreviousData.next === null}
                            onClick={() => handleChangeProject(projectNextPreviousData.next)}>Next
                    </button>
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
                        <LazyLoad height={200} offset={100} once>
                          <img className="card-img-top" src={img.guid}/>
                        </LazyLoad>
                      </div>
                    </div>
                  ))}
                </Slider>
                :
                <>
                  {project.list_images &&
                  project.list_images.map((img, idx) => (
                    <div key={idx} className="card">
                      <LazyLoad height={200} offset={100} once>
                        <img className="card-img-top" src={img.guid}/>
                      </LazyLoad>
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

const mapStateToProps = ({ projectDetail, category }: IRootState) => ({
  projectDetailData: projectDetail.projectDetailData,
  projectNextPreviousData: projectDetail.projectNextPreviousData,
  activeCategory: category.activeCategory
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: async () => {
    const params = paramObj(ownProps.location.search);
    const projectId = params['id'] ? params['id'] : '';
    const category = params['category'] ? params['category'] : '';
    const subCategory = params['subCategory'] ? params['subCategory'] : '';
    await dispatch(requestProjectsData(subCategory ? subCategory : category));
    dispatch(requestProjectDetailData(projectId));
  },
  getProjectDetailData: () => {
    const params = paramObj(ownProps.location.search);
    const projectId = params['id'] ? params['id'] : '';
    dispatch(requestProjectDetailData(projectId));
  },
  getProjectsData: async () => {
    const params = paramObj(ownProps.location.search);
    const category = params['category'] ? params['category'] : '';
    const subCategory = params['subCategory'] ? params['subCategory'] : '';
    await dispatch(requestProjectsData(subCategory ? subCategory : category));
  },
  handleChangeProject: id => {
    const params = paramObj(ownProps.location.search);
    params.id = id;
    ownProps.history.push(`/project-detail?${qs.stringify(params)}`);
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetail));
