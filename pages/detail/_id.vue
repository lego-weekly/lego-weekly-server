<template>
  <a-layout class="content-section">
    <a-layout-content class="main-section">
      <a-page-header :title="pageTitle.title" :sub-title="pageTitle.subTitle" />
      <a-list item-layout="horizontal" :data-source="articleList">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
            :description="`${
              item.description.length > 170
                ? `${item.description.slice(0, 170)}...`
                : item.description
            }`"
          >
            <a slot="title" :href="item.link" target="_blank">{{
              item.title
            }}</a>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-layout-content>
    <a-layout-sider :width="340" class="asider-section">
      <WeeklyCollection :weekly-list="weekList" />
      <TagCollection :tag-list="tagList" />
    </a-layout-sider>
  </a-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Detail',
  asyncData({ store, params }) {
    const type = isNaN(+params.id) ? 'tag' : 'week'
    return store.dispatch('fetchArticle', { id: params.id, type })
  },
  data() {
    return {
      pageId: this.$route.params.id,
      tagList: [],
      pageTitle: {},
    }
  },
  computed: {
    ...mapState(['articleList', 'weekList']),
  },
  async mounted() {
    this.getTagList()
    if (!(this.weekList && this.weekList.length)) {
      await this.getPostWeeks()
    }
    this.pageTitle = this.initPageTitle()
  },
  methods: {
    ...mapActions({
      getPostWeeks: 'fetchWeekList',
    }),
    async getTagList() {
      const resData = await this.$axios.$post(`/categories/list`)
      this.tagList = resData.filter((it) => !!it.parentId)
    },
    initPageTitle() {
      if (isNaN(this.pageId)) return { title: this.pageId }
      const weekItem = this.weekList.find((it) => it.id === +this.pageId)
      return {
        title: weekItem && weekItem.title,
        subTitle: weekItem && weekItem.createdTime,
      }
    },
  },
}
</script>

<style>
.content-section {
  box-sizing: border-box;
  padding: 40px 50px;
}
.main-section {
  margin-right: 10rem;
}
.main-section .ant-list {
  padding-left: 26px;
}
.asider-section {
  background: none;
}
</style>
