// import {userStatus, userRating} from './staticjson'

export const state = () => ({
  year: (new Date()).getFullYear(),
  // userRating,
  // userStatus
  userRating: {
    result: [],
  },
  userStatus: {
    result: [],
  },
})

export const mutations = {
  setYear(state, payload) {
    state.year = Number(payload)
  },
  setUserRating(state, payload) {
    if (typeof payload.result === 'undefined') {
      payload.result = []
    }
    state.userRating = payload
  },
  setUserStatus(state, payload) {
    if (typeof payload.result === 'undefined') {
      payload.result = []
    }
    state.userStatus = payload
  },
}

export const actions = {
  // TODO 分页 localstorage + 手动强制刷新 减少请求
  async getUserRating({commit}, {handle}) {
    commit('setUserRating', {result: []})
    const data = await this.$axios.$get(`https://codeforces.com/api/user.rating?handle=${handle}`)
    commit('setUserRating', data)
    return data
  },
  async getUserStatus({commit}, {handle}) {
    commit('setUserStatus', {result: []})
    const data = await this.$axios.$get(`https://codeforces.com/api/user.status?handle=${handle}`)
    commit('setUserStatus', data)
    return data
  },
}

export const getters = {
  userStatusResult: state => year => state.userStatus.result.filter(item =>
    (Number(item.creationTimeSeconds) * 1000) > (new Date(`${Number(year)}-01-01`)).getTime() &&
    (Number(item.creationTimeSeconds) * 1000) < (new Date(`${Number(year) + 1}-01-01`)).getTime(),
  ),
  userRatingResult: state => year => state.userRating.result.filter(item =>
    (Number(item.ratingUpdateTimeSeconds) * 1000) > (new Date(`${Number(year)}-01-01`)).getTime() &&
    (Number(item.ratingUpdateTimeSeconds) * 1000) < (new Date(`${Number(year) + 1}-01-01`)).getTime(),
  ),
}
