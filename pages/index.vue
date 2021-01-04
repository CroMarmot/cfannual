<template>
  <div class="container">
    <div>
      <h2 class="subtitle">
        Codeforces
      </h2>
      <h2 class="subtitle">
        {{ $t('index.AnnualReport') }}
      </h2>
      <form v-on:submit.prevent="go">
        <input v-model="handle" :placeholder="$t('index.EnterYourHandle')">
      </form>
      <div class="links">
        <a
          @click="go"
          target="_blank"
          class="button--green"
        >
          {{ $t('index.go') }}
        </a>
      </div>
    </div>
    <div class="lang-router">
      <nuxt-link
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
      >
        {{ locale.name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      handle: '',
    }
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales // .filter(i => i.code !== this.$i18n.locale)
    },
  },
  mounted() {
    window.vueIns = this
  },
  methods: {
    go() {
      if (this.handle.trim() === '') {
        // eslint-disable-next-line no-console
        alert(this.$t('index.EnterYourHandle'))
      } else {
        this.$router.push(this.localeRoute({
          path: `/handle/${this.handle.trim()}/stat/summary`,
        }))
      }
    },
  },
}
</script>

<style lang="scss" scoped>
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
  .lang-router{
    display: flex;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    justify-content: center;
    align-items: center;

    a {
      padding: 3px;
    }
  }
</style>
