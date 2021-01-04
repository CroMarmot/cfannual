import Vue from 'vue'

function date(t) {
  try {
    const d = new Date(t)
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
    return t
  }
}

function contestUrl(contestId) {
  return `https://codeforces.com/contest/${contestId}`
}

function ratingFmt(val) {
  return val === 0 ? '0' : (val > 0 ? `+${val}` : `${val}`)
}

const filters = {
  date,
  contestUrl,
  ratingFmt,
}

export default filters

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
