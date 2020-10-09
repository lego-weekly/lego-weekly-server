import { Context } from 'koa';
import * as argon2 from 'argon2';
import { getManager } from 'typeorm';
import { User } from '../entity/user';
import { UserPayload } from "../typings/jwt";
import jwt from 'jsonwebtoken';

export default class AuthController {
  public static async validate(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const { authorization } = ctx.request.headers;

    if (authorization) {
      const token = authorization.split(" ")[1];
      if (token) {
        const payload: UserPayload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as UserPayload
        const user = await userRepository.findOne({id: payload.id });
        if (user) {
          ctx.status = 200;
          ctx.body = user;
        } else {
          ctx.status = 401;
          ctx.body = { data: {error: '用户不合法!' }};
        }
      } else {
        ctx.status = 401;
        ctx.body = { data: {error: 'token未提供!' }};
      }
    } else {
      ctx.status = 401;
      ctx.body = { data: {error: 'authorization未提供!' }};
    }
  }
  public static async login(ctx: Context) {
    const userRepository = getManager().getRepository(User);

    const user = await userRepository
      .createQueryBuilder()
      .where({ email: ctx.request.body.email })
      .addSelect('User.password')
      .getOne();
      if (!user) {
        ctx.status = 401;
        ctx.body = { data: {error: '用户名不存在' }};
      } else if (await argon2.verify(user.password, ctx.request.body.password)) {
        ctx.status = 200;
        // 设置1年过期时间
        ctx.body = {
          data: {
            token: jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY!, { expiresIn: '30days' })
          }
        };
      } else {
        ctx.status = 401;
        ctx.body = {data:{ error: '密码错误' }};
      }
  }

  public static async register(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const existUser = await userRepository.findOne({email: ctx.request.body.email})
    if(existUser) {
      ctx.status = 400;
      ctx.body = {
        data: {
          error: '该用户已存在'
        }
      };
    } else {
      const newUser = new User();
      newUser.name = ctx.request.body.name;
      newUser.email = ctx.request.body.email;
      newUser.password = await argon2.hash(ctx.request.body.password);

      // 保存到数据库
      const user = await userRepository.save(newUser);
      ctx.status = 201;
      ctx.body = user;
    }
  }
}
