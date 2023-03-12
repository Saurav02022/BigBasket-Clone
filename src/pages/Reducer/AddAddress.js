export const initialState = {
  name: "",
  email: "",
  number: 0,
  address: "",
  pincode: 0,
};

export const AddressReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case "name": {
      return {
        ...state,
        name: payload,
      };
    }
    case "email": {
      return {
        ...state,
        email: payload,
      };
    }
    case "number": {
      return {
        ...state,
        number: payload,
      };
    }
    case "address": {
      return {
        ...state,
        address: payload,
      };
    }
    case "pincode": {
      return {
        ...state,
        pincode: payload,
      };
    }
    default: {
      return state;
    }
  }
};
