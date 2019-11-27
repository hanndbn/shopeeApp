import React from 'react';
import './social.scss';
import { connect } from 'react-redux';
// import BScroll from '@better-scroll/core';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router';

export interface ISocialProps extends StateProps, DispatchProps {
  shareSocialList: any;
  location: any;
}

export class Social extends React.Component<ISocialProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="row d-flex w-100 h-100">
        {
          this.props.shareSocialList && this.props.shareSocialList.map((v, idx) => {
            let content: any = '';
            if (v === 'facebook') {
              content = <div
                onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=https://shopee.vn/-M%C3%A3-MAVTN12-ho%C3%A0n-20-t%E1%BB%91i-%C4%91a-35k-xu-%C4%91%C6%A1n-99k-%C3%81o-N%E1%BB%89-Nam-VICERO-Tr%C6%A1n-4-M%C3%A0u-Phong-C%C3%A1ch-N%C4%83ng-%C4%90%E1%BB%99ng-i.40342563.3302669311',
                  '_blank',
                  'width=800,height=600,scrollbars=1,resizable=1,status=1')}
              >test</div>;
            }
            return <div key={idx}>{content}</div>;
          })
        }
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
)(Social));
