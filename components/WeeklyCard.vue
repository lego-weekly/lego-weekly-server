<template>
  <div class="weekly-card" @click="goToDetail">
    <a-card hoverable>
      <img slot="cover" class="weekly-card-image" alt="" :src="source.image" />
      <a-card-meta :title="weeklyTitle" description></a-card-meta>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'WeeklyCard',
  props: {
    source: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    weeklyTitle() {
      const { title, week } = this.source
      return title || `前端小报第${week}期`
    },
  },
  methods: {
    goToDetail() {
      this.$router.push({
        name: 'detail-id',
        params: {
          id: this.source.id,
        },
      })
    },
  },
}
</script>

<style scoped>
.weekly-card-image {
  width: 100%;
  height: 200px;
}
</style>
