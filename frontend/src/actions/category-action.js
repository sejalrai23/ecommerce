import axiosInstance from "../helpers/axios";
import { CategoryConstants } from "./constants";

export const getAllCategory = () => {
  return async dispatch => {
    dispatch({ type: CategoryConstants.GET_CAT_REQUEST });
    const res = await axiosInstance.get('/category/view');
    console.log(res);
    if (res.status === 201) {

      const categoryList = res.data.catergorylist;
      // console.log(res.data.catergorylist);
      // console.log("plss:", categoryList);
      dispatch({
        type: CategoryConstants.GET_CAT_SUCCESS,
        payload: { category: res.data.catergorylist },
      })
    } else {
      dispatch({ type: CategoryConstants.GET_CAT_FAILURE, payload: { error: res.data.error } })
    }
  }
}

