<template>
  <div class="container">
    <div>
      <h2 class="subtitle">
        Codeforces
      </h2>
      <h2 class="subtitle">
        年度报告
      </h2>
      <form v-on:submit.prevent="go">
        <input v-model="handle" placeholder="Enter your handle">
      </form>
      <div class="links">
        <a
          @click="go"
          target="_blank"
          class="button--green"
        >
          Go
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      handle: ''
    }
  },
  methods: {
    go() {
      if (this.handle.trim() === '') {
        // eslint-disable-next-line no-console
        alert('please enter your handle')
      } else {
        this.$router.push(`handle/${this.handle.trim()}/stat/summary`)
      }
    }
  }
}
</script>

<style>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
