import {
  GET_ORDER_ERROR,
  GET_ORDER_LOADING,
  GET_ORDER_SUCCESS,
  POST_ORDER_ERROR,
  POST_ORDER_LOADING,
  POST_ORDER_SUCCESS,
} from "./order.types";

let initialState = {
  loading: false,
  error: false,
  data: [],
};

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ORDER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };
    }
    case POST_ORDER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case POST_ORDER_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
      };
    }
    default: {
      return state;
    }
  }
};
