import './projects.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { animationDisplayLoading, reset } from 'app/shared/common/common.reducer';
import { Link, withRouter } from 'react-router-dom';
import { requestProjectsData } from 'app/modules/projects/projects.reducer';
import Category from 'app/modules/category/category';
import { paramObj } from 'app/shared/util/util';
import Loading from 'app/Loader/loading';
import { Helmet } from 'react-helmet';
import { TITLE_HELMET } from 'app/config/constants';
import LazyLoad from 'react-lazyload';

// import { getCategory } from "app/shared/reducers/category";

export interface IHomeProp extends StateProps, DispatchProps {
  initScreen: Function;
  handleChangeData: Function;
  location: any;
  hiddenHelmet: any;
}

export class Projects extends React.Component<IHomeProp> {
  async componentDidMount() {
    window.scrollTo(0, 0);
    await this.props.initScreen();
    await this.props.handleChangeData();
  }

  getSnapshotBeforeUpdate(prevProps, prevState): any | null {
    const currentParams = paramObj(this.props.location.search);
    const prevParams = paramObj(prevProps.location.search);
    if (currentParams[ 'category' ] !== prevParams[ 'category' ]
      || currentParams[ 'subCategory' ] !== prevParams[ 'subCategory' ]) {
      this.props.handleChangeData();
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    const { projectsData, activeCategory, loading, categoryData, activeSubCategory, hiddenHelmet } = this.props;
    const projects = [];
    projectsData && projectsData.map(project => {
      projects.push({
        ...project.acf,
        id: project.id,
        list_images: project.list_images
      });
    });
    const category = categoryData.find(v => v.id.toString() === activeCategory);
    const categoryName = category ? ` | ${category.name}` : '';
    const subCategory = categoryData.find(v => v.id.toString() === activeSubCategory);
    const subCategoryName = subCategory ? ` | ${subCategory.name}` : '';
    return (
      <div className="projects-container list-item-container">
        {
          !hiddenHelmet &&
          <Helmet>
            <title>{`${TITLE_HELMET} | Dự Án${categoryName}${subCategoryName}`}</title>
          </Helmet>
        }
        <Category/>
        <div className="">
          {
            loading ? <Loading/>
              :
              projects.length > 0 ?
                <div className="row">
                  {projects.map((project, idx) => {
                    const link = `/project-detail?id=${project.id}${activeCategory ? `&category=${activeCategory}` : ''}${activeCategory && activeSubCategory ? `&subCategory=${activeSubCategory}` : ''}`;
                    return (
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 g-margin-bottom-20 g-padding-left-right-5" key={idx}>
                        <div className="card">
                          <Link className="card-img-wrapper" to={link}>
                            <LazyLoad height={200} offset={100} once>
                              <div className="card-img" style={{ backgroundImage: `url(${project.avatar_img})` }}/>
                            </LazyLoad>
                          </Link>
                          <div className="card-body">
                            <h5 className="card-title">
                              <Link to={link}>{project.project_name}</Link>
                            </h5>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
  activeCategory: category.activeCategory,
  activeSubCategory: category.activeSubCategory,
  categoryData: category.categoryData
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
    dispatch(reset());
    dispatch(animationDisplayLoading());
  },
  handleChangeData: () => {
    const params = paramObj(ownProps.location.search);
    const category = params[ 'category' ] ? params[ 'category' ] : null;
    const subCategory = params[ 'subCategory' ] ? params[ 'subCategory' ] : null;
    dispatch(requestProjectsData(subCategory ? subCategory : category));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects));
