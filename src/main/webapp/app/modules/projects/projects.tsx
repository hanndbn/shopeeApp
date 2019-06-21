import './projects.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { animationDisplayLoading, reset } from 'app/shared/common/common.reducer';
import { Link } from 'react-router-dom';
import { requestProjectsData } from 'app/modules/projects/projects.reducer';
import Category from 'app/modules/category/category';

// import { getCategory } from "app/shared/reducers/category";

export interface IHomeProp extends StateProps, DispatchProps {
  initScreen: Function;
}

export class Projects extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.initScreen();
  }

  render() {
    const { projectsData } = this.props;
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
          <div className="row">
            {projects.map((project, idx) => (
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 g-margin-bottom-20 g-padding-left-right-5" key={idx}>
                <div className="card">
                  <Link className="card-img-wrapper" to={`/project-detail?id=${project.id}`}>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ projects }: IRootState) => ({
  projectsData: projects.projectsData
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
    dispatch(reset());
    dispatch(requestProjectsData(ownProps.history));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
