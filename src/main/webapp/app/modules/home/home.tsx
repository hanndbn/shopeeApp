import './home.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import Carousel from 'app/modules/carousel/carousel';
import { IRootState } from 'app/shared/reducers';
import { animationDisplayLoading, reset, setHeaderBackground } from 'app/shared/common/common.reducer';
import Projects from 'app/modules/projects/projects';

// import { getCategory } from "app/shared/reducers/category";

export interface IHomeProp extends StateProps, DispatchProps {
  initScreen: Function;
}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.initScreen();
  }

  render() {
    const { listItem } = this.props;
    return (
      <div className="">
        <Carousel/>
        <Projects/>
      </div>
    );
  }
}

const mapStateToProps = ({ common }: IRootState) => ({
  listItem: common.listItem
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: async () => {
    await dispatch(reset());
    dispatch(setHeaderBackground('transparent'));
    await dispatch(animationDisplayLoading());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
