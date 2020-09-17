import Router from '@koa/router';

import AuthController from './controllers/auth'
import UserController from './controllers/user'
import ArticleController from './controllers/article'
import CategoryController from './controllers/category'
import WeekController from './controllers/week'

const router = new Router();

// auth 相关的路由
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);

// users 相关的路由
router.post('/user/list', UserController.listUsers);
router.get('/users/:id', UserController.showUserDetail);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

// article 相关路由
router.post('/article/add', ArticleController.addArticle);
router.post('/article/list', ArticleController.listArticles);

// categories 相关路由
router.post('/categories/add', CategoryController.addCategory)
router.post('/categories/list', CategoryController.listCategories)

// week 相关路由
router.post('/weeks/list', WeekController.listWeeks)
router.post('/weeks/add', WeekController.addWeek)

export default router;