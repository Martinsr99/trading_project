import {
  FETCH_TOKEN_LIST_REQUEST,
  FETCH_TOKEN_LIST_SUCCESS,
  FETCH_TOKEN_LIST_FAIL,
  SELECT_TOKEN,
} from '../actions/tokenAction';

const initialState = {
  loading: false,
  tokenList: [],
  error: null,
  selectedToken: null,
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOKEN_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TOKEN_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        tokenList: action.payload,
      };
    case FETCH_TOKEN_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SELECT_TOKEN:
      return {
        ...state,
        selectedToken: action.payload,
      };
    default:
      return state;
  }
};

export default tokenReducer;
