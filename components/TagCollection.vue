<template>
  <div class="tag-collection">
    <h2>标签集合</h2>
    <div class="tag-list">
      <a-tag
        v-for="tag in tagList"
        :key="tag.id"
        class="tag-item"
        color="#108ee9"
      >
        <nuxt-link :to="/detail/ + tag.name" target="_blank">{{
          tag.name
        }}</nuxt-link>
      </a-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagCollection',
  props: {
    tagList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    onTagClick(tag) {
      this.$emit('tagClick', tag)
    },
  },
}
</script>

<style>
.tag-list .tag-item {
  margin-bottom: 6px;
  cursor: pointer;
}
</style>
