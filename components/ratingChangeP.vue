<template>
  <p :style="{color: ratingDelta >= 0?'green':'red'}">
    {{ ratingDelta | ratingFmt }}
  </p>
</template>

<script>
export default {
  props: {
    ratingDelta: {
      type: Number,
      default: 0,
      require: true,
    },
  },
}

</script>

<style>
</style>
