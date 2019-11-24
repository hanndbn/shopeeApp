const ACTION_TYPES = {
  SET_BS_ELEMENT: 'ImageSlide/SET_BS_ELEMENT',
  SET_ACTIVE_ID: 'ImageSlide/SET_ACTIVE_ID',
  RESET: 'ImageSlide/RESET'
};

const initialState = {
  bs: null,
  activeId: 0
};

export type ImageSlideState = Readonly<typeof initialState>;

// Reducer
export default (state: ImageSlideState = initialState, action): ImageSlideState => {
  switch (action.type) {
    case ACTION_TYPES.SET_BS_ELEMENT:
      return {
        ...state,
        bs: action.payload
      };
    case ACTION_TYPES.SET_ACTIVE_ID:
      return {
        ...state,
        activeId: action.payload
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const setBsElemnet = bs => ({
  type: ACTION_TYPES.SET_BS_ELEMENT,
  payload: bs
});

export const setActiveId = activeId => ({
  type: ACTION_TYPES.SET_ACTIVE_ID,
  payload: activeId
});
