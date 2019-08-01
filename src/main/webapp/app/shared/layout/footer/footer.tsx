import './footer.scss';
import './footer_copy.scss';

import React from 'react';
import { Col, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import $ from 'jquery';

export interface IFooterProps {
  toTop: Function;
}

export interface IFooterState {
}

class Footer extends React.Component<IFooterProps, IFooterState> {
  componentDidMount() {
    $(window).scroll(() => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        $('#toTopBtn').fadeIn();
      } else {
        $('#toTopBtn').fadeOut();
      }
    });
  }

  render() {
    const { toTop } = this.props;
    return (
      <div className="footer-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-8">
              <div className="row">
                <div className="col-12 offset-0 col-md-12 offset-md-0 col-lg-6 offset-lg-0 col-xl-5 offset-xl-1">
                  <div className="g-margin-bottom-20">
                    <img className="footer-logo-img" src="content/images/logo/logofooter.png"/>
                  </div>
                  <div className="slogan">Đơn giản là tinh tế!</div>
                  <div className="d-flex flex-wrap">
                    <a className="social-icon-wrapper" href="https://www.instagram.com/" target="_blank">
                      <span className="social_instagram"/>
                    </a>
                    <a className="social-icon-wrapper" href="https://twitter.com/?lang=vi" target="_blank">
                      <span className="social_twitter"/>
                    </a>
                    <a className="social-icon-wrapper" href="https://www.facebook.com/jsc.pyramids" target="_blank">
                      <span className="social_facebook"/>
                    </a>
                    <a className="social-icon-wrapper" href="https://www.youtube.com/" target="_blank">
                      <span className="social_youtube"/>
                    </a>
                    <a className="social-icon-wrapper" href="hhttps://www.flickr.com/" target="_blank">
                      <span className="social_flickr"/>
                    </a>
                    <a className="social-icon-wrapper" href="https://www.pinterest.com/" target="_blank">
                      <span className="social_pinterest"/>
                    </a>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-lg-6 contact-us-address">
                  <h4 className="contact-us-title">Liên hệ với chúng tôi</h4>
                  <div>Office: TT3-08 KĐT Phùng Khoang - Trung Văn - Hà Nội</div>
                  <div>Fac: Đồng Nhân - Đông La - Hoài Đức - Hà Nội</div>
                  <div>Phone: (+84) 988 998958</div>
                  <div>Fax:</div>
                  <div>Email: pyramids.jsc@gmail.com</div>
                  <div>Web: https://pyramids.com.vn/</div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 g-margin-top-10">
              <div className="fb-page"
                   data-href="https://www.facebook.com/jsc.pyramids/"
                   data-width="380"
                   data-adapt-container-width="true"
                   data-hide-cover="false"
                   data-show-facepile="true"/>
            </div>
            <span id="toTopBtn" className="toTopBtn" onClick={() => toTop()}>
                <span className="g-hide-xs g-hide-sm g-font-size-12"/>
                <span className="fa fa-chevron-up"/>
              </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({}: IRootState) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  toTop: () => {
    $('html, body').animate({ scrollTop: 0 }, 1000);
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer));
