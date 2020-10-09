import { Context } from 'koa'
import { getManager, Between } from 'typeorm'
import { subWeeks, format, isThisMinute } from 'date-fns'
const path = require('path')
const postMessage = require('../utils/postEmail')
const downloadImg = require('../utils/download')

import { Article } from '../entity/article';
import { Week } from '../entity/week';
import { Categories } from '../entity/categories';
import { User } from '../entity/user'

// const AfterDate = (date: Date) => Between(date, addWeeks(date, 1))
const BeforeDate = (date: Date) => Between(subWeeks(date, 1), date);

export default class WeekController {
  public static async listWeeks(ctx: Context) {
    const weekRepository = getManager().getRepository(Week)
    const weeks = await weekRepository.find()
    let domain = process.env.DOMAIN || `${ctx.request.protocol}://${ctx.request.headers.host}`;
    const weekList = weeks.map(item => {
      return {
        id: item.id,
        week: item.week,
        title: item.title,
        image: `${domain}/images/${item.image}`,
        createdTime: format(item.createdTime, 'yyyy-MM-dd'),
      }
    }).sort((a, b) => b.week -a.week)
    ctx.status = 200
    ctx.body = weekList
  }

  public static async addWeek(ctx: Context) {
    const weekRepository = getManager().getRepository(Week)
    const articleRepository = getManager().getRepository(Article)
    const categoriesRepository = getManager().getRepository(Categories);
    const userRepository = getManager().getRepository(User)
    const existCount = await weekRepository.count()
    const users = await userRepository.find()
    const userEmails = users && users.map(it => it.email)
    const article = await articleRepository.find({
      where: {
        createdTime: BeforeDate(new Date()),
      }
    })
    const tagIds = article ? article.map(_ => _.tag) : []
    const tagList = await categoriesRepository.findByIds(tagIds);
    const newWeek = new Week()
    newWeek.title = `Gt Fe前端小报第${existCount + 1}期`
    newWeek.week = existCount + 1
    newWeek.image = `${existCount + 1}.jpg`
    newWeek.articleIds = article.length ? article.map((it) => it.id) : []
    // // 保存到数据库
    const savedWeek = await weekRepository.save(newWeek)
    // 更新 article 的 week
    const newArticle = article && article.map(item => {
      return {...item, weekId: newWeek.id}
    })
    await articleRepository.save(newArticle)
    await downloadImg({}, path.resolve(process.cwd(), `./static/images/${newWeek.image}`))
    const postWeek = {
      title: newWeek.title,
      week: newWeek.week,
      createdTime: format(newWeek.createdTime, 'yyyy-MM-dd'),
      articles: article.map(({tag, title, link}) => {
        const tagItem = tagList.find(it => it.id === tag)
        return {
          title,
          link,
          tagName: tagItem && tagItem['name']
        }
      }),
      emails: userEmails
    }
    await postMessage(postWeek)
    ctx.status = 201
    ctx.body = savedWeek
  }
}
