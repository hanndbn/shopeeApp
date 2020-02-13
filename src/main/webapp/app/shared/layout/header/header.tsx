import './header.scss';

import React from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { reset } from 'app/shared/common/common.reducer';
import { connect } from 'react-redux';

export interface IHeaderProps {
  location: any;
}

export interface IHeaderState {
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
  render() {
    const {} = this.props;
    return (
      <div className="header-container">
        <div className="row h-100">
          <div className="col-3 h-100">
            {/*<img className="h-100" src="content/images/logo/logo.png"/>*/}
          </div>
          <div className="col-6">
            <div>Search</div>
          </div>
          <div className="col-3">
            <div>user icon</div>
          </div>
        </div>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header));
