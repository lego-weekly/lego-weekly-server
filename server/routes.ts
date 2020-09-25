import Router from '@koa/router';

import AuthController from './controllers/auth'
import UserController from './controllers/user'
import ArticleController from './controllers/article'
import CategoryController from './controllers/category'
import WeekController from './controllers/week'

const unprotectedRouter = new Router({
  prefix: '/api'
});

// auth 相关的路由
unprotectedRouter.post('/auth/login', AuthController.login);
unprotectedRouter.post('/auth/register', AuthController.register);


const protectedRouter = new Router({
  prefix: '/api'
});
// users 相关的路由
protectedRouter.post('/user/list', UserController.listUsers);
protectedRouter.get('/users/:id', UserController.showUserDetail);
protectedRouter.put('/users/:id', UserController.updateUser);
protectedRouter.delete('/users/:id', UserController.deleteUser);

// article 相关路由
protectedRouter.post('/article/add', ArticleController.addArticle);
protectedRouter.post('/article/list', ArticleController.listArticles);

// categories 相关路由
protectedRouter.post('/categories/add', CategoryController.addCategory)
protectedRouter.post('/categories/list', CategoryController.listCategories)

// week 相关路由
protectedRouter.post('/weeks/list', WeekController.listWeeks)
protectedRouter.post('/weeks/add', WeekController.addWeek)

export { protectedRouter, unprotectedRouter };
