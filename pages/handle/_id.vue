<template>
  <div class="handle-main">
    <div class="radio-divs">
      <div v-for="y in years" class="radio-div">
        <input :id="`year-${y}`" :value="y" v-model="year" @input="(e)=>setYear(e.target.value)" type="radio">
        <label :for="`year-${y}`">{{ y }}</label>
        <br>
      </div>
    </div>

    <user-handle
      v-if="readyCnt === 100"
      :score="userColor"
      :handle="$route.params.id"
      class="user-handle"
    />
    <h2
      v-if="readyCnt !== 100"
      class="loading main"
    >
      {{ $t('Loading') }}...({{ readyCnt }}%)
    </h2>
    <nuxt-child v-else class="main"/>
    <div v-if="readyCnt === 100" class="footer">
      <a @click="gotourl('summary')" class="nuxt-link">{{ $t('id.summary') }}</a>
      <a @click="gotourl('rating')" class="nuxt-link">{{ $t('id.rating') }}</a>
      <a @click="gotourl('verdict')" class="nuxt-link">{{ $t('id.verdict') }}</a>
      <a @click="gotourl('tags')" class="nuxt-link">{{ $t('id.tags') }}</a>
      <a @click="gotourl('submit')" class="nuxt-link">{{ $t('id.submit') }}</a>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import UserHandle from '~/components/userHandle'

export default {
  components: {UserHandle},
  data() {
    return {
      curYear: (new Date()).getFullYear(),
      year: (new Date()).getFullYear(),
    }
  },
  computed: {
    ...mapState(['userRating', 'userStatus']),
    years() {
      let lowYear = this.curYear
      this.userRating.result.forEach((item) => {
        lowYear = Math.min(lowYear, (new Date(item.ratingUpdateTimeSeconds * 1000)).getFullYear())
      })
      const result = []
      for (let i = lowYear; i <= this.curYear; i++) {
        result.push(i)
      }
      return result
    },
    userRatingResult() {
      return this.userRating.result.filter(item =>
        (item.ratingUpdateTimeSeconds * 1000) > (new Date(`${this.year}-01-01`)).getTime() &&
          (item.ratingUpdateTimeSeconds * 1000) < (new Date(`${this.year + 1}-01-01`)).getTime(),
      )
    },
    userColor() {
      const {userRatingResult} = this
      return userRatingResult.length > 0
        ? userRatingResult[userRatingResult.length - 1].newRating
        : -1
    },
    readyCnt() {
      let ret = 0
      if (typeof this.userRating.status !== 'undefined') {
        ret += 50
      }
      if (typeof this.userStatus.status !== 'undefined') {
        ret += 50
      }
      return ret
    },
  },
  mounted() {
    const handle = this.$route.params.id
    Promise.all([this.getUserRating({handle}), this.getUserStatus({handle})]).catch((e) => {
      alert(e)
    })
  },
  methods: {
    ...mapMutations(['setYear']),
    ...mapActions(['getUserRating', 'getUserStatus']),
    gotourl(url) {
      // TODO 相对路径
      this.$router.push(this.localeRoute({
        name: `handle-id-stat-${url}`,
      }))
    },
  },
}
</script>

<style scoped lang="scss">
  .handle-main {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;

    .radio-divs{
      padding: 5px;
      display: inline-flex;
      flex-wrap: wrap;
      .radio-div{
        padding: 5px;
      }
    }

    .user-handle {
      text-align: center;
      padding-top: 20px;
      padding-bottom: 20px;
      font-size: 10vw;
      width: 100vw;
      font-weight: bold;
      text-shadow: 1px 1px black;
    }
  }

  @media screen and (min-width: 600px) {
    .handle-main {
      margin: 0 auto;
    }
  }

  .loading {
    text-align: center;
  }

  .main {
    padding: 1em;
    flex: 1;
    max-width: 100vh;
  }

  .footer {
    padding: 1em;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100vw;
  }

  .nuxt-link {
    border-bottom-color: rgb(0, 0, 0);
    border-bottom-style: none;
    border-bottom-width: 0px;
    border-image-outset: 0px;
    border-image-repeat: stretch;
    border-image-slice: 100%;
    border-image-source: none;
    border-image-width: 1;
    border-left-color: rgb(0, 0, 0);
    border-left-style: none;
    border-left-width: 0px;
    border-right-color: rgb(0, 0, 0);
    border-right-style: none;
    border-right-width: 0px;
    border-top-color: rgb(0, 0, 0);
    border-top-style: none;
    border-top-width: 0px;
    color: rgb(0, 0, 0);
    cursor: pointer;
    display: block;
    float: left;
    font-family: Cuprum, sans-serif;
    font-size: 3vw;
    font-weight: 400;
    letter-spacing: normal;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    margin-bottom: 0px;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    outline-color: rgb(0, 0, 0);
    outline-style: none;
    outline-width: 0px;
    overflow-x: hidden;
    overflow-y: hidden;
    text-align: center;
    text-decoration-color: rgb(0, 0, 0);
    text-decoration-line: none;
    text-decoration-style: solid;
    text-transform: uppercase;
    width: 7em;
  }
</style>
