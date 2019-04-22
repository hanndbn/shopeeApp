import { FAILURE, SUCCESS, REQUEST } from "app/shared/reducers/action-type.util";
import axios from "axios";
// import { BASE_IMG_URL, GET_CAROUSEL_DATA } from 'app/config/constants';
import { Storage } from "react-jhipster";
// tslint:disable-next-line
const icon1 = require("static/images/temp/point1.png");

const ACTION_TYPES = {
  RESET: "Common/RESET"
};

const initialState = {
  servicesData: [
    {
      title: "Đặt Lịch Khám",
      description: "Chỉ 1 bước đơn giản.<br/>Không mất thời gian chờ đợi",
      backgroundColor: "#00b04c",
      iconImage: icon1
    },
    {
      title: "Kết nối với Bác sĩ",
      description: "Được tư vấn trực tiếp từ những bác sĩ đầu ngành",
      backgroundColor: "#0dc59b",
      iconImage: icon1
    },
    {
      title: "Mua Thuốc và Sản phẩm sức khỏe ",
      description: "Uy tín, Chất lượng",
      backgroundColor: "#0db2c4",
      iconImage: icon1
    },
    {
      title: "Giao hàng và Vận chuyển",
      description: "Nhanh chóng, tiện lợi",
      backgroundColor: "#0d92c4",
      iconImage: icon1
    }
  ],
  loading: false,
  requestFailure: false,
  errorMessage: null
};

export type CommonState = Readonly<typeof initialState>;

// Reducer
export default (state: CommonState = initialState, action): CommonState => {
  switch (action.type) {
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// export const requestCommonData = history => async (dispatch, getState) => {
//   const lang = `?lang=${getState().locale && getState().locale.currentLocale ? getState().locale.currentLocale : 'en'}`;
//   await dispatch({
//     type: ACTION_TYPES.GET_CAROUSEL_DATA,
//     payload: axios.get(GET_CAROUSEL_DATA + lang)
//   });
// };

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
