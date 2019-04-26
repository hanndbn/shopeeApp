import "./tuvanHome.scss";
import "./doctorHome_copy.scss";

import React from "react";
import { connect } from "react-redux";
import { Alert, Col, Row } from "reactstrap";
import { IRootState } from "app/shared/reducers";
import Carousel from "app/modules/carousel/carousel";
import Header from "app/shared/layout/header/header";
import Slider from "react-slick";
import { setCarouselBanHang, setCarouselBanHangTuVan } from "app/modules/carousel/carousel.reducer";

// import { getCategory } from "app/shared/reducers/category";

export interface IHomeProp extends StateProps, DispatchProps {
  setCarousel: Function;
}

export class TuvanHome extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.setCarousel();
  }

  render() {
    const { servicesData } = this.props;
    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 700,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      pauseOnFocus: true,
      lazyLoad: "ondemand",
      cssEase: "linear",
      fade: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      responsive: [
        {
          breakpoint: 320,
          settings: {
            dots: false,
            arrows: true
          }
        },
        {
          breakpoint: 992,
          settings: {
            dots: false,
            arrows: true
          }
        }
      ]
    };
    return (
      <div className="tu-van-home">
        <Header />
        <div className="container">
          <Carousel />
        </div>
        <div className="container g-margin-top-30">
          <div className="row">
            <div className="col-12 d-flex justify-content-between">
              <div>
                <img
                  className="owl-lazy"
                  src="https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec15_1.jpg"
                  data-src="https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec15_1.jpg"
                  alt="Các gói khám sức khỏe"
                />
                <div className="text-div text-uppercase">Các gói khám sức khỏe</div>
              </div>
              <div>
                <img className="owl-lazy" src="https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec15_2.jpg" alt="Các gói khám sức khỏe" />
                <div className="text-div text-uppercase">Tầm soát ung thư</div>
              </div>
              <div>
                <img className="owl-lazy" src="https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec15_3.jpg" alt="Các gói khám sức khỏe" />
                <div className="text-div text-uppercase">Bảo hiểm</div>
              </div>
              <div>
                <img className="owl-lazy" src="https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec15_4.jpg" alt="Các gói khám sức khỏe" />
                <div className="text-div text-uppercase">Đặt hẹn khám bệnh</div>
              </div>
              <div>
                <img className="owl-lazy" src="https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec15_5.jpg" alt="Các gói khám sức khỏe" />
                <div className="text-div text-uppercase">Thẻ khám bệnh gia đình</div>
              </div>
            </div>
          </div>
        </div>
        <div className="container g-margin-top-30">
          <div className="d-flex">
            <div className="hot-line-wrapper">
              <div className="hot-line-title">HOTLINE</div>
              <div className="hot-line-value">0902 723 0900</div>
            </div>
            <div className="hot-line-wrapper">
              <div className="hot-line-title">TỔNG ĐÀI</div>
              <div className="hot-line-value">1900 1517</div>
            </div>
            <div className="hot-line-wrapper">
              <div className="hot-line-title">CẤP CỨU 24/24</div>
              <div className="hot-line-value">0243 728 0000</div>
            </div>
            <div className="hot-line-wrapper">
              <div className="hot-line-title">Địa chỉ</div>
              <div className="hot-line-value">165 Thái Hà, Đống Đa, Hà Nội</div>
            </div>
          </div>
        </div>
        <div className="container g-margin-top-50">
          <div id="featured-services">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-div text-title-home">
                  Dịch vụ nổi bật
                  <hr />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 service-home">
                  <figure>
                    <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/dv-kham-home.jpg" alt="Dịch vụ khám" />
                  </figure>
                  <div className="title-service">Dịch vụ khám</div>
                  <div className="menu-dich-vu-kham-container">
                    <ul id="service-menu1" className="menu service_menu">
                      <li className="menu-item">
                        <a href="https://benhvienthucuc.com/kham-giao-su/">
                          <span>Khám Giáo sư</span>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="https://benhvienthucuc.com/kham-noi-da-khoa/">
                          <span>Khám nội đa khoa</span>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="https://benhvienthucuc.com/kham-ung-buou/">
                          <span>Khám ung bướu</span>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="https://benhvienthucuc.com/kham-co-xuong-khop/">
                          <span>Khám cơ xương khớp</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 service-home">
                  <figure>
                    <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/dv-xetnghiem-home.jpg" alt="Dịch vụ khám" />
                  </figure>
                  <div className="title-service">Dịch vụ khám</div>
                  <div className="menu-dich-vu-kham-2-container">
                    <ul id="service-menu2" className="menu service_menu">
                      <li className="menu-item">
                        <a href="https://benhvienthucuc.com/cac-goi-kham-suc-khoe/">
                          <span>Các gói khám sức khỏe</span>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="https://benhvienthucuc.com/cac-goi-tam-soat-ung-thu/">
                          <span>Các gói tầm soát ung thư</span>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="https://benhvienthucuc.com/kham-noi-kinh/">
                          <span>Khám nội thần kinh</span>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="https://benhvienthucuc.com/noi-soi-khong-dau-2/">
                          <span>Nội soi tiêu hóa</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6 service-home">
                  <figure>
                    <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/dv-dieutri-home.jpg" alt="Điều trị" />
                  </figure>
                  <div className="title-service">Điều trị</div>
                  <div className="menu-dieu-tri-container">
                    <ul id="service-menu3" className="menu service_menu">
                      <li className="menu-item">
                        <a href="https://benhvienthucuc.com/dieu-tri-ung-thu-singapore/">
                          <span>Điều trị ung thư Singapore</span>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="https://benhvienthucuc.com/dieu-tri-xo-gan-co-truong/">
                          <span>Điều trị xơ gan cổ trướng</span>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="https://benhvienthucuc.com/dieu-tri-viem-gan-b/">
                          <span>Điều trị viêm gan B</span>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a href="https://benhvienthucuc.com/phau-thuat-dieu-tri-benh-ly/">
                          <span>Phẫu thuật điều trị bệnh</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container g-margin-top-50">
          <div id="list-doctor">
            <div id="doctor-hometitle" className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-div text-title-home">
                  Đội ngũ bác sĩ
                  <hr />
                </div>
              </div>
            </div>
            <div id="doctor-home" className="container-fluid">
              <div className="row no-margin">
                <div className="bhoechie-tab-container">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bhoechie-tab">
                    <div className="bhoechie-tab-content">
                      <div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 img-doctor">
                            <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-ynhi.png" alt="bs-ynhi" />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-doctor">
                            <p className="title-doctor">
                              TIẾN SĨ Y HỌC., BÁC SĨ CHUYÊN KHOA NHI <br />
                              <b>NGUYỄN PHẠM Ý NHI</b>
                            </p>
                            <p>
                              Giám đốc Bệnh viện Đa khoa Quốc tế Thu Cúc <br />
                              Là chuyên gia đầu ngành về tim mạch trẻ em, bác sĩ Ý Nhi từng giữ nhiều chức vụ quan trọng như: Giám Đốc Bệnh viện Đa khoa Xanh Pôn Hà Nội, Chủ tịch
                              Hội Nhi khoa Hà Nội… Với nền tảng chuyên môn được đào tạo ở nhiều trường đại học nổi tiếng trong, ngoài nước và hơn 30 năm kinh nghiệm, bác sĩ đã giúp
                              hàng trái tim của các em thơ lỗi nhịp đập trở lại bình thường. <br />
                              Bên cạnh hoạt động chuyên môn, bác sĩ Ý Nhi từng là đại biểu Quốc hội, tích cực đóng góp tiếng nói của mình về các vấn đề xã hội. Với sức ảnh hưởng
                              sâu rộng, bác sĩ đã đón nhận Huân chương lao động hạng ba, nhiều Bằng khen của Bộ trưởng Bộ y tế, Chủ tịch UBND thành phố Hà Nội. <br />
                              Với bệnh nhân, sự hiền hậu, thân thiện của bác sĩ là “liều thuốc tinh thần” giúp vượt qua mọi bất an, lo lắng. <br />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bhoechie-tab-content">
                      <div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 img-doctor">
                            <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-quynh.png" alt="bs-quynh" />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-doctor">
                            <p className="title-doctor">
                              PHÓ GIÁO SƯ., TIẾN SĨ., BÁC SĨ CKII., THẦY THUỐC NHÂN DÂN <br />
                              <b>NGUYỄN VĂN QUÝNH</b>
                            </p>
                            <p>
                              Phó Giám đốc Bệnh viện Đa khoa Quốc tế Thu Cúc <br />
                              PGS. TS Nguyễn Văn Quýnh là chuyên gia hàng đầu về Tim mạch. <br />
                              Có bề dày kinh nghiệm, hơn 30 năm chăm sóc sức khỏe cho cán bộ cấp cao trong Quân đội, từng đảm nhiệm nhiều vị trí quan trọng, nguyên là Chủ nhiệm
                              khoa Nội cán bộ A1– Bệnh viện Trung Ương Quân đội 108. <br />
                              Đề cao tinh thần y đức, trong suốt quá trình công tác PGS. TS Nguyễn Văn Quýnh không ngừng học hỏi, trau dồi kiến thức chuyên môn, chẩn đoán và điều
                              trị hành công nhiều ca bệnh khó, mang lại niềm tin cuộc sống cho nhiều người. <br />
                              Nhiều bệnh nhân chia sẻ họ luôn cảm thấy an tâm với sự chu đáo, tác phong làm việc nghiêm túc và tận tình của bác sĩ Quýnh.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bhoechie-tab-content">
                      <div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 img-doctor">
                            <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-thanh.png" alt="bs-thanh" />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-doctor">
                            <p className="title-doctor">
                              PHÓ GIÁO SƯ., TIẾN SĨ., BÁC SĨ CK I., THẦY THUỐC NHÂN DÂN <br />
                              <b>NGUYỄN XUÂN THÀNH</b>
                            </p>
                            <p>
                              Cố vấn chuyên môn cap cấp, bác sĩ khoa khám bệnh - Bệnh viện Đa khoa Quốc tế Thu Cúc <br />
                              PGS. TS Nguyễn Xuân Thành là bác sĩ điều trị, tham gia giảng dạy về bệnh lý gan mật tại Bệnh viện Quân Y 103 và bệnh viện Trung ương Quân đội 108.{" "}
                              <br />
                              Thực tập và nghiên cứu tại khoa Nội tiêu hóa Đại học Y Shimane Nhật Bản dưới sự dẫn dắt của Giáo sư Shimada – Chuyên gia hàng đầu tại Nhật Bản về chẩn
                              đoán và điều trị bệnh lý gan mật. <br />
                              PGS.,TS Nguyễn Xuân Thành đã dành nhiều thời gian nghiên cứu và trực tiếp điều trị thành công các bệnh lý gan mật, đặc biệt là viêm gan virut. Rất
                              nhiều nghiên cứu của Phó Giáo sư về gan được đăng trên tạp chí nước ngoài, được bạn bè Quốc tế công nhận, đánh giá cao. <br />
                              Với người bệnh, bác sĩ Thành gần gũi như người trong nhà, luôn vui vẻ và nhiệt tình hỗ trợ.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bhoechie-tab-content">
                      <div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 img-doctor">
                            <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-hui.png" alt="bs-hui" />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-doctor">
                            <p className="title-doctor">
                              BÁC SĨ
                              <br />
                              <b>SEE HUI TI</b>
                            </p>
                            <p>
                              Các Bằng Cấp Chuyên Môn: MB.ChB (Leicester, UK), MRCP (United Kingdom), FRCP (Edinburgh), FAMS (Medical Oncology)
                              <br />
                              Bac si See Hui Ti là Chuyên Viên Tư Vấn Y Khoa về Trị Liệu Ung Thư tại Trung Tâm Điều trị Ung Thu Parkway, Bệnh Viện Gleneagles. Bà từng là Chuyên
                              Viên Tư Vấn về Ung Thư Nội Khoa tại Trung Tâm Ung Thư Quốc Gia, đồng thời Chuyên Gia Thỉnh Vấn tại Bệnh Viện Phụ Nữ và Trẻ Em KK, chuyên về các chứng
                              ung thư phụ khoa và ung thu vu ở người lớn.
                              <br />
                              Bs. See hiện là thành viên của Hội Ung Tư Học Phụ Khoa Quốc Tế, Hội Ung Thư Học Lâm Sàng Hoa Kỳ và Hội Y Khoa Singapore. Cô từng là ủy viên thường
                              trực của Hội Ung Thư Học Singapore từ năm 2001 đến năm 2007.
                              <br />
                              Hiện nay, Bác sỹ See Hui Ti đang hợp tác với Bệnh viện Đa khoa Quốc tế Thu Cúc nhằm điều trị cho bệnh nhân mắc bệnh ung thư tại Việt Nam. Theo đó,
                              việc điều trị được thực hiện ngay tại Bệnh viện Đa khoa Quốc tế Thu Cúc.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bhoechie-tab-content">
                      <div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 img-doctor">
                            <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-lim.png" alt="bs-lim" />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-doctor">
                            <p className="title-doctor">
                              BÁC SĨ <br />
                              <b>LIM HONG LIANG</b>
                            </p>
                            <p>
                              Các Bằng Cấp Chuyên Môn: MBBS (Singapore), MMed (Internal Medicine), FAMS (Medical Oncology)
                              <br />
                              Phó Chủ tịch Hội đồng quản trị y tế của Bệnh viện Đại học Quốc gia.
                              <br />
                              Thành viên của Hiệp hội Ung thư lâm sàng và Hiệp hội quốc tế Nghiên cứu Ung thư phổi
                              <br />
                              Thành viên của Ủy ban Cố vấn ung thư Singapore
                              <br />
                              Bs. Lim Hong Liang đã làm trưởng ban Dịch Vụ Điều Trị Ung Thư Ngực, Dịch Vụ Điều Trị Bệnh về Đầu và Cổ và Chương Trình Cấy Ghép Tủy Xương tại Bệnh
                              Viện Đại Học Tổng Hợp.
                              <br />
                              Hiện nay, Bác sỹ Lim Hong Liang đang hợp tác với Bệnh viện Đa khoa Quốc tế Thu Cúc nhằm điều trị cho bệnh nhân mắc bệnh ung thư tại Việt Nam. Theo đó,
                              việc điều trị được thực hiện ngay tại Bệnh viện Đa khoa Quốc tế Thu Cúc.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bhoechie-tab-content active">
                      <div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 img-doctor">
                            <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-zee.png" alt="bs-zee" />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-doctor">
                            <p className="title-doctor">
                              BÁC SĨ
                              <br />
                              <b>ZEE YING KIAT</b>
                            </p>
                            <p>
                              Các Bằng Cấp Chuyên Môn: MBBS (London), MRCP (United Kingdom), FAMS (Medical Oncology)
                              <br />
                              Bác sĩ Zee Ying Kiat là một bác sĩ Chuyên khoa Y tế Ung thư Tư vấn tại Viện Ung thư Đại học Quốc gia, Singapore (NCIS).
                              <br />
                              Bác sĩ Zee là một thành viên của Hiệp hội Ung thư học Lâm sàng Mỹ và thành viên sáng lập của Hiệp hội Các bệnh Gan-Tụy-Túi Mật Singapore. Ông tiếp tục
                              phục vụ như một thành viên thường trực của Ủy ban Xem xét Đặc biệt Các nhóm Tập đoàn Chăm sóc Sức khỏe Quốc Gia.
                              <br />
                              Ngoài chuyên khoa y tế ung thư tổng quát, bác sĩ Zee có một sự quan tâm đặc biệt đến các ung thư dạ dày-thực quản, gan, tuyến tụy và đại trực tràng.
                              <br />
                              Hiện nay, Bác sỹ Zee Ying Kiat đang hợp tác với Bệnh viện Đa khoa Quốc tế Thu Cúc nhằm điều trị cho bệnh nhân mắc bệnh ung thư tại Việt Nam. Theo đó,
                              việc điều trị được thực hiện ngay tại Bệnh viện Đa khoa Quốc tế Thu Cúc.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bhoechie-tab-content">
                      <div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 img-doctor">
                            <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-lanphuong.png" alt="bs-zee" />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-doctor">
                            <p className="title-doctor">
                              BÁC SĨ CKI., THẠC SĨ Y HỌC NỘI KHOA NGHIÊM <br />
                              <b>NGHIÊM HOÀNG LAN PHƯƠNG</b>
                            </p>
                            <p>
                              Giám đốc cơ sở 2 Bệnh viện Đa khoa Quốc tế Thu Cúc - 216 Trần Duy Hưng, Cầu Giấy, Hà Nội <br />
                              Bác sĩ Lan Phương được đào tạo chuyên môn bài bản trong và ngoài nước. Luôn tâm niệm sức khỏe người bệnh là trên hết, bác sĩ luôn không ngừng học tập,
                              tích cực áp dụng các công nghệ, kỹ thuật mới nhằm mang lại hiệu quả điều trị cao nhất. <br />
                              Với hơn 20 năm kinh nghiệm trong nghề, bác sĩ từng công tác tại nhiều vị trí như: khoa Tim mạch – Bệnh viện Việt Nam Cuba, Bệnh viện Thanh Nhàn; Phó
                              Giám đốc kiêm Trưởng khoa Nội – Bệnh viện Hòe Nhai… <br />
                              Trong mọi cuộc thăm khám, bác sĩ Phương gây ấn tượng bởi sự thân thiện, dễ gần và tận tâm. Nhờ đó mà người bệnh luôn cảm thấy thoải mái và dễ chịu.{" "}
                              <br />
                              Liên tiếp nhiều năm bác sĩ Phương đạt danh hiệu Chiến sĩ thi đua; Lao động tiên tiến vì những cống hiến của mình. <br />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bhoechie-tab-content">
                      <div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 img-doctor">
                            <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-chung.png" alt="bs-chung" />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-doctor">
                            <p className="title-doctor">
                              THẠC SĨ Y HỌC., BÁC SĨ VI SINH <br />
                              <b>NGUYỄN THỊ KIM TRUNG</b>
                            </p>
                            <p>
                              Nhờ sự chu đáo và cẩn trọng trong từng chi tiết của bác sĩ Kim Trung, các xét nghiệm được thực hiện tại Bệnh viện Thu Cúc đều có độ chính xác cao và
                              tin cậy. <br />
                              Không chỉ trau dồi kinh nghiệm từ thực tiễn, bác sĩ còn tích cực học hỏi và tiếp thu những tiến bộ mới trong lĩnh vực xét nghiệm để có thể mang lại
                              cho người bệnh chất lượng dịch vụ tốt nhất. <br />
                              Bác sĩ cũng nhận được sự yêu mến và đánh giá cao từ đồng nghiệp, khách hàng nhờ tinh thần hợp tác, nhiệt tình hỗ trợ và sự hòa đồng. <br />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bhoechie-tab-content">
                      <div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 img-doctor">
                            <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-binh.png" alt="bs-binh" />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-doctor">
                            <p className="title-doctor">
                              Tiến sĩ., Bác sĩ CKII Nội tiêu hóa., Thầy thuốc ưu tú <br />
                              <b>Phạm Thị Bình</b>
                            </p>
                            <p>
                              Nguyên Trưởng khoa TDCN Bệnh viện Bạch Mai. <br />
                              Hiện là bác sĩ Phòng khám tiêu hóa Bệnh viện Đa khoa Quốc tế Thu Cúc. <br />
                              Bác sĩ là cái tên được đông đảo bệnh nhân tin tưởng lựa chọn khi có nhu cầu thăm khám và điều trị các vấn đề về tiêu hóa, đặc biệt là các bệnh liên
                              quan đến dạ dày do vi khuẩn HP. <br />
                              Trước thực trạng vi khuẩn HP kháng thuốc ngày càng trở nên phổ biến, bác sĩ luôn tích cực tìm tòi, nghiên cứu để tư vấn những phác đồ điều trị đặc
                              hiệu giúp bệnh nhân sớm thoát khỏi sự đe dọa của con vi khuẩn nguy hiểm này. <br />
                              Bệnh nhân khi đến với bác sĩ Bình đều cảm nhận được sự dịu dàng, tỉ mỉ từ cách nói chuyện nhẹ nhàng, tác phong làm việc chuyên nghiệp.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bhoechie-tab-content">
                      <div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 img-doctor">
                            <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-hang.png" alt="bs-hang" />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-doctor">
                            <p className="title-doctor">
                              Bác sĩ Chuyên khoa II Nội tiêu hóa., Thầy thuốc ưu tú <br />
                              <b>Nguyễn Thị Hằng</b>
                            </p>
                            <p>
                              Nguyên Trưởng khoa Nội tiêu hóa – Bệnh viện E. <br />
                              Hiện đang là Bác sĩ Phòng khám tiêu hóa Bệnh viện Đa khoa Quốc tế Thu Cúc. <br />
                              Bằng nền tảng kinh nghiệm vững vàng sau nhiều năm công tác tại các bệnh viện lớn, bác sĩ Hằng đã trực tiếp thăm khám và điều trị cho hàng ngàn bệnh
                              nhân mắc các bệnh lý về tiêu hóa như: đau dạ dày, viêm đại tràng, tá tràng, trực tràng… <br />
                              Bác sĩ luôn duy trì được tinh thần vui vẻ, lòng nhiệt tình và đặc biệt là mong muốn được giúp đỡ, hỗ trợ tối đa cho người bệnh. Nhờ đó mà quá trình
                              thăm khám với bác sĩ Hằng luôn mang đến những trải nghiệm dễ chịu, thoải mái, xóa tan đi nỗi lo lắng về bệnh tật. <br />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bhoechie-tab-content">
                      <div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 img-doctor">
                            <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-huyen.png" alt="bs-huyen1" />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-doctor">
                            <p className="title-doctor">
                              BÁC SĨ CKII NGOẠI TIẾT NIỆU – NAM HỌC
                              <br />
                              <b>PHẠM HUY HUYÊN</b>
                            </p>
                            <p>
                              Trưởng khoa Ngoại – Phó Giám đốc phụ trách khối Ngoại Bệnh viện Đa khoa Quốc tế Thu Cúc. <br />
                              Chuyên gia hàng đầu tại Việt Nam về lĩnh vực phẫu thuật tiết niệu – nam học, nổi tiếng trong việc áp dụng các phương pháp, kỹ thuật mới ít xâm lấn,
                              giúp việc điều trị trở nên êm ái, ít đau, nhanh chóng và tiết kiệm thời gian, tiền bạc. <br />
                              Bác sĩ được đông đảo bệnh nhân tín nhiệm bởi nền tảng kinh nghiệm dày dặn với hơn 30 năm kinh nghiệm trong ngành. Với sự vui vẻ, thân thiện của bác sĩ
                              trong quá trình thăm khám và phẫu thuật, người bệnh luôn cảm thấy an tâm, vơi bớt đi sự lo lắng. <br />
                              Trong suốt quá trình công tác của mình, bác sĩ Huyên cũng nắm giữ nhiều chức vụ quan trọng, có thể kể đến như: Trưởng khoa Phẫu thuật Tiết niệu – Bệnh
                              viện Đa khoa Xanh Pôn; Phó chủ tịch hội tiết niệu phía Bắc; Tổng thư ký hội thận học tiết niệu Hà Nội; Ủy viên ban chấp hành hội tiết niệu toàn quốc…
                              <br />
                              &nbsp;
                              <br />
                              &nbsp;
                              <br />
                              &nbsp;
                              <br />
                              &nbsp;
                              <br />
                              &nbsp;
                              <br />
                              &nbsp;
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bhoechie-tab-content">
                      <div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 img-doctor">
                            <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-huong.png" alt="bs-huong" />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-doctor">
                            <p className="title-doctor">
                              Bác sĩ
                              <br />
                              <b>NGUYỄN THỊ MINH HƯƠNG</b>
                            </p>
                            <p>
                              Bằng cấp chuyên môn: Thạc sĩ y học chuyên ngành Ung thư do Đại học Y Hà Nội cấp.
                              <br />
                              Bác sĩ Hương từng là Phó trưởng khoa tia xạ - hoá chất, Bệnh viện Ung bướu Hà Nội, Phó trưởng khoa phụ trách kiêm nhiệm khoa Dinh dưỡng – BV Ung Bướu
                              Hà Nội.
                              <br />
                              Hiện nay, Bác sỹ Nguyễn Thị Minh Hương đang là trưởng Khoa Ung bướu, Bệnh viện Đa khoa Quốc tế Thu Cúc. Ngoài điều trị ung thư, kết nối với các bác sĩ
                              Singapore, bác sĩ Hương cũng tham gia khám tầm soát ung thư.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bhoechie-tab-menu">
                    <div className="list-group">
                      <a className="list-group-item text-div">
                        <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-ynhi1.png" alt="bs-ynhi1" />
                      </a>
                      <a className="list-group-item text-div">
                        <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-quynh1.jpg" alt="bs-quynh1" />
                      </a>
                      <a className="list-group-item text-div">
                        <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-thanh1.jpg" alt="bs-thanh1" />
                      </a>
                      <a className="list-group-item text-div">
                        <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-hui1.jpg" alt="bs-hui1" />
                      </a>
                      <a className="list-group-item text-div">
                        <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-lim1.jpg" alt="bs-lim1" />
                      </a>
                      <a className="list-group-item text-div active">
                        <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-zee1.jpg" alt="bs-zee1" />
                      </a>
                      <a className="list-group-item text-div">
                        <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-lanphuong1.png" alt="bs-lanphuong1" />
                      </a>
                      <a className="list-group-item text-div">
                        <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-chung1.jpg" alt="bs-chung1" />
                      </a>
                      <a className="list-group-item text-div">
                        <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-binh1.jpg" alt="bs-binh1" />
                      </a>
                      <a className="list-group-item text-div">
                        <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-hang1.jpg" alt="bs-hang1" />
                      </a>
                      <a className="list-group-item text-div">
                        <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-huyen1.png" alt="bs-huyen1" />
                      </a>
                      <a className="list-group-item text-div">
                        <img src="https://benhvienthucuc.com/wp-content/themes/bvthucuc/assets/images/bs-huong1.png" alt="bs-huong1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="text-div text-readmore">
                    <a className="" title="Đội ngũ bác sĩ">
                      Xem thêm
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container g-margin-top-30">
          <div className="row">
            <div className="col-12 d-flex align-items-div">
              <div className="carousel-list-item-title">Cơ sở vật chất</div>
              <div className="carousel-list-item-hr" />
            </div>
            <div className="col-12 d-flex">
              <Slider {...{ ...settings, autoplay: true }}>
                <div className="w-100">
                  <img className="w-100 slider-33900 slide-70706 owl-lazy" src="content/images/temp/co-xuong-khop-thu-cuc-2-compressor-1920x500.jpg" />
                </div>
                <div className="w-100">
                  <img className="w-100 slider-33900 slide-70706 owl-lazy" src="content/images/temp/slide1.png" />
                </div>
              </Slider>
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  setCarousel: () => {
    dispatch(setCarouselBanHangTuVan());
  }
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TuvanHome);
