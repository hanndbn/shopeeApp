import React from 'react';
import './social.scss';
import { connect } from 'react-redux';
// import BScroll from '@better-scroll/core';
import { IRootState } from 'app/shared/reducers';
import { withRouter } from 'react-router';
import _ from 'lodash';

export interface ISocialProps extends StateProps, DispatchProps {
  shareSocialList: any;
  location: any;
  width: any;
}

export class Social extends React.Component<ISocialProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { shareSocialList, width } = this.props;
    const elementWidth = shareSocialList.length > 0 ? ((width - shareSocialList.length * 5) / (shareSocialList.length)) : width;
    const ratioTransform: any = _.round(elementWidth / 55, 2);
    const shareFaceBook = this.props.shareSocialList.includes('facebook');
    const shareTwitter = this.props.shareSocialList.includes('twitter');
    const sharePinterest = this.props.shareSocialList.includes('pinterest');
    const shareLink = this.props.shareSocialList.includes('link');
    return (
      <div className="row d-flex w-100 h-100 flex-nowrap social-container">
        {
          shareFaceBook &&
          <div
            style={{
              transform: `scale(${ratioTransform}, ${ratioTransform})`,
              width: `${ratioTransform * 50}px`,
              height: `${ratioTransform * 50}px`
            }}
          >
          <span
            className="custom-fa fa fa-facebook"
            onClick={() => window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
              '_blank',
              'width=800,height=600,scrollbars=1,resizable=1,status=1')}
          />
          </div>
        }
        {
          shareTwitter &&
          <div
            style={{
              transform: `scale(${ratioTransform}, ${ratioTransform})`,
              width: `${ratioTransform * 50}px`,
              height: `${ratioTransform * 50}px`
            }}
          >
          <span
            className="custom-fa fa fa-twitter"
            onClick={() => window.open(
              `https://twitter.com/intent/tweet?original_referer=${encodeURIComponent(window.location.href)}&text=`,
              '_blank',
              'width=800,height=600,scrollbars=1,resizable=1,status=1')}
          />
          </div>
        }
        {
          sharePinterest &&
          <div
            style={{
              transform: `scale(${ratioTransform}, ${ratioTransform})`,
              width: `${ratioTransform * 50}px`,
              height: `${ratioTransform * 50}px`
            }}
          >
          <span
            className="custom-fa fa fa-pinterest"
            onClick={() => window.open(
              `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=&description=`,
              '_blank',
              'width=800,height=600,scrollbars=1,resizable=1,status=1')}
          />
          </div>
        }
        {
          shareLink &&
          <div
            style={{
              transform: `scale(${ratioTransform}, ${ratioTransform})`,
              width: `${ratioTransform * 50}px`,
              height: `${ratioTransform * 50}px`
            }}
          >
          <span
            className="custom-fa fa fa-link"
            onClick={() => {
              const textField = document.createElement('textarea');
              textField.innerText = window.location.href;
              document.body.appendChild(textField);
              textField.select();
              document.execCommand('copy');
              alert('Copied URL!!!');
            }}
          />`
          </div>
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
