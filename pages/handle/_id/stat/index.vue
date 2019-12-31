<template>
  <div class="index">
    index
  </div>
</template>

<script>

export default {
  mounted() {
    this.$router.push({
      // TODO 相对路径
      name: `handle-id-stat-summary`
    })
  }
}
</script>
<style scoped>
</style>
