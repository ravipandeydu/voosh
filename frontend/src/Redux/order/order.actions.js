import axios from "axios";
import {
  GET_ORDER_ERROR,
  GET_ORDER_LOADING,
  GET_ORDER_SUCCESS,
  POST_ORDER_ERROR,
  POST_ORDER_LOADING,
  POST_ORDER_SUCCESS,
} from "./order.types";

export const getOrder = (token, id) => async (dispatch) => {
  dispatch({ type: GET_ORDER_LOADING });
  try {
    let response = await axios.get(
      `https://vooshbyravi.onrender.com/get-order?user_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: GET_ORDER_SUCCESS, payload: response.data });
    return response.data;
  } catch (e) {
    dispatch({ type: GET_ORDER_ERROR });
  }
};

export const postOrder = (token, event) => async (dispatch) => {
  dispatch({ type: POST_ORDER_LOADING });
  try {
    await axios.post("https://vooshbyravi.onrender.com/add-order", event, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: POST_ORDER_SUCCESS });
  } catch (e) {
    dispatch({ type: POST_ORDER_ERROR });
  }
};
