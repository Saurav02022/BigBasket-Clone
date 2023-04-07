import {
  cartDataLoading,
  cartDataSuccess,
  deleteCartItem,
  decreasePrice,
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
        totalCartPrice: state.totalCartPrice + payload.price,
      };
    }

    case decreasePrice: {
      return {
        ...state,
        totalCartPrice: state.totalCartPrice - payload,
      };
    }

    case deleteCartItem: {
      const filterData = state.data.filter((item) => {
        return item.index !== payload;
      });
      return {
        ...state,
        data: filterData,
        ItemCount: filterData.length,
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
