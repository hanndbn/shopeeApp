// import { BASE_IMG_URL, GET_CAROUSEL_DATA } from 'app/config/constants';

const ACTION_TYPES = {
  RESET: "Common/RESET",
  SET_LOADING: "Common/SET_LOADING",
  SET_HEADER_BACKGROUND: "Common/SET_HEADER_BACKGROUND"
};

const initialState = {
  listItem: [
    {
      title: "AMAZING COFFEE #2 ",
      category: "OFFICE",
      subCategory: "OFFICE",
      imageUrl: "http://kconcept.vn/images/folio/thumbs/153603060724643.jpg"
    },
    {
      title: "VINHOMES LANDMARK 1 L43.11",
      category: "OFFICE",
      subCategory: "DEPARTMENT",
      imageUrl: "http://kconcept.vn/images/folio/thumbs/153599921976038.jpg"
    },
    {
      title: "VINHOMES LANDMARK 4 L10.09",
      category: "OFFICE",
      subCategory: "DEPARTMENT",
      imageUrl: "http://kconcept.vn/images/folio/thumbs/153599742927711.jpg"
    },
    {
      title: "RIVIERA COVE VILLA - V20",
      category: "OFFICE",
      subCategory: "VILA",
      imageUrl: "http://kconcept.vn/images/folio/thumbs/152270430341375.jpg"
    },
    {
      title: "AROI DESSERT&CAFE PHU QUOC ",
      category: "OFFICE",
      subCategory: "RESORT",
      imageUrl: "http://kconcept.vn/images/folio/thumbs/153609139869621.jpg"
    },
    {
      title: "TROPIC GARDEN .A2 601 ",
      category: "OFFICE",
      subCategory: "RESORT",
      imageUrl: "http://kconcept.vn/images/folio/thumbs/152165300943129.jpg"
    },
    {
      title: "AMAZING COFFEE ",
      category: "OFFICE",
      subCategory: "CAFE",
      imageUrl: "http://kconcept.vn/images/folio/thumbs/150213226341871.jpg"
    },
    {
      title: "CANTAVIL PENHOUSE GARDEN ",
      category: "HOME",
      subCategory: "DEPARTMENT",
      imageUrl: "http://kconcept.vn/images/folio/thumbs/150221065320060.jpg"
    },
    {
      title: "MASTERI THAO DIEN T2-03",
      category: "HOME",
      subCategory: "DEPARTMENT",
      imageUrl: "http://kconcept.vn/images/folio/thumbs/148899710834139.jpg"
    },
    {
      title: "TROPIC GARDEN .A1",
      category: "HOME",
      subCategory: "DEPARTMENT",
      imageUrl: "http://kconcept.vn/images/folio/thumbs/147702393688597.jpg"
    },
    {
      title: "SUNRISE CITY. NORTH TOWERS X2.08 ",
      category: "HOME",
      subCategory: "DEPARTMENT",
      imageUrl: "http://kconcept.vn/images/folio/thumbs/148845757152879.jpg"
    }
  ],
  itemDetail: {
    title: "",
    description: "",
    date: "",
    client: "",
    status: "",
    location: "",
    images: [
      "http://kconcept.vn/images/folio/153600012832082.jpg",
      "http://kconcept.vn/images/folio/153600012865244.jpg",
      "http://kconcept.vn/images/folio/153600012877397.jpg",
      "http://kconcept.vn/images/folio/153600010246047.jpg",
      "http://kconcept.vn/images/folio/153600010223381.jpg",
      "http://kconcept.vn/images/folio/153600012858627.jpg",
      "http://kconcept.vn/images/folio/153600012825721.jpg",
      "http://kconcept.vn/images/folio/153600010235826.jpg",
      "http://kconcept.vn/images/folio/153600010232856.jpg",
      "http://kconcept.vn/images/folio/153600015197376.jpg",
      "http://kconcept.vn/images/folio/153600032957381.jpg",
      "http://kconcept.vn/images/folio/15360001021444.jpg",
      "http://kconcept.vn/images/folio/153600017429771.jpg",
      "http://kconcept.vn/images/folio/153600002713483.jpg",
      "http://kconcept.vn/images/folio/153600017496702.jpg",
      "http://kconcept.vn/images/folio/153600017472687.jpg",
      "http://kconcept.vn/images/folio/153600015194863.jpg",
      "http://kconcept.vn/images/folio/153600015128032.jpg",
      "http://kconcept.vn/images/folio/153600015158243.jpg",
      "http://kconcept.vn/images/folio/153600007834013.jpg",
      "http://kconcept.vn/images/folio/153600015176923.jpg",
      "http://kconcept.vn/images/folio/153600005039579.jpg",
      "http://kconcept.vn/images/folio/153600007868687.jpg",
      "http://kconcept.vn/images/folio/153600007886566.jpg",
      "http://kconcept.vn/images/folio/153600007862127.jpg",
      "http://kconcept.vn/images/folio/153600005070077.jpg",
      "http://kconcept.vn/images/folio/153600007845866.jpg",
      "http://kconcept.vn/images/folio/153600005066259.jpg",
      "http://kconcept.vn/images/folio/153599980651619.jpg",
      "http://kconcept.vn/images/folio/153600005056651.jpg",
      "http://kconcept.vn/images/folio/153600005046295.jpg",
      "http://kconcept.vn/images/folio/153599980664830.jpg",
      "http://kconcept.vn/images/folio/15360000089806.jpg",
      "http://kconcept.vn/images/folio/153600002745153.jpg",
      "http://kconcept.vn/images/folio/153600002740787.jpg",
      "http://kconcept.vn/images/folio/153600000977980.jpg",
      "http://kconcept.vn/images/folio/153600000877832.jpg",
      "http://kconcept.vn/images/folio/153600000894048.jpg",
      "http://kconcept.vn/images/folio/153600002788833.jpg",
      "http://kconcept.vn/images/folio/153600000818270.jpg",
      "http://kconcept.vn/images/folio/153600002761064.jpg"
    ]
  },
  loading: false,
  displayLoading: false,
  headerBackground: "transparent url(https://ambient.elated-themes.com/wp-content/uploads/2017/03/footer-image-new.jpg)",
  requestFailure: false,
  errorMessage: null
};

export type CommonState = Readonly<typeof initialState>;

// Reducer
export default (state: CommonState = initialState, action): CommonState => {
  switch (action.type) {
    case ACTION_TYPES.SET_HEADER_BACKGROUND:
      return {
        ...state,
        headerBackground: action.headerBackground
      };
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        displayLoading: action.displayLoading
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const animationDisplayLoading = () => async (dispatch, getState) => {
  await dispatch(setDisplayLoading(true));
  await new Promise(resolve => setTimeout(resolve, 1000));
  await dispatch(setDisplayLoading(false));
};

export const setHeaderBackground = headerBackground => ({
  type: ACTION_TYPES.SET_HEADER_BACKGROUND,
  headerBackground
});
export const setDisplayLoading = displayLoading => ({
  type: ACTION_TYPES.SET_LOADING,
  displayLoading
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
