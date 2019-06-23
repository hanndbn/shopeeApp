import './about.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { reset } from 'app/shared/common/common.reducer';

// import { getCategory } from "app/shared/reducers/category";

export interface IAboutProp extends StateProps, DispatchProps {
  initScreen: Function;
}

export class About extends React.Component<IAboutProp> {
  componentDidMount() {
    this.props.initScreen();
  }

  render() {
    const {} = this.props;
    return (
      <div className="about-container">
        <div className="alert-warning text-center">This page is building</div>
      </div>
    );
  }
}

const mapStateToProps = ({ common }: IRootState) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
    dispatch(reset());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
