import { genPostReq } from './http'

const mainAPI = {
  getWeekList: genPostReq('/weeks/list'),
  getTagList: genPostReq('/categories/list'),
  getArticleList: genPostReq('/article/list'),
}

export default {
  ...mainAPI,
}
