import {
  LOAD_FLIGHTS_REQUEST,
  LOAD_FLIGHTS_SUCCESS,
  LOAD_FLIGHTS_FAILURE
} from '../constants'

const initialState = {
  list: [],
  loading: false
};

function flights(state = initialState, action) {
  switch(action.type) {
    case LOAD_FLIGHTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOAD_FLIGHTS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.response.flights || []
      };
    case LOAD_FLIGHTS_FAILURE:
      return {
        ...state,
        loading: false
      };
    default:
      return state
  }
}

export default flights;