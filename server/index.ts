import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { createConnection } from 'typeorm'
import 'reflect-metadata'
import jwt from 'koa-jwt';
import { JWT_SECRET } from './constants';
import { protectedRouter, unprotectedRouter } from './routes';
const server = require('koa-static');
const path = require('path')



createConnection()
  .then(() => {
    // 初始化 Koa 应用实例
    const app = new Koa()

    // 注册中间件
    app.use(cors())
    app.use(bodyParser())

    // 静态资源服务
    app.use(server(path.resolve(process.cwd(), "./static/")))
    // 无需 JWT Token 即可访问
    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());
    // 注册 JWT 中间件
    app.use(jwt({ secret: JWT_SECRET }));
    // 需要 JWT Token 才可访问
    app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

    // 运行服务器
    app.listen(3000)
  })
  .catch((err: string) => console.log('TypeORM connection error:', err))
