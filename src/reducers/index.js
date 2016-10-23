import { combineReducers } from 'redux'
import tab from './tab'
import float from './float'

const cnodeApp = combineReducers({
  tab, float
})

export default cnodeApp