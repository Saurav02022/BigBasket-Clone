import {
  cartDataLoading,
  cartDataSuccess,
  deleteCartItem,
  decreasePrice,
  address,
  successfullypayment,
} from "./actionType";

export const addToCart = (data) => (dispatch) => {
  dispatch({ type: cartDataLoading });
  dispatch({ type: cartDataSuccess, payload: data });
};

export const removeItem = (index) => (dispatch) => {
  dispatch({ type: deleteCartItem, payload: index });
};

export const decrease = (price) => (dispatch) => {
  dispatch({ type: decreasePrice, payload: price });
};

export const Address = (data) => (dispatch) => {
  dispatch({ type: address, payload: data });
};

export const successPayment = () => (dispatch) => {
  dispatch({ type: successfullypayment });
};
