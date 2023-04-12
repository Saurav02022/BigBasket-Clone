import {
  cartDataLoading,
  cartDataSuccess,
  ManageQuantity,
  deleteCartItem,
  address,
  successfullypayment,
} from "./actionType";

export const addToCart = (data) => (dispatch) => {
  dispatch({ type: cartDataLoading });
  dispatch({ type: cartDataSuccess, payload: data });
};

export const manageQuantityOfData = (index, productQuantity) => (dispatch) => {
  dispatch({ type: ManageQuantity, payload: { index, productQuantity } });
};

export const removeItem = (index) => (dispatch) => {
  dispatch({ type: deleteCartItem, payload: index });
};

export const Address = (data) => (dispatch) => {
  dispatch({ type: address, payload: data });
};

//this function will work for empty the cart as well
export const successPayment = () => (dispatch) => {
  dispatch({ type: successfullypayment });
};
