import { AuthConstants } from "../actions/constants"

const initState = {
  token: null,
  error: null,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    picture: ''
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  message: ''
}

export default (state = initState, action) => {

  console.log(action);
  switch (action.type) {
    case AuthConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,

      }
      break;
    case AuthConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false
      }
      break;
    case AuthConstants.LOGIN_FAILURE:
      state = {
        ...state,
        error: action.payload.error,

      }
      break;
    case AuthConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case AuthConstants.LOGOUT_SUCCESS:
      state = {
        ...initState
      }
      break;
    case AuthConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      }
      break;
  }

  return state;

}