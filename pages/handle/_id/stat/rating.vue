<template>
  <div class="problems">
    <div
      v-if="userRatingResultYear.length > 0"
      class="rank-part"
    >
      <div>
        在
        <contest-link :contestId="rankM[0].contestId">
          {{ rankM[0].contestName }}
        </contest-link>
        取得了最低排名,排名在 {{ rankM[0].rank }} 名
      </div>
      <div>
        在
        <contest-link :contestId="rankM[1].contestId">
          {{ rankM[1].contestName }}
        </contest-link>
        取得了最高排名,排名在 {{ rankM[1].rank }} 名
      </div>
    </div>

    <div class="rank-part">
      <div
        v-if="ratingM[0].newRating-ratingM[0].oldRating < 0 "
      >
        在
        <contest-link :contestId="ratingM[0].contestId">
          {{ ratingM[0].contestName }}
        </contest-link>
        掉分最多,掉了 {{ ratingM[0].newRating - ratingM[0].oldRating }} 分
      </div>
      <div v-else>
        您没有掉过分
      </div>

      <div
        v-if="ratingM[1].newRating - ratingM[1].oldRating > 0 "
      >
        在
        <contest-link :contestId="ratingM[1].contestId">
          {{ ratingM[1].contestName }}
        </contest-link>
        上分最多,上了 {{ ratingM[1].newRating - ratingM[1].oldRating }} 分
      </div>
      <div v-else>
        您没有上过分
      </div>
    </div>
  </div>
</template>

<script>

import {mapState, mapGetters} from 'vuex'
import ContestLink from '~/components/contestLink.vue'

export default {
  components: {ContestLink},
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
    userRatingResultYear() {
      return this.userRatingResult(this.year)
    },
    rankM() {
      return this.userRatingResultYear.reduce((pre, cur) => {
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

<style scoped lang="scss">
  .problems {
    display: block;
  }

  .rank-part {
    display: block;
  }
</style>
