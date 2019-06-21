import './category.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import _ from 'lodash';
import * as categoryAction from 'app/modules/category/category.reducer';
import cn from 'classnames';

// import { getCategory } from "app/shared/reducers/category";

export interface IHomeProp extends StateProps, DispatchProps {
  initScreen: Function;
  setActiveCategory: Function;
}

export class Category extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.initScreen();
  }

  render() {
    const {
      categoryData,
      activeCategory,
      setActiveCategory,
      settingActiveCategory
    } = this.props;
    const rootCategory = categoryData.find(category => category.parent === 0);
    if (!rootCategory) return null;
    let parentCategory = [ rootCategory, ...categoryData.filter(category => category.parent === rootCategory.id) ];
    parentCategory = _.orderBy(parentCategory, [ 'display_order' ], [ 'asc' ]);
    let childCategory = categoryData && categoryData
      .filter(category => activeCategory !== rootCategory.id && category.parent === activeCategory);
    childCategory = _.orderBy(childCategory, [ 'display_order' ], [ 'asc' ]);
    return (
      <div className="container-fluid">
        <div className="row category-container">
          <div className="col-12 d-flex flex-wrap justify-content-center g-margin-bottom-20">
            {
              parentCategory.map((category, idx) => (
                <div className="category-item" key={idx}
                     onClick={() => setActiveCategory(category.id)}>{category.name}</div>
              ))
            }
          </div>
          <div className={cn('col-12 d-flex flex-wrap justify-content-center', { 'sub-category-wrapper': !settingActiveCategory })}>
            {
              childCategory.map((category, idx) => (
                <div className="sub-category-item" key={idx}>
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
  settingActiveCategory: category.settingActiveCategory
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
    dispatch(categoryAction.setActiveCategory(null));
  },
  setActiveCategory: activeCategory => {
    dispatch(categoryAction.setActiveCategory(activeCategory));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
