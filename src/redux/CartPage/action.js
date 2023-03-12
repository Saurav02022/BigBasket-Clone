import {
  cartDataLoading,
  cartDataSuccess,
  deleteSuccess,
  increaseQuantity,
  decreaseQuantity,
  address,
  successfullypayment,
} from "./actionType";

export const addToCart = (data) => (dispatch) => {
  dispatch({ type: cartDataLoading });
  dispatch({ type: cartDataSuccess, payload: data });
};

export const increase = (price) => (dispatch) => {
  dispatch({ type: increaseQuantity, payload: price });
};

export const decrease = (price) => (dispatch) => {
  dispatch({ type: decreaseQuantity, payload: price });
};

export const removeItem = (title) => (dispatch) => {
  dispatch({ type: deleteSuccess, payload: title });
};

export const Address = (data) => (dispatch) => {
  dispatch({ type: address, payload: data });
};

export const successPayment = () => (dispatch) => {
  dispatch({ type: successfullypayment });
};
