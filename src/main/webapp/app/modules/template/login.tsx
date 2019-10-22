import './login.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { TITLE_HELMET } from 'app/config/constants';

// import { getCategory } from "app/shared/reducers/category";

export interface IHomeProp extends StateProps, DispatchProps {
}

export class Login extends React.Component<IHomeProp> {
  async componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    const {} = this.props;
    return (
      <div className="template-container">
        <Helmet>
          <title>{`${TITLE_HELMET}`}</title>
        </Helmet>
      </div>
    );
  }
}

const mapStateToProps = ({}: IRootState) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login));
