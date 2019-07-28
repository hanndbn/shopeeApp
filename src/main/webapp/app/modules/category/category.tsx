import './category.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import _ from 'lodash';
import * as categoryAction from 'app/modules/category/category.reducer';
import cn from 'classnames';
import { paramObj } from 'app/shared/util/util';
import qs from 'querystring';
import { withRouter } from 'react-router';

// import { getCategory } from "app/shared/reducers/category";

export interface IHomeProp extends StateProps, DispatchProps {
  location: any;
  initScreen: Function;
  setActiveCategory: Function;
  setActiveSubCategory: Function;
  handleChangeCategory: Function;
  handleChangeSubCategory: Function;
}

export class Category extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.initScreen();
  }

  getSnapshotBeforeUpdate(prevProps, prevState): any | null {
    const currentParams = paramObj(this.props.location.search);
    const prevParams = paramObj(prevProps.location.search);
    if (currentParams && prevParams && currentParams['category'] !== prevParams['category']) {
      this.props.setActiveCategory();
    }
    if (currentParams && prevParams && currentParams['subCategory'] !== prevParams['subCategory']) {
      this.props.setActiveSubCategory();
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    const {
      categoryData,
      activeCategory,
      activeSubCategory,
      setActiveCategory,
      settingActiveCategory,
      handleChangeCategory,
      handleChangeSubCategory
    } = this.props;
    const rootCategory = categoryData.find(category => category.parent === 0);
    if (!rootCategory) return null;
    let parentCategory = [rootCategory, ...categoryData.filter(category => category.parent === rootCategory.id)];
    parentCategory = _.orderBy(parentCategory, ['display_order'], ['asc']);
    let childCategory = categoryData && categoryData
      .filter(category => rootCategory && activeCategory && parseInt(activeCategory, 10) !== rootCategory.id && category.parent === parseInt(activeCategory, 10));
    childCategory = _.orderBy(childCategory, ['display_order'], ['asc']);
    return (
      <div className="">
        <div className="row category-container">
          <div className="col-12 d-flex flex-wrap justify-content-center">
            {
              parentCategory.map((category, idx) => (
                <div className={cn('category-item', { 'active': (!activeCategory && category.id === 0) || (activeCategory && category.id === parseInt(activeCategory, 10)) })}
                     key={idx}
                     onClick={() => handleChangeCategory(category.id)}>{category.name}</div>
              ))
            }
          </div>
          <div className={cn('col-12 d-flex flex-wrap justify-content-center', { 'sub-category-wrapper': !settingActiveCategory })}>
            {
              childCategory.map((category, idx) => (
                <div className={cn('sub-category-item', { 'active': (activeSubCategory && category.id === parseInt(activeSubCategory, 10)) })}
                     key={idx}
                     onClick={() => handleChangeSubCategory(category.id)}
                >
                  <span className="text">{category.name}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ category }: IRootState) => ({
  categoryData: category.categoryData,
  activeCategory: category.activeCategory,
  activeSubCategory: category.activeSubCategory,
  settingActiveCategory: category.settingActiveCategory
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
    const params = paramObj(ownProps.location.search);
    const category = params['category'] ? params['category'] : null;
    dispatch(categoryAction.setActiveCategory(category));
  },
  handleChangeCategory: category => {
    const params = paramObj(ownProps.location.search);
    params.category = category;
    delete params.subCategory;
    ownProps.history.push(`${ownProps.location.pathname}?${qs.stringify(params)}`);
  },
  handleChangeSubCategory: subCategory => {
    const params = paramObj(ownProps.location.search);
    params.subCategory = subCategory;
    ownProps.history.push(`${ownProps.location.pathname}?${qs.stringify(params)}`);
  },
  setActiveCategory: () => {
    const params = paramObj(ownProps.location.search);
    const category = params['category'] ? params['category'] : null;
    dispatch(categoryAction.setActiveCategory(category));
    dispatch(categoryAction.setActiveSubCategory(null));
  },
  setActiveSubCategory: () => {
    const params = paramObj(ownProps.location.search);
    const subCategory = params['subCategory'] ? params['subCategory'] : null;
    dispatch(categoryAction.setActiveSubCategory(subCategory));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Category));
