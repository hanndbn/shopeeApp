import './news.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { animationDisplayLoading, reset } from 'app/shared/common/common.reducer';

// import { getCategory } from "app/shared/reducers/category";

export interface INewsProp extends StateProps, DispatchProps {
  initScreen: Function;
}

export class News extends React.Component<INewsProp> {
  componentDidMount() {
    this.props.initScreen();
  }

  render() {
    const { } = this.props;
    return (
      <div className="new-container">
        <div className="alert-warning">This page is building</div>
      </div>
    );
  }
}

const mapStateToProps = ({ common }: IRootState) => ({
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
)(News);
