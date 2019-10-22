import './home.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import $ from 'jquery';
import { withRouter } from 'react-router';
import { TITLE_HELMET } from 'app/config/constants';
import { Helmet } from 'react-helmet';

// import { getCategory } from "app/shared/reducers/category";

export interface IHomeProp extends StateProps, DispatchProps {
  initScreen: Function;
  location: any;
}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.initScreen();
    $('#header-wrapper').attr('class', 'header-wrapper home-header');
  }

  componentWillUnmount() {
    $('#header-wrapper').attr('class', 'header-wrapper');
  }

  render() {
    const {} = this.props;
    return (
      <div className="">
        <Helmet>
          <title>{`${TITLE_HELMET}`}</title>
        </Helmet>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));
