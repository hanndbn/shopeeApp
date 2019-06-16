import './about.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { animationDisplayLoading, reset } from 'app/shared/common/common.reducer';

// import { getCategory } from "app/shared/reducers/category";

export interface IAboutProp extends StateProps, DispatchProps {
  initScreen: Function;
}

export class About extends React.Component<IAboutProp> {
  componentDidMount() {
    this.props.initScreen();
  }

  render() {
    const { listItem } = this.props;
    return (
      <div className="about-container">
        <div className="card">
          <img className="card-img-top" src={'http://kconcept.vn/images/folio/thumbs/155924619096823.jpg'}/>
        </div>
        <div className="row no-gutters small-container">
          <div className="col-6 offset-6">
            <h3 className="dec-text">Kconcept Interior Design</h3>
            <p>
              KCONCEPT&nbsp;was founded in 2012. We are mainly engaged in design and construction interiors, residential, commercial, office space planning and project management.
            </p>
            <p>
              The good space is not the kind of extravagant, we try to design the space that people have better ways to interact and feel of the space temperature, the story of
              people to fill the space.
            </p>
            <a href="team.php" className="ajax btn anim-button   trans-btn   transition  fl-l" target="_blank">
              <span>Our Team</span>
            </a>
          </div>
        </div>
        {/*<div className="alert-warning">This page is building</div>*/}
      </div>
    );
  }
}

const mapStateToProps = ({ common }: IRootState) => ({
  listItem: common.listItem
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
    dispatch(reset());
    dispatch(animationDisplayLoading());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
