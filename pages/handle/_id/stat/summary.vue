<template>
  <div class="summary">
    <div class="text">
      {{ year }}年，你参加了{{ userRatingResult(year).length }}场Rated的比赛
    </div>
    <div class="text">
      从年初到年末你的分数变化了
    </div>
    <div class="score-div">
      <rating-change-p :rating-delta="ratingChange" class="score"/>
    </div>
  </div>
</template>

<script>

import {mapState, mapGetters} from 'vuex'
import RatingChangeP from '~/components/ratingChangeP'

export default {
  components: {RatingChangeP},
  computed: {
    ...mapState([
      'userRating',
      'userStatus',
      'year'
    ]),
    ...mapGetters([
      'userStatusResult',
      'userRatingResult'
    ]),
    rankM() {
      return this.userRatingResult(this.year).reduce((pre, cur) => {
        const _low = cur.rank > pre[0].rank ? cur : pre[0]
        const _high = cur.rank < pre[1].rank ? cur : pre[1]
        return [_low, _high]
      }, [{rank: 0}, {rank: 10000}])
    },
    ratingM() {
      const userRatingResult = this.userRatingResult(this.year)
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
    },
    ratingChange() {
      const userRatingResult = this.userRatingResult(this.year)
      return userRatingResult.length > 0
        ? userRatingResult[userRatingResult.length - 1].newRating - userRatingResult[0].oldRating
        : 0
    },
    mergedUserStatusResult() {
      return Object.values(this.userStatusResult(this.year).reduce((pre, cur) => {
        const problemId = `${cur.problem.contestId}${cur.problem.index}`
        let submitTimes = typeof pre[problemId] === 'undefined' ? 0 : pre[problemId].submitTimes
        if (typeof submitTimes === 'undefined') {
          submitTimes = 0
        }
        submitTimes++
        if (typeof pre[problemId] === 'undefined' || cur.verdict === 'OK') {
          pre[problemId] = Object.assign({}, cur)
        }
        Object.assign(pre[problemId], {submitTimes})
        return pre
      }, {}))
    },
    mostSubmit() {
      return this.mergedUserStatusResult.reduce(
        (pre, cur) => cur.submitTimes > pre.submitTimes ? cur : pre
        , {submitTimes: 0, problem: {contestId: 0, index: 0, name: ''}, verdict: ''}) // fix empty stat?
    },
    tags() {
      return this.mergedUserStatusResult.reduce((pre, cur) => {
        const {submit, ac, notac} = pre
        cur.problem.tags.forEach((tag) => {
          submit[tag] = this.$add(submit[tag], 1)
          if (cur.verdict === 'OK') {
            ac[tag] = this.$add(ac[tag], 1)
          } else {
            notac[tag] = this.$add(notac[tag], 1)
          }
        })
        return {submit, ac, notac}
      }, {submit: {}, ac: {}, notac: {}})
    },
    tagsDisplay() {
      return {
        submit: this.tagsMost(this.tags.submit),
        ac: this.tagsMost(this.tags.ac),
        notac: this.tagsMost(this.tags.notac)
      }
    }
  },
  methods: {
    tagsMost(tagsDict) {
      if (Object.keys((tagsDict)).length === 0) {
        return {key: '', value: ''}
      }
      const key = Object.keys(tagsDict).reduce((pre, cur) => tagsDict[cur] > tagsDict[pre] ? cur : pre,
        Object.keys(tagsDict)[0])
      return {key, value: tagsDict[key]}
    }
  }
}
</script>
<style scoped>
  .summary {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    line-height: 2em;
  }

  .text {
    font-size: 1em;
  }

  .score-div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .score {
    font-size: 40vw;
  }

  @media screen and (min-width: 600px) {
    .text {
      font-size: 3vh;
    }

    .score {
      font-size: 30vh;
    }
  }
</style>
