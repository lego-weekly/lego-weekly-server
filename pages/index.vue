<template>
  <a-layout-content class="content-section">
    <a-row :gutter="[16, { xs: 16, sm: 16, md: 24, lg: 32 }]">
      <a-col
        v-for="item in weekList"
        :key="item.id"
        :xs="12"
        :sm="12"
        :md="8"
        :lg="6"
      >
        <WeeklyCard :source="item" />
      </a-col>
    </a-row>
  </a-layout-content>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  asyncData({ store, params }) {
    return store.dispatch('fetchWeekList')
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      weekList: (state) => state.weekList,
    }),
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
}
.content-section {
  box-sizing: border-box;
  padding: 40px 50px;
}
</style>
