<h2 align="center"> Fe-Weekly-Server </h2>

一键投稿 chrome 插件的服务端

- 提供 `api` 接口服务
- 汇总沉淀，使用 `nuxt` 服务端实现

## 本地运行

1. 下载到本地 

```shell
git clone git@github.com:lego-weekly/lego-weekly-server.git
```

2. 安装依赖 

```shell
yarn || npm i
```

3. 运行项目 

```shell
yarn dev || npm run dev
```
> ps
> 执行命令会同时运行 server 端服务和 nuxt 项目服务。

4. 项目打包

- server build
```shell
yarn build:ts || npm run build:ts
```

- nuxt build
```shell
yarn build || npm run build
```
5. 项目部署
- server deploy
将打包好的 `dist` 目录下所以文件，上传到服务器对应的 `server` 目录下

- nuxt deploy
将 `.nuxt、nuxt.config.js、ormconfig.json、pm2.config.js、package.json、static、.env、.env.prod` 等目录上传到服务器

- 配置 nginx

`/etc/nginx/nginx.conf` 目录下

```
http{
  upstream nodenuxt {
    server 127.0.0.1:8000; # nuxt 项目监听PC端端口
    keepalive 64;
  }
  server {
    listen 80;
    server_name  www.xxx.xyz; # 域名

	  location / {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_cache_bypass $http_upgrade;
        proxy_pass http://nodenuxt;
    }

	  location /api/ {
      proxy_pass http://127.0.0.1:6699; # 接口
      proxy_http_version  1.1;
      proxy_cache_bypass  $http_upgrade;
      proxy_set_header Upgrade      $http_upgrade;
      proxy_set_header Connection     "upgrade";
      proxy_set_header Host       $host;
    }

    error_page   500 502 503 504  /50x.html;
      location = /50x.html {
          root   html;
      }
  }
}
```

- 运行

执行 `npm install` 安装依赖

执行 `npm run start:prod` 运行项目

- 定时任务

> PS: 定时任务使用 linux 内置的cron进程

执行 ```crontab -e``` 新增定时任务,在文件中增加下面记录

```
0 15 * * 5 curl http://www.xxx.com/api/week/add -X POST 
```
每周五下午3点定时调用 `server` 端提供的接口, 将本周投稿进行汇总成周报



## TODO

**计划中**

- [ ] 自动化部署
- [ ] ...


## License

[MIT](http://opensource.org/licenses/MIT) License - Copyright (c) 2020 yangjay。


