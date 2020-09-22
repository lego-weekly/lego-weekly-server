module.exports = {
  apps: [
    {
      name: 'weekly-server', // 项目名称
      cwd: './', // 当前工作路径
      script: './node_modules/nuxt/bin/nuxt.js', // 或者可以直接执行这个脚本
      args: 'start', // 参数
      env: {
        NODE_ENV: 'development',
        API_URL_BROWSER: 'http://localhost:3000',
        API_URL: 'http://localhost:3000/api',
      },
      env_production: {
        NODE_ENV: 'production',
        API_URL_BROWSER: 'http://www.yangjay.xyz',
        API_URL: 'http://www.yangjay.xyz/api',
      },
      min_uptime: '60s', // 应用运行少于时间被认为是异常启动
      watch: ['.nuxt', 'nuxt.config.js'], // 监控变化的目录
      ignore_watch: ['node_modules'], // 从监控目录中排除
    },
  ],
}
