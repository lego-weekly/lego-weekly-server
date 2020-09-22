export const state = () => ({
  weekList: [],
  tagList: [],
  articleList: [],
})

export const mutations = {
  setWeekList(state, payload) {
    state.weekList = [...payload]
  },
  setTagList(state, payload) {
    state.tagList = [...payload]
  },
  setArticleList(state, payload) {
    state.articleList = [...payload]
  },
}

export const actions = {
  async fetchWeekList({ commit }) {
    const resData = await this.$axios.$post(`/weeks/list`)
    if (resData && resData.length) {
      commit('setWeekList', resData)
    } else {
      // console.log('error')
    }
  },
  async fetchTagList({ commit }) {
    const resData = await this.$axios.$post(`/categories/list`)
    if (resData && resData.length) {
      commit('setTagList', resData)
    } else {
      // console.log('error')
    }
  },
  async fetchArticle({ commit }, params) {
    // this.$axios.$post()
    const resData = await this.$axios.$post(`/article/list`, {
      ...params,
    })
    if (resData && resData.length) {
      commit('setArticleList', resData)
    } else {
      // console.log('error')
    }
  },
}
