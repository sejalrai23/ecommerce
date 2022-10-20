import { ProductConstants } from "../actions/constants";
const initState = {
  products: [],
  productsByPrice: {
    under5k: [],
    under10k: [],
    under15k: [],
    under20k: [],
    under30k: []
  },
  pageRequest: false,
  page: [],
  error: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case ProductConstants.GET_PRODUCTS_BYSLUG:
      state = {
        ...state,
        products: action.payload.products,
        productsByPrice: {
          ...action.payload.productsByPrice,
        }
      }
      break;
    case ProductConstants.GET_PRODUCT_PAGE_REQUEST:
      state = {
        ...state,
        pageRequest: true

      }
      break;
    case ProductConstants.GET_PRODUCT_PAGE_SUCCESS:
      state = {
        ...state,
        page: action.payload.page,
        pageRequest: false
      }
      break;
    case ProductConstants.GET_PRODUCT_PAGE_FAILURE:
      state = {
        ...state,
        pageRequest: false,
        error: action.payload.error
      }
      case ProductConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case ProductConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
        state = {
          ...state,
          loading: false,
          productDetails: action.payload.productDetails,
        };
        break;
      case ProductConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
        state = {
          ...state,
          loading: false,
          error: action.payload.error,
        };
      break;
  }
  return state;
}