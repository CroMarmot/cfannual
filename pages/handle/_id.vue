<template>
  <div class="handle-main">
    <user-handle
      v-if="readyCnt === 100"
      :score="userColor"
      :handle="$route.params.id"
      :style="{'text-align':'center',padding:'20px','font-size':'10vw'}"
    />
    <h2
      v-if="readyCnt !== 100"
      class="loading main"
    >
      Loading...({{ readyCnt }}%)
    </h2>
    <nuxt-child v-else class="main"/>
    <div v-if="readyCnt === 100" class="footer">
      <a @click="gotourl('summary')" class="nuxt-link">summary</a>
      <a @click="gotourl('rating')" class="nuxt-link">rating</a>
      <a @click="gotourl('verdict')" class="nuxt-link">verdict</a>
      <a @click="gotourl('tags')" class="nuxt-link">tags</a>
      <a @click="gotourl('submit')" class="nuxt-link">submit</a>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import UserHandle from '~/components/userHandle'

export default {
  components: {UserHandle},
  data() {
    return {
      year: 2019 // todo 可以改成router里的参数
    }
  },
  computed: {
    ...mapState(['userRating', 'userStatus']),
    userRatingResult() {
      return this.userRating.result.filter(item =>
        (item.ratingUpdateTimeSeconds * 1000) > (new Date(`${this.year}-01-01`)).getTime() &&
        (item.ratingUpdateTimeSeconds * 1000) < (new Date(`${this.year + 1}-01-01`)).getTime()
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
    }
  },
  mounted() {
    const handle = this.$route.params.id
    this.getUserRating({handle})
    this.getUserStatus({handle})
  },
  methods: {
    ...mapActions(['getUserRating', 'getUserStatus']),
    gotourl(url) {
      // TODO 相对路径
      this.$router.push({
        name: `handle-id-stat-${url}`
      })
    }
  }
}
</script>

<style scoped>
  .handle-main {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media screen and (min-width: 600px) {
    .handle-main {
      width: 800px;
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
