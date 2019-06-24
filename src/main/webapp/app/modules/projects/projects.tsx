import './projects.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { reset } from 'app/shared/common/common.reducer';
import { Link, withRouter } from 'react-router-dom';
import { requestProjectsData } from 'app/modules/projects/projects.reducer';
import Category from 'app/modules/category/category';
import { paramObj } from 'app/shared/util/util';
import Loading from 'app/Loader/loading';

// import { getCategory } from "app/shared/reducers/category";

export interface IHomeProp extends StateProps, DispatchProps {
  initScreen: Function;
  location: any;
}

export class Projects extends React.Component<IHomeProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.initScreen();
  }

  getSnapshotBeforeUpdate(prevProps, prevState): any | null {
    const currentParams = paramObj(this.props.location.search);
    const prevParams = paramObj(prevProps.location.search);
    if (currentParams['category'] !== prevParams['category']
      || currentParams['subCategory'] !== prevParams['subCategory']) {
      this.props.initScreen();
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    const { projectsData, activeCategory, loading } = this.props;
    const projects = [];
    projectsData && projectsData.map(project => {
      projects.push({
        ...project.acf,
        id: project.id,
        list_images: project.list_images
      });
    });
    return (
      <div className="projects-container list-item-container">
        <Category/>
        <div className="container-fluid">
          {
            loading ? <Loading/>
              :
              projects.length > 0 ?
                <div className="row">
                  {projects.map((project, idx) => (
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 g-margin-bottom-20 g-padding-left-right-5" key={idx}>
                      <div className="card">
                        <Link className="card-img-wrapper" to={`/project-detail?id=${project.id}&category=${activeCategory}`}>
                          <img className="card-img-top" src={project.avatar_img} alt="Card image cap"/>
                        </Link>
                        <div className="card-body">
                          <h5 className="card-title">
                            <Link to={`/project-detail?id=${project.id}`}>{project.project_name}</Link>
                          </h5>
                          <p className="card-text">{project.status}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                :
                <div className="row">
                  <div className="col-12">Không có dự án nào</div>
                </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ projects, category }: IRootState) => ({
  projectsData: projects.projectsData,
  loading: projects.loading,
  activeCategory: category.activeCategory
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
    dispatch(reset());
    const params = paramObj(ownProps.location.search);
    const category = params['category'] ? params['category'] : null;
    const subCategory = params['subCategory'] ? params['subCategory'] : null;
    dispatch(requestProjectsData(subCategory ? subCategory : category));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects));
