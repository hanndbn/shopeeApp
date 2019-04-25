import "./medicineHome.scss";

import React from "react";
import { connect } from "react-redux";
import { Alert, Col, Row } from "reactstrap";
import { IRootState } from "app/shared/reducers";

// import { getCategory } from "app/shared/reducers/category";

export interface IHomeProp extends StateProps, DispatchProps {}

export class MedicineHome extends React.Component<IHomeProp> {
  componentDidMount() {
    // this.props.getCategory();
  }

  render() {
    const { servicesData } = this.props;
    return <div className="">1</div>;
  }
}

const mapStateToProps = ({ common }: IRootState) => ({
  servicesData: common.servicesData
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicineHome);
