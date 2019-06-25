import './home.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import Carousel from 'app/modules/carousel/carousel';
import { IRootState } from 'app/shared/reducers';
import { setHeaderBackground } from 'app/shared/common/common.reducer';
import Projects from 'app/modules/projects/projects';
import $ from 'jquery';
import { withRouter } from 'react-router';

// import { getCategory } from "app/shared/reducers/category";

export interface IHomeProp extends StateProps, DispatchProps {
  initScreen: Function;
  location: any;
}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.initScreen();
    $('#header-wrapper').attr('class', 'header-wrapper home-header');
  }

  componentWillUnmount() {
    $('#header-wrapper').attr('class', 'header-wrapper');
  }

  render() {
    const {} = this.props;
    return (
      <div className="">
        <Carousel/>
        <Projects/>
      </div>
    );
  }
}

const mapStateToProps = ({ common }: IRootState) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: async () => {
    dispatch(setHeaderBackground('transparent'));
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));
