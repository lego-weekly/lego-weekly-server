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
unprotectedRouter.post('/auth/validate', AuthController.validate)
unprotectedRouter.post('/auth/login', AuthController.login);
unprotectedRouter.post('/auth/register', AuthController.register);


const protectedRouter = new Router({
  prefix: '/api'
});
// users 相关的路由
unprotectedRouter.post('/user/list', UserController.listUsers);
unprotectedRouter.get('/users/:id', UserController.showUserDetail);
unprotectedRouter.put('/users/:id', UserController.updateUser);
unprotectedRouter.delete('/users/:id', UserController.deleteUser);

// article 相关路由
protectedRouter.post('/article/add', ArticleController.addArticle);
unprotectedRouter.post('/article/list', ArticleController.listArticles);

// categories 相关路由
unprotectedRouter.post('/categories/add', CategoryController.addCategory)
unprotectedRouter.post('/categories/list', CategoryController.listCategories)

// week 相关路由
unprotectedRouter.post('/weeks/list', WeekController.listWeeks)
unprotectedRouter.post('/weeks/add', WeekController.addWeek)

export { protectedRouter, unprotectedRouter };
