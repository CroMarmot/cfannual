<template>
  <p
    :class="[handleColor]"
  >
    {{ handle }}
  </p>
</template>

<script>
export default {
  props: {
    handle: {
      type: String,
      default: '',
      require: true
    },
    score: {
      type: Number,
      default: 1500,
      require: false
    }
  },
  computed: {
    handleColor() {
      return this.$scoreColor(this.score)
    }
  }
}

</script>

<style scoped lang="scss">

</style>
