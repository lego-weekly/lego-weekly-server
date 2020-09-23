import {Context} from 'koa'
import { getManager } from 'typeorm';

import { Categories } from '../entity/categories';

export default class CategoryController {
  public static async listCategories(ctx: Context) {
    const categoriesRepository = getManager().getRepository(Categories);
    const categories = await categoriesRepository.find();
    ctx.status = 200;
    ctx.body = categories;
  }

  public static async addCategory(ctx: Context) {
    const categoriesRepository = getManager().getRepository(Categories);
    const newCategory = new Categories();
    const {name, description, link, count, parentId} = ctx.request.body
    newCategory.name = name;
    newCategory.description = description;
    newCategory.link = link;
    newCategory.count = count || null;
    newCategory.parentId = parentId || null;

    // 保存到数据库
    const tag = await categoriesRepository.save(newCategory);
    ctx.status = 201;
    ctx.body = tag;
  }
}
