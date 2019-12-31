<template>
  <div>
    <h1>{{ year }}</h1>
    <table>
      <tbody>
        <tr>
          <td>ContestName</td>
          <td>RatingUpdate</td>
          <td>Rank</td>
          <td>Delta</td>
          <td>NewRating</td>
        </tr>
        <tr v-for="item in userRatingResult(year)" class="u-list">
          <td style="color: grey;">
            <contest-link :contestId="item.contestId">
              {{ item.contestName }}
            </contest-link>
          </td>
          <td style="color: green;">
            {{ item.ratingUpdateTimeSeconds*1000 | date }}
          </td>
          <td>
            {{ item.rank }}
          </td>
          <td>
            <rating-change-p :rating-delta="item.newRating-item.oldRating"/>
          </td>
          <td :class="[$scoreColor(item.newRating)]">
            {{ item.newRating }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import {mapState, mapGetters} from 'vuex'
import ContestLink from '~/components/contestLink.vue'
import RatingChangeP from '~/components/ratingChangeP'

export default {
  components: {RatingChangeP, ContestLink},
  computed: {
    ...mapState([
      'year'
    ]),
    ...mapGetters([
      'userRatingResult'
    ])
  }
}
</script>
<style scoped>
</style>
