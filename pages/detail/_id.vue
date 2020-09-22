<template>
  <a-layout class="content-section">
    <a-layout-content class="main-section">
      <a-page-header title="Title" sub-title="This is a subtitle" />
      <a-list item-layout="horizontal" :data-source="articleList">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta :description="item.description">
            <a slot="title" :href="item.link">{{ item.title }}</a>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-layout-content>
    <a-layout-sider :width="340" class="asider-section">
      <WeeklyCollection :weekly-list="weekList" />
      <TagCollection :tag-list="tagList" @tagClick="handleTagClick" />
    </a-layout-sider>
  </a-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Detail',
  asyncData({ store, params }) {
    return store.dispatch('fetchArticle', { week: params.id })
  },
  data() {
    return {
      weeklyList: [],
      tagList: [],
    }
  },
  computed: {
    ...mapState({
      articleList: (state) => state.articleList,
      weekList: (state) => state.weekList,
    }),
  },
  mounted() {
    this.getTagList()
    if (!(this.weekList && this.weekList.length)) {
      this.getPostWeeks()
    }
  },
  methods: {
    ...mapActions({
      getPostWeeks: 'fetchWeekList',
    }),
    handleTagClick(tag) {},
    async getTagList() {
      const resData = await this.$axios.$post(`/categories/list`)
      this.tagList = resData
    },
  },
}
</script>

<style>
.content-section {
  box-sizing: border-box;
  padding: 40px 50px;
}
.main-section .ant-list {
  padding-left: 26px;
}
.asider-section {
  margin-left: 30px;
  background: none;
}
</style>
