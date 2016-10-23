import { UPDATE_FLOAT } from '../constants'

export default (state = false, action) => {
  switch (action.type) {
  case UPDATE_FLOAT:
    state = action.value
    return state
  default:
    return state
  }
}