import "./home.scss";

import React from "react";
import { Link } from "react-router-dom";
import { Translate } from "react-jhipster";
import { connect } from "react-redux";
import { Alert, Col, Row } from "reactstrap";
import { getCategory } from "app/shared/reducers/category";

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getCategory();
  }

  render() {
    const { account } = this.props;
    return <div className="" />;
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getCategory };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
