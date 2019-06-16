import './footer.scss';
import './footer_copy.scss';

import React from 'react';
import { Col, Row } from 'reactstrap';

const Footer = props => (
  <div className="footer-container">
    <div className="container-fluid">
      <div className="row">
        <div className="col-4">
          <div className="g-margin-bottom-20">
            <img className="footer-logo-img" src="http://pyramids.com.vn/wp-content/themes/pyramids/images/logofooter.png"/>
          </div>
          <div>Lorem Ipsn ida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auci elit consequat ipsutis sem nibh id elit she.</div>
        </div>
        <div className="col-4">
          <div className="contact-us-title">Contact us</div>
          <div className="textwidget">
            <span style={{ color: '#fff' }}>100 Mainstreet Center, Sydney</span><br/>
            Phone: <span style={{ color: '#fff' }}>(208) 333 9296</span><br/>
            Fax: <span style={{ color: '#fff' }}>(208) 333 9298</span><br/>
            Email: <a href="mailto:support@elated-themes.com"><span style={{ color: '#fff' }}>support@elated-themes.com</span></a><br/>
            Web: <a href="https://themeforest.net/user/elated-themes" target="_blank"><span style={{ color: '#fff' }}>https://elated-themes.net/</span></a></div>
        </div>
        <div className="col-4 d-flex flex-wrap">
          <div className="card">
            <img
              src="https://scontent.cdninstagram.com/vp/791ba9e05a0b1a50b8321f683b06e8ab/5D688418/t51.2885-15/e35/s320x320/31571543_1558613457598712_7970029665676951552_n.jpg?_nc_ht=scontent.cdninstagram.com"
              className="card-img-top"/>
          </div>
          <div className="card">
            <img
              src="https://scontent.cdninstagram.com/vp/d36bb1a2fed85e62cd8337ac4d517b8c/5D81B4A1/t51.2885-15/e35/s320x320/31508881_631746407171787_8019921182608326656_n.jpg?_nc_ht=scontent.cdninstagram.com"
              className="card-img-top"/>
          </div>
          <div className="card">
            <img
              src="https://scontent.cdninstagram.com/vp/cde1d0ea07b2b6a0433fd2d21d46173c/5D9CF2A3/t51.2885-15/e35/s320x320/31686967_101059767443561_96111231961661440_n.jpg?_nc_ht=scontent.cdninstagram.com"
              className="card-img-top"/>
          </div>
          <div className="card">
            <img
              src="https://scontent.cdninstagram.com/vp/f11f37704ac8bb5539c9ab009650a52e/5D9B1145/t51.2885-15/e35/s320x320/31556933_194456077842158_3482098637348012032_n.jpg?_nc_ht=scontent.cdninstagram.com"
              className="card-img-top"/>
          </div>
          <div className="card">
            <img
              src="https://scontent.cdninstagram.com/vp/70a61255a76762e0cc55acb30a1966cd/5D80E86B/t51.2885-15/e35/s320x320/31463299_1806439579652783_1173042451431030784_n.jpg?_nc_ht=scontent.cdninstagram.com"
              className="card-img-top"/>
          </div>
          <div className="card">
            <img
              src="https://scontent.cdninstagram.com/vp/7b3e846c1d23943599e79169621a0a82/5D67CBA7/t51.2885-15/e35/s320x320/31033894_226695948094201_7853642305427734528_n.jpg?_nc_ht=scontent.cdninstagram.com"
              className="card-img-top"/>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
