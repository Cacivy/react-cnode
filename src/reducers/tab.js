import { UPDATE_IDNEX } from '../constants'

const stateDefault = {
  tabs: ['全部', '精华', '分享', '问答', '招聘'],
  tabsValue: ['', 'good', 'share', 'ask', 'job'],
  slideIndex: 0
}

export default (state = stateDefault, action) => {
  switch (action.type) {
  case UPDATE_IDNEX:
    state.slideIndex = action.value
    return state
  default:
    return state
  }
}