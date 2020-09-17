<template>
  <a-layout class="content-section">
    <a-layout-content class="main-section">
      <a-page-header title="Title" sub-title="This is a subtitle" />
      <a-list item-layout="horizontal" :data-source="articleList">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta :description="item.description">
            <a slot="title" :href="item.link"> {{ item.title }}</a>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-layout-content>
    <a-layout-sider :width="340" class="asider-section">
      <WeeklyCollection :weekly-list="weeklyList" />
      <TagCollection :tag-list="tagList" @tagClick="handleTagClick" />
    </a-layout-sider>
  </a-layout>
</template>

<script>
import api from '@/data/api.js'

export default {
  name: 'Detail',
  async asyncData({ params }) {
    const resData = await api.getArticleList({ week: params.id })
    return { articleList: resData }
  },
  data() {
    return {
      weeklyList: [
        {
          id: '23',
          title: '',
          week: '1',
          count: '1',
        },
        {
          id: '23',
          title: '',
          week: '1',
          count: '1',
        },
      ],
      tagList: [],
    }
  },
  mounted() {
    this.getTagList()
  },
  methods: {
    handleTagClick(tag) {},
    async getPostWeeks() {
      const resData = await api.getWeekList()
      this.weeklyList = resData
    },
    async getTagList() {
      const resData = await api.getTagList()
      this.tagList = resData ? resData.filter((it) => !!it.parentId) : []
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
