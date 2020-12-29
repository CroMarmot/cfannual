<template>
  <div class="problems">
    <div v-if="mostSubmit.submitTimes > 0">
      提交
      <a
        :href="`https://codeforces.com/contest/${mostSubmit.problem.contestId}/problem/${mostSubmit.problem.index}`"
      >
        {{ `${mostSubmit.problem.contestId}${mostSubmit.problem.index} ${mostSubmit.problem.name}` }}
      </a>
      的次数最多,一共提交了{{ mostSubmit.submitTimes }}次,最后{{ mostSubmit.verdict==='OK'?'通过了':'依然没有过' }}测试
    </div>
    <div v-else>
      您甚至没有提交过题
    </div>
    <div v-if="fst.length > 0">
      <h2>Failed System Test</h2>
      <h6>*注: 根据官方api返回的testset字段是否为TESTS来判断，所以有些EDU场可能pretest也没过，但是官方也算system test</h6>
      <div v-for="item in fst">
        <a :href="`https://codeforces.com/contest/${item.problem.contestId}/standings/friends/true`">
          <span>{{ item.problem.contestId }}</span>
          <span>{{ item.problem.index }}</span>
        </a>
      </div>
    </div>
    <div v-else>
      <div>您在{{ year }}年没有FST过</div>
    </div>
    <div v-if="hacked.length > 0">
      <h2>Hacked</h2>
      <div v-for="item in hacked">
        <a :href="`https://codeforces.com/contest/${item.problem.contestId}/standings/friends/true`">
          <span>{{ item.problem.contestId }}</span>
          <span>{{ item.problem.index }}</span>
        </a>
      </div>
    </div>
    <div v-else>
      <div>您在{{ year }}年没有因HACK失去AC过</div>
    </div>
  </div>
</template>

<script>

import {mapState, mapGetters} from 'vuex'

export default {
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
    },
    fst() {
      const list = this.userStatusResult(this.year).filter(item => item.relativeTimeSeconds !== 2147483647)
      const resultList = []
      const visit = {}
      list.forEach((item) => {
        const pid = `${item.problem.contestId}${item.problem.index}`
        if (!visit[pid]) {
          visit[pid] = 1
          resultList.push(item)
        }
      })
      return resultList.filter(item => item.verdict !== 'OK' && item.testset === 'TESTS')
    },
    hacked() {
      const list = this.userStatusResult(this.year).filter(item => item.relativeTimeSeconds !== 2147483647)
      const resultList = []
      const visit = {}
      list.forEach((item) => {
        const pid = `${item.problem.contestId}${item.problem.index}`
        if (!visit[pid]) {
          visit[pid] = 1
          resultList.push(item)
        }
      })
      return resultList.filter(item => item.verdict !== 'OK' && item.testset === 'CHALLENGES')
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
  .problems {
    display: block;
  }
</style>
