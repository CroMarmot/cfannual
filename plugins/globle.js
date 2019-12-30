import Vue from 'vue'

Vue.mixin({
  methods: {
    $scoreColor(score) {
      let suffix = ''
      if (score <= 0) {
        suffix = 'white'
      } else if (score < 1200) {
        suffix = 'grey'
      } else if (score < 1400) {
        suffix = 'green'
      } else if (score < 1600) {
        suffix = 'cyan'
      } else if (score < 1900) {
        suffix = 'blue'
      } else if (score < 2100) {
        suffix = 'purple'
      } else if (score < 2400) {
        suffix = 'orange'
      } else if (score < 3000) {
        suffix = 'red'
      } else {
        suffix = 'lgm'
      }
      return `score-color-${suffix}`
    },
    $add(val1, val2) {
      if (typeof val1 === 'undefined') {
        val1 = 0
      }
      if (typeof val2 === 'undefined') {
        val2 = 0
      }
      return val1 + val2
    }
  }
})
