import axiosInstance from "../helpers/axios";
import { AuthConstants } from "./constants";

export const login = (user) => {
  return async (dispatch) => {

    dispatch({ type: AuthConstants.LOGIN_REQUEST });
    const res = await axiosInstance.post('/login', {
      ...user
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: AuthConstants.LOGIN_SUCCESS, payload: {
          token, user
        }
      })
    } else {
      if (res.status === 400) {
        dispatch({
          type: AuthConstants.LOGIN_FAILURE,
          payload: { error: res.data.error }
        });
      }
    }

  }
}

export const isUserLoggedIn = () => {
  return async dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch({
        type: AuthConstants.LOGIN_SUCCESS, payload: {
          token, user
        }
      })
    }

  }
}

export const signOut = () => {
  return async dispatch => {

    dispatch({ type: AuthConstants.LOGOUT_REQUEST });
    const res = await axiosInstance.post('/signout');
    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: AuthConstants.LOGOUT_SUCCESS,
      });

    } else {
      dispatch({
        type: AuthConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error }
      })

    }

  }
}


