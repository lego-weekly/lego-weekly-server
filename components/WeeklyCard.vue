<template>
  <div class="weekly-card" @click="goToDetail">
    <a-card hoverable>
      <img
        slot="cover"
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
      <a-card-meta
        :title="weeklyTitle"
        description="This is the description"
      ></a-card-meta>
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
