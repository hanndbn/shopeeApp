import './sidebar.scss';
import React from 'react';
import { Col, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';

export interface ISidebarProps {
}

export interface ISidebarState {
}

class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
  componentDidMount() {
  }

  render() {
    const {} = this.props;
    return (
      <div className="sidebar-container">
        <div>Side bar content</div>
      </div>
    );
  }
}

const mapStateToProps = ({ common }: IRootState) => ({
  isFullScreen: common.isFullScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar));
