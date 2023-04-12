import {
  cartDataLoading,
  cartDataSuccess,
  ManageQuantity,
  deleteCartItem,
  address,
  successfullypayment,
} from "./actionType";

let initialState = {
  loading: false,
  data: [],
  ItemCount: 0,
  totalCartPrice: 0,
  deliveryAddress: {},
};

export const CartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case cartDataLoading: {
      return {
        ...state,
        loading: true,
      };
    }

    case cartDataSuccess: {
      return {
        ...state,
        loading: false,
        data: [...state.data, payload],
        ItemCount: state.data.length + 1,
        totalCartPrice:
          state.totalCartPrice + payload.price * payload.productQuantity,
      };
    }

    case ManageQuantity: {
      let newData = state.data.map((item, index) => {
        if (index === payload.index) {
          item.productQuantity = payload.productQuantity;
        }
        return item;
      });

      let totalPrice = newData.reduce((accumulator, currentProduct) => {
        const productPrice =
          currentProduct.price * currentProduct.productQuantity;
        return accumulator + productPrice;
      }, 0);

      return {
        ...state,
        loading: false,
        data: newData,
        ItemCount: newData.length,
        totalCartPrice: totalPrice,
      };
    }

    case deleteCartItem: {
      const filterData = state.data.filter((item, index) => {
        return index !== payload;
      });

      let totalPrice = filterData.reduce((accumulator, currentProduct) => {
        const productPrice =
          currentProduct.price * currentProduct.productQuantity;
        return accumulator + productPrice;
      }, 0);
      return {
        ...state,
        data: filterData,
        ItemCount: filterData.length,
        totalCartPrice: totalPrice,
      };
    }

    case address: {
      return {
        ...state,
        deliveryAddress: payload,
      };
    }

    case successfullypayment: {
      return {
        loading: false,
        data: [],
        ItemCount: 0,
        totalCartPrice: 0,
        deliveryAddress: {},
      };
    }

    default: {
      return state;
    }
  }
};
