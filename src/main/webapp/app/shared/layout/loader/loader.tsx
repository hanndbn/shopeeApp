import './loader.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Row } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';

// import { getCategory } from "app/shared/reducers/category";

export interface INewsProp extends StateProps, DispatchProps {
  initScreen: Function;
}

export class Loader extends React.Component<INewsProp> {
  componentDidMount() {
    this.props.initScreen();
  }

  render() {
    const {} = this.props;
    return (
      <div>
        <div className="loader" style={{ display: 'block' }}>
          <div className="tm-loader">
            <div id="circle"/>
          </div>
        </div>
        <div className="loader-cover"/>
      </div>
    );
  }
}

const mapStateToProps = ({ common }: IRootState) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: async () => {
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader);
