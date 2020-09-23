import {Context} from 'koa'
import { getManager } from 'typeorm';

import { Article } from '../entity/article';
import { Categories } from '../entity/categories';

export default class ArticleController {
  public static async listArticles(ctx: Context) {
    const articleRepository = getManager().getRepository(Article);
    const categoriesRepository = getManager().getRepository(Categories);
    let {id, type} = ctx.request.body
    let query = {}
    if (type === 'tag') {
      let tagList = await categoriesRepository.find({ name: id });
      const tagItem = tagList.filter(item => !!item.parentId)
      query = tagItem && {tag: tagItem[0].id}
    } else {
      query = {weekId: +id}
    }
    const articles = await articleRepository.find(query);
    ctx.status = 200;
    ctx.body = articles;
  }

  public static async addArticle(ctx: Context) {
    const articleRepository = getManager().getRepository(Article);
    const newArticle = new Article();
    newArticle.title = ctx.request.body.title;
    newArticle.description = ctx.request.body.description;
    newArticle.link = ctx.request.body.link;
    newArticle.tag = ctx.request.body.tag;
    newArticle.user = ctx.request.body.user;

    // 保存到数据库
    const article = await articleRepository.save(newArticle);
    ctx.status = 201;
    ctx.body = article;
  }

  public static async updateArticle(ctx: Context) {
    
  }
}
