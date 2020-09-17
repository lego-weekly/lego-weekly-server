import {Context} from 'koa'
import { getManager } from 'typeorm';

import { Article } from '../entity/article';

export default class ArticleController {
  public static async listArticles(ctx: Context) {
    const articleRepository = getManager().getRepository(Article);
    const {week, tag} = ctx.request.body
    const query = week ? {week} : (tag ? {tag} : {})
    const articles = await articleRepository.find(query);
    ctx.status = 200;
    ctx.body = articles;
  }

  public static async addArticle(ctx: Context) {
    const articleRepository = getManager().getRepository(Article);
    const newArticle = new Article();
    console.log('111', ctx.request.body);
    newArticle.title = ctx.request.body.title;
    newArticle.description = ctx.request.body.description;
    newArticle.link = ctx.request.body.link;
    newArticle.tag = ctx.request.body.tag;
    newArticle.user = ctx.request.body.user;
    newArticle.week = ctx.request.body.week || 1;

    // 保存到数据库
    const article = await articleRepository.save(newArticle);
    ctx.status = 201;
    ctx.body = article;
  }
}