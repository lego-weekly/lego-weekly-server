import {Context} from 'koa'
import { getManager } from 'typeorm';

import { Week } from '../entity/week';

export default class WeekController {
  public static async listWeeks(ctx: Context) {
    const weekRepository = getManager().getRepository(Week);
    const weeks = await weekRepository.find();
    ctx.status = 200;
    ctx.body = weeks;
  }

  public static async addWeek(ctx: Context) {
    const weekRepository = getManager().getRepository(Week);
    const newWeek = new Week();
    const {title, week, count} = ctx.request.body
    newWeek.title = title;
    newWeek.count = count || 1;
    newWeek.week = week || 1;
    // 保存到数据库
    const savedWeek = await weekRepository.save(newWeek);
    ctx.status = 201;
    ctx.body = savedWeek;
  }

  
}
