// import {userStatus, userRating} from './staticjson'

export const state = () => ({
  year: 2019,
  // userRating,
  // userStatus
  userRating: {
    result: []
  },
  userStatus: {
    result: []
  }
})

export const mutations = {
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
  }
}

export const actions = {
  // TODO 分页 localstorage + 手动强制刷新 减少请求
  async getUserRating({commit}, {handle}) {
    commit('setUserRating', {result: []})
    const data = await this.$axios.$get(`https://codeforces.com/api/user.rating?handle=${handle}`)
    commit('setUserRating', data)
  },
  async getUserStatus({commit}, {handle}) {
    commit('setUserStatus', {result: []})
    const data = await this.$axios.$get(`https://codeforces.com/api/user.status?handle=${handle}`)
    commit('setUserStatus', data)
  }
}

export const getters = {
  userStatusResult: state => year => state.userStatus.result.filter(item =>
    (item.creationTimeSeconds * 1000) > (new Date(`${year}-01-01`)).getTime() &&
    (item.creationTimeSeconds * 1000) < (new Date(`${year + 1}-01-01`)).getTime()
  ),
  userRatingResult: state => year => state.userRating.result.filter(item =>
    (item.ratingUpdateTimeSeconds * 1000) > (new Date(`${year}-01-01`)).getTime() &&
    (item.ratingUpdateTimeSeconds * 1000) < (new Date(`${year + 1}-01-01`)).getTime()
  )
}
