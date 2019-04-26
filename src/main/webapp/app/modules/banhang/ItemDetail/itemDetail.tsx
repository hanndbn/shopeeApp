import "./itemDetail.scss";
import "./itemDetail_copy.scss";

import React from "react";
import { connect } from "react-redux";
import { Alert, Col, Row } from "reactstrap";
import { IRootState } from "app/shared/reducers";

// import { getCategory } from "app/shared/reducers/category";

export interface IItemDetailProp extends StateProps, DispatchProps {}

export class ItemDetail extends React.Component<IItemDetailProp> {
  componentDidMount() {
    // this.props.getCategory();
  }

  render() {
    const { servicesData } = this.props;
    return (
      <div className="">
        <div className="container medicine-item-detail-container">
          <div className="row">
            <div className="col-4 medicine-item-detail-left-wrapper">
              <div className="medicine-item-detail-img">
                <img className="w-100" src="/content/images/temp/medicine-detail.jpg" />
              </div>
            </div>
            <div className="col-8 medicine-item-detail-right-wrapper">
              <div className="row">
                <div className="col-12 medicine-item-detail-title">Thuốc nhỏ mắt - Thuốc nhỏ mắt</div>
                <div className="col-12 medicine-item-detail-price">
                  <div className="g-margin-top-10">Giá cũ: 99,000 Đ</div>
                  <div className="g-margin-top-10">
                    Giá: <span className="medicine-item-detail-price-value">65,000 Đ</span>
                  </div>
                  <div className="d-flex align-items-center g-margin-top-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113.98 17" width="113.98" height="17" className="bgd_4cGr big_1wHm">
                      <g data-name="Layer 2">
                        <g data-name="Layer 1">
                          <polygon points="8.99 0 11.77 5.6 17.98 6.49 13.48 10.85 14.54 17 8.99 14.1 3.43 17 4.49 10.85 0 6.49 6.21 5.6 8.99 0" />
                          <polygon points="32.99 0 35.77 5.6 41.98 6.49 37.48 10.85 38.54 17 32.99 14.1 27.43 17 28.49 10.85 24 6.49 30.21 5.6 32.99 0" />
                          <polygon points="56.99 0 59.77 5.6 65.98 6.49 61.48 10.85 62.54 17 56.99 14.1 51.43 17 52.49 10.85 48 6.49 54.21 5.6 56.99 0" />
                          <polygon points="80.99 0 83.77 5.6 89.98 6.49 85.48 10.85 86.54 17 80.99 14.1 75.43 17 76.49 10.85 72 6.49 78.21 5.6 80.99 0" />
                          <polygon points="104.99 0 107.77 5.6 113.98 6.49 109.48 10.85 110.54 17 104.99 14.1 99.43 17 100.49 10.85 96 6.49 102.21 5.6 104.99 0" />
                        </g>
                      </g>
                    </svg>
                    <div>
                      <em>( 2 ) </em>
                      lượt đánh giá
                    </div>
                  </div>
                  <div className="d-flex g-margin-top-20">
                    <div className="g-margin-right-10">Vận chuyển:</div>
                    <div className="d-flex flex-wrap">
                      <div className="w-100">
                        <img
                          src="https://cdngarenanow-a.akamaihd.net/shopee/shopee-pcmall-live-vn/assets/9d21899f3344277e34d40bfc08f60bc7.png"
                          width="25"
                          height="15"
                          className="g-margin-right-10"
                        />
                        Miễn phí vận chuyển
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center g-margin-top-20">
                    <div className="g-margin-right-10">Số lượng:</div>
                    <div className="QuantityInput_3yLO">
                      <div className="btn_2GYy">-</div>
                      <input className="input_297o" type="number" value="1" />
                      <div className="btn_2GYy">+</div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center g-margin-top-50">
                    <div className="medicine-item-detail-cart">Thêm vào giỏ hàng</div>
                    <div className="medicine-item-detail-chat">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color="#f13742" className="icon_3Cr9">
                        <g fill="none" fill-rule="evenodd">
                          <path d="M2 3h16v16.707H2z" />
                          <path
                            fill="#E5101D"
                            d="M4 14.879v-9.88h12v8H6.5a1.5 1.5 0 0 0-1.061.44L4 14.88zm12.5-11.88h-13A1.503 1.503 0 0 0 2 4.5v15.208L6.707 15H16.5a1.503 1.503 0 0 0 1.5-1.5v-9A1.503 1.503 0 0 0 16.5 3z"
                          />
                          <path
                            fill="#E5101D"
                            d="M6.5 10.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2M9.5 10.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2M12.5 10.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2M20.5 6.5h-1v10h-11v1c0 .55.45 1 1 1h8l4 3v-14c0-.55-.45-1-1-1"
                          />
                        </g>
                      </svg>
                      <span> Chat Ngay</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container medicine-item-detail-container">
          <div className="_1zBnTu page-product__shop">
            <div className="_1Sw6Er">
              <a className="_136nGn" href="/chatdep247">
                <div className="shopee-avatar _2dEPf7">
                  <div className="shopee-avatar__placeholder">
                    <svg className="shopee-svg-icon icon-headshot" enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x={0} y={0}>
                      <g>
                        <circle cx="7.5" cy="4.5" fill="none" r="3.8" strokeMiterlimit={10} />
                        <path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" strokeLinecap="round" strokeMiterlimit={10} />
                      </g>
                    </svg>
                  </div>
                  <img className="shopee-avatar__img" src="https://cf.shopee.vn/file/e39b56d5a5af01c11e68d5a40692eb4f_tn" />
                </div>
                <div className="_1oAxCI">
                  <div className="horizontal-badge shopee-preferred-seller-badge horizontal-badge--no-triangle">
                    <svg className="shopee-svg-icon icon-tick" enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x={0} y={0}>
                      <g>
                        <path d="m6.5 13.6c-.2 0-.5-.1-.7-.2l-5.5-4.8c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l4.7 4 6.8-9.4c.3-.4.9-.5 1.4-.2.4.3.5 1 .2 1.4l-7.4 10.3c-.2.2-.4.4-.7.4 0 0 0 0-.1 0z" />
                      </g>
                    </svg>
                    Yêu thích
                  </div>
                </div>
              </a>
              <div className="_2S9T8Y" style={{}}>
                <div className="_3Lybjn" style={{}}>
                  chatdep247
                </div>
                <div className="_1h7HJr">Online 4 giờ trước</div>
                <div className="_1jOO4S">
                  <button type="button" className="btn btn-tinted-secondary btn--s btn--inline F5W_lC">
                    <svg className="shopee-svg-icon _3rtDul " height={16} viewBox="0 0 22 16" width={22}>
                      <g fillRule="evenodd" stroke="none" strokeWidth={1}>
                        <path d="m20.4457887 12.1418577c.7876778-1.0820669 1.2491266-2.39517639 1.2491266-3.81076088 0-3.70250491-3.156772-6.70397818-7.0508475-6.70397818-.0693752 0-.1385164.00095266-.2074099.00284495.5404574.50025601 1.0147388 1.06413368 1.4092798 1.67881242 2.4766811.50241938 4.334147 2.59466525 4.334147 5.09940288 0 1.42273066-.5992965 2.71237411-1.5709606 3.65316531-.038511.0495389-.1182188.17233-.1182188.3400495 0 .0295752.0286166.606356.0286166.606356s.0628359.4223645-.402977.2339696l-.3693587-.1500883s-.282324-.1280652-.7138007.0348215c-.7090281.3180796-1.5013162.4959316-2.3372932.4959316-.0124026 0-.0247956-.0000391-.0371789-.0001173-.4735214.4699114-1.0031122.8888889-1.5786318 1.2473477.5029786.1082913 1.0263607.1654605 1.5637862.1654605.540439 0 1.0666765-.0578121 1.572245-.1672869-.0007126.0013151-.0010723.0024172-.0010723.0033021 1.2460849-.3092111 1.9222453-.012738 1.9222453-.012738l.9795545.4181041c1.2353963.5249174 1.0872542-.6061418 1.0872542-.6061418s-.0526532-1.69977-.0526532-1.69977c0-.3488224.2251239-.7223577.2941474-.8286869z" />
                        <path d="m6.32146433 15.2776955c.00082231.0015175.00123728.0027891.00123728.0038102-1.43779019-.3567821-2.21797536-.0146977-2.21797536-.0146977l-1.13025518.4824278c-1.42545721.6056739-1.25452408-.6993944-1.25452408-.6993944s.06075368-1.9612731.06075368-1.9612731c0-.4024874-.25975827-.8334897-.33940083-.9561771-.90885893-1.2485387-1.44129984-2.76366504-1.44129984-4.39703176 0-4.27212105 3.64242915-7.73535944 8.13559322-7.73535944 4.49316408 0 8.13559318 3.46323839 8.13559318 7.73535944 0 4.27212106-3.6424291 7.73535946-8.13559318 7.73535946-.62358341 0-1.2307806-.0667063-1.81412889-.1930234zm-.988131-6.03325648c.73637967 0 1.33333334-.59695367 1.33333334-1.33333333 0-.73637967-.59695367-1.33333334-1.33333334-1.33333334-.73637966 0-1.33333333.59695367-1.33333333 1.33333334 0 .73637966.59695367 1.33333333 1.33333333 1.33333333zm5.55555557 0c .7363797 0 1.3333333-.59695367 1.3333333-1.33333333 0-.73637967-.5969536-1.33333334-1.3333333-1.33333334s-1.33333334.59695367-1.33333334 1.33333334c0 .73637966.59695364 1.33333333 1.33333334 1.33333333z" />
                      </g>
                    </svg>
                    Chat ngay
                  </button>
                  <a className="btn btn-light btn--s btn--inline btn-light--link Ed2lAD" href="/chatdep247">
                    <svg className="shopee-svg-icon _1fzrWY " enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x={0} y={0} strokeWidth={0}>
                      <path d="m13 1.9c-.2-.5-.8-1-1.4-1h-8.4c-.6.1-1.2.5-1.4 1l-1.4 4.3c0 .8.3 1.6.9 2.1v4.8c0 .6.5 1 1.1 1h10.2c.6 0 1.1-.5 1.1-1v-4.6c.6-.4.9-1.2.9-2.3zm-11.4 3.4 1-3c .1-.2.4-.4.6-.4h8.3c.3 0 .5.2.6.4l1 3zm .6 3.5h.4c.7 0 1.4-.3 1.8-.8.4.5.9.8 1.5.8.7 0 1.3-.5 1.5-.8.2.3.8.8 1.5.8.6 0 1.1-.3 1.5-.8.4.5 1.1.8 1.7.8h.4v3.9c0 .1 0 .2-.1.3s-.2.1-.3.1h-9.5c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3zm8.8-1.7h-1v .1s0 .3-.2.6c-.2.1-.5.2-.9.2-.3 0-.6-.1-.8-.3-.2-.3-.2-.6-.2-.6v-.1h-1v .1s0 .3-.2.5c-.2.3-.5.4-.8.4-1 0-1-.8-1-.8h-1c0 .8-.7.8-1.3.8s-1.1-1-1.2-1.7h12.1c0 .2-.1.9-.5 1.4-.2.2-.5.3-.8.3-1.2 0-1.2-.8-1.2-.9z" />
                    </svg>
                    xem shop
                  </a>
                </div>
              </div>
            </div>
            <div className="_3mK1I2" style={{}}>
              <div className="TuJk3S" style={{}}>
                <div className="-Gna22 _32EvOQ">
                  <label className="_1q9CHQ">Đánh giá</label>
                  <span className="_1rsHot OuQDPE">750</span>
                </div>
                <a className="F6kLFJ _32EvOQ" href="/chatdep247?tab=product">
                  <label className="_1q9CHQ">Sản phẩm</label>
                  <span className="_1rsHot OuQDPE">206</span>
                </a>
              </div>
              <div className="TuJk3S">
                <div className="-Gna22 _32EvOQ">
                  <label className="_1q9CHQ">tỉ lệ phản hồi</label>
                  <span className="_1rsHot OuQDPE">93%</span>
                </div>
                <div className="-Gna22 _32EvOQ">
                  <label className="_1q9CHQ">thời gian phản hồi</label>
                  <span className="_1rsHot">trong vài giờ</span>
                </div>
              </div>
              <div className="TuJk3S">
                <div className="-Gna22 _32EvOQ">
                  <label className="_1q9CHQ">tham gia</label>
                  <span className="_1rsHot">6 tháng trước</span>
                </div>
                <div className="-Gna22 _32EvOQ">
                  <label className="_1q9CHQ">Người theo dõi</label>
                  <span className="_1rsHot">344</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ common }: IRootState) => ({
  servicesData: common.servicesData
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetail);
