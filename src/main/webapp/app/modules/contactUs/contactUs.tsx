import React from 'react';
import './contactUs.scss';
// import logo from 'static/images/logo/oe-logo.png'
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import * as contactUsAction from 'app/modules/contactUs/contactUs.reducer';
import { withRouter } from 'react-router';

export interface ICarouselProp extends StateProps, DispatchProps {
  initScreen: Function;
  setInput: Function;
  postContactUs: Function;
}

export class ContactUs extends React.Component<ICarouselProp> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.initScreen();
  }

  render() {
    const { contactUsAddressData, input, setInput, postContactUs, loading, errorMessage, requestSuccess, requestFailure } = this.props;
    const addressData = contactUsAddressData && contactUsAddressData.length > 0 ? contactUsAddressData[0] : {};
    return (
      <div className="contact-us-container">
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe
              width={700}
              height={300}
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=165%20th%C3%A1i%20h%C3%A0&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder={0}
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
            />
            <a href="https://www.emojilib.com"/>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html: '.mapouter{position:relative;text-align:right;height:250px;width:700px;}.gmap_canvas {overflow:hidden;background:none!important;height:250px;width:700px;}'
            }}
          />
        </div>
        <div className="container g-margin-top-30">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6">
              <div dangerouslySetInnerHTML={{ __html: addressData.address ? addressData.address : '' }}/>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="form-group message-wrapper">
                {
                  requestSuccess && <span className="text-success">Thank for you feedback!</span>
                }
                {
                  requestFailure && errorMessage && <span className="text-danger">{errorMessage}</span>
                }
              </div>
              <div className="form-group">
                <input className="form-control" type="text"
                       value={input.author_name}
                       onChange={e => setInput(e.target.value, 'author_name')}
                       placeholder="Your Name*"/>
              </div>
              <div className="form-group">
                <input className="form-control" type="text"
                       value={input.author_email}
                       onChange={e => setInput(e.target.value, 'author_email')}
                       placeholder="Your Email*"/>
              </div>
              <div className="form-group">
                <textarea rows={4} className="form-control"
                          value={input.content}
                          onChange={e => setInput(e.target.value, 'content')}
                          placeholder="Your Message*"/>
              </div>
              <div className="form-group">
                <button className="btn btn-submit"
                        disabled={loading}
                        onClick={() => postContactUs(addressData.id)}>Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ contactUs }: IRootState) => ({
  contactUsAddressData: contactUs.contactUsAddressData,
  input: contactUs.input,
  requestFailure: contactUs.requestFailure,
  requestSuccess: contactUs.requestSuccess,
  errorMessage: contactUs.errorMessage,
  loading: contactUs.loading
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  initScreen: () => {
    dispatch(contactUsAction.reset());
    dispatch(contactUsAction.getContactUsAddress());
  },
  setInput: (value, fieldName) => {
    dispatch(contactUsAction.setInput(fieldName, value));
  },
  postContactUs: id => {
    dispatch(contactUsAction.postContactUs(id));
  },
  reset: () => {
    dispatch(contactUsAction.reset());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUs));
