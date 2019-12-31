<template>
  <a :href="contestId | contestUrl">
    <slot/>
  </a>
</template>

<script>
export default {
  props: {
    contestId: {
      type: Number,
      default: 0,
      require: true
    }
  }
}

</script>

<style>
</style>
