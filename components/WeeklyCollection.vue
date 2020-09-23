<template>
  <div class="weekly-collection">
    <h2>往期小报</h2>
    <div class="weekly-list">
      <ul>
        <li v-for="weekly in weeklyList" :key="weekly.id">
          <nuxt-link :to="/detail/ + weekly.id" target="_blank">{{
            getTitle(weekly)
          }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeeklyCollection',
  props: {
    weeklyList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    getTitle({ title, week }) {
      return title || `前端小报第${week}期`
    },
    onTagClick(tag) {
      this.$emit('tagClick', tag)
    },
  },
}
</script>
