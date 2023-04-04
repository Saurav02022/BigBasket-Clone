import axios from "axios";
import { DataLoading, DataSuccess, DataError } from "./actionType";

const initialDataURL =
  "https://bigbasket-clone-backend-db-json.vercel.app/posts";

const byPriceLowToHigh =
  "https://bigbasket-clone-backend-db-json.vercel.app/posts?_sort=price&_order=asc";

const byPriceHighToLow =
  "https://bigbasket-clone-backend-db-json.vercel.app/posts?_sort=price&_order=desc";


export const getData = (sortby) => async (dispatch) => {
  const url = sortby === 'asc'
  ? byPriceLowToHigh
  : sortby === 'desc'
    ? byPriceHighToLow
    : initialDataURL;
  try {
    dispatch({ type: DataLoading });
    await axios.get(url).then((res) => {
      dispatch({ type: DataSuccess, payload: res.data });
    });
  } catch (err) {
    dispatch({ type: DataError });
  }
};
