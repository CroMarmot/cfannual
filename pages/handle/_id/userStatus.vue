<template>
  <div>
    <h1>{{ year }}</h1>
    <table>
      <tbody>
        <tr v-for="item in userStatusResult(year)">
          <td>{{ item.id }}</td>
          <td>{{ item.contestId }}</td>
          <td>{{ item.creationTimeSeconds * 1000 | date }}</td>
          <td>{{ item.relativeTimeSeconds }}</td>
          <td>{{ item.problem }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.programmingLanguage }}</td>
          <td>{{ item.verdict }}</td>
          <td>{{ item.testset }}</td>
          <td>{{ item.passedTestCount }}</td>
          <td>{{ item.timeConsumedMillis }}</td>
          <td>{{ item.memoryConsumedBytes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState([
      'year',
    ]),
    ...mapGetters([
      'userStatusResult',
    ]),
  },
}
</script>
<style scoped>
</style>
