import './about.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { animationDisplayLoading, reset } from 'app/shared/common/common.reducer';
import { withRouter } from 'react-router';
import { TITLE_HELMET } from 'app/config/constants';
import { Helmet } from 'react-helmet';

// import { getCategory } from "app/shared/reducers/category";

export interface IAboutProp extends StateProps, DispatchProps {
  initScreen: Function;
}

export class About extends React.Component<IAboutProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.initScreen();
  }

  render() {
    const {} = this.props;
    return (
      <div className="about-container">
        <Helmet>
          <title>{`${TITLE_HELMET} - Giới Thiệu`}</title>
        </Helmet>
        <div className="alert-warning text-center">This page is building</div>
      </div>
    );
  }
}

const mapStateToProps = ({ common }: IRootState) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
    dispatch(reset());
    dispatch(animationDisplayLoading());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(About));
