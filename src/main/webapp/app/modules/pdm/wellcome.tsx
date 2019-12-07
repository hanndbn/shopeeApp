import React from 'react';
import './wellcome.scss';
import { connect } from 'react-redux';
// import BScroll from '@better-scroll/core';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router';

export interface IWellComeProps extends StateProps, DispatchProps {
  fullName: any;
}

export class WellCome extends React.Component<IWellComeProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { fullName } = this.props;
    return (
      <div className="w-100 h-100 well-come-container">
        <div className="well-come-wrapper">
          <div className="well-come-content">
            <div>Hi <span className="name">{fullName}</span>,</div>
            <div>This is your app</div>
            <div>with your demand.</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ home }: IRootState) => ({
  appId: home.appId
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(WellCome));
