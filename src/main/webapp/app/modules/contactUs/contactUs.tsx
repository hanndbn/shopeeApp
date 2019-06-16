import React from "react";
import "./contactUs.scss";
// import logo from 'static/images/logo/oe-logo.png'
import { connect } from "react-redux";
import { IRootState } from "app/shared/reducers";
import * as carouselAction from "app/modules/carousel/carousel.reducer";
import { animationDisplayLoading, reset } from "app/shared/common/common.reducer";

export interface ICarouselProp extends StateProps, DispatchProps {
  requestCarouselData: Function;
  reset: Function;
  carouselData: any;
}

export class ContactUs extends React.Component<ICarouselProp> {
  componentDidMount() {
    this.props.requestCarouselData();
  }

  render() {
    const { carouselData } = this.props;
    return (
      <div className="contact-us-container">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="container small-container">
                <h3 className="dec-text">Contacts</h3>
                <p>
                  KCONCEPT&nbsp;was founded in 2012. We are mainly engaged in design and construction interiors, residential, commercial, office space planning and project
                  management.
                </p>
                <p>
                  The good space is not the kind of extravagant, we try to design the space that people have better ways to interact and feel of the space temperature, the story of
                  people to fill the space.
                </p>
                <ul className="contact-list">
                  <li>
                    <span>Adress </span>
                    <div>185/6 Co Bac. Dist1 . HCM City . VietNam</div>
                  </li>
                  <li>
                    <span>Phone</span>
                    <div>0988772104 . 0286 2991391</div>
                  </li>
                  <li>
                    <span>E-mail </span>
                    <div>Kconceptvn@gmail.com</div>
                  </li>
                </ul>
                <a href="#" className=" btn anim-button   trans-btn   transition  fl-l showform">
                  <span>Write us</span>
                  <i className="fa fa-eye" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe
              width={700}
              height={250}
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=165%20th%C3%A1i%20h%C3%A0&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder={0}
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
            />
            <a href="https://www.emojilib.com" />
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html: ".mapouter{position:relative;text-align:right;height:250px;width:700px;}.gmap_canvas {overflow:hidden;background:none!important;height:250px;width:700px;}"
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ carousel }: IRootState) => ({
  carouselData: carousel.carouselData
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestCarouselData: () => {
    dispatch(reset());
    dispatch(animationDisplayLoading());
  },
  reset: () => {
    dispatch(carouselAction.reset());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUs);
