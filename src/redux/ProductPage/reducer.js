import { DataLoading, DataSuccess, DataError } from "./actionType";

let initialState = {
  loading: false,
  data: [],
  error: false,
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DataLoading: {
      return {
        ...state,
        loading: true,
      };
    }

    case DataSuccess: {
      return {
        ...state,
        loading: false,
        data: payload,
        error: false,
      };
    }
    case DataError: {
      return {
        loading: false,
        data: [],
        error: true,
      };
    }
    default:
      return state;
  }
};
