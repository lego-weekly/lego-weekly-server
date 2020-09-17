<template>
  <a-layout-content class="content-section">
    <a-row :gutter="[16, { xs: 16, sm: 16, md: 24, lg: 32 }]">
      <a-col
        v-for="item in weeklyList"
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
export default {
  name: 'Home',
  data() {
    return {
      weeklyList: [
        {
          id: '11',
          title: '',
          dataTime: '2020-10-10',
          week: 1,
          count: 1,
        },
        {
          id: '99',
          title: '',
          dataTime: '2020-10-10',
          week: 2,
          count: 2,
        },
        {
          id: '22',
          title: '',
          dataTime: '2020-10-10',
          week: 3,
          count: 3,
        },
        {
          id: '33',
          title: '',
          dataTime: '2020-10-10',
          week: 4,
          count: 4,
        },
        {
          id: '44',
          title: '',
          dataTime: '2020-10-10',
          week: 5,
          count: 5,
        },
        {
          id: '55',
          title: '',
          dataTime: '2020-10-10',
          week: 6,
          count: 6,
        },
      ],
    }
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
