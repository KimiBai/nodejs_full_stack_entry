module.exports = {
  apps : [{
    name: 'todo_api', // 应用在pm2管理中的名称
    script: 'src/app.js', // 启动或重新启动时的脚本文件

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    instances: 1, // 启动的实例的个数
    autorestart: true, // 当我们的服务发生异常时，pm2帮我们重启
    watch: false, // 开发环境可以打开，生产环境必须关掉
    max_memory_restart: '1G', // 防止内存溢出
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
