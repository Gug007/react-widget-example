import { combineReducers } from 'redux'
import flights from './flights'
import { SET_VISIBILITY_FILTER } from '../constants'

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch(action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  flights,
  visibilityFilter
})

export default rootReducer;