import {
  LOAD_FLIGHTS_REQUEST,
  LOAD_FLIGHTS_SUCCESS,
  LOAD_FLIGHTS_FAILURE,
  SET_VISIBILITY_FILTER
} from '../constants'
import { CALL_API } from '../middleware/api'

const loadFlights = () => ({
  [CALL_API]: {
    types: [LOAD_FLIGHTS_REQUEST, LOAD_FLIGHTS_SUCCESS, LOAD_FLIGHTS_FAILURE],
    data: {
      method: 'get',
      url: '/public/data.json'
    }
  }
});

const setVisibilityFilter = (filter) => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export { loadFlights, setVisibilityFilter };