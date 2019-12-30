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
  ),
  rankM: (state, getters) => (year) => {
    return getters.userRatingResult(year).reduce((pre, cur) => {
      const _low = cur.rank > pre[0].rank ? cur : pre[0]
      const _high = cur.rank < pre[1].rank ? cur : pre[1]
      return [_low, _high]
    }, [{rank: 0}, {rank: 10000}])
  },
  ratingM: (state, getters) => (year) => {
    const userRatingResult = getters.userRatingResult(year)
    return userRatingResult.reduce((pre, cur) => {
      const preLowDelta = pre[0].newRating - pre[0].oldRating
      const preHighDelta = pre[1].newRating - pre[1].oldRating
      const curDelta = cur.newRating - cur.oldRating

      const _low = curDelta < preLowDelta ? cur : pre[0]
      const _high = curDelta > preHighDelta ? cur : pre[1]
      return [_low, _high]
    }, [
      Object.assign({}, userRatingResult[0]),
      Object.assign({}, userRatingResult[0])
    ])
  }
}
