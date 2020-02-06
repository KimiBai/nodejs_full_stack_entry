# Todo

## 需求说明， API说明
1. 根据客户端传递过来的不同的参数（状态/页码）查询任务列表
2. 实现新增一个任务的功能（名称/截止日期/内容）
3. 实现一个编辑功能：根据客户端传递的任务对象（已经存在的数据）进行编辑，（名称/截止日期/内容/ID）
4. 删除一个任务（ID）
5. 修改任务的状态（ID/状态--待办/完成）

## API实现


### 数据库的初始化

1. 创建一个数据库
2. 使用`sequelize cli`初始化项目的数据库配置信息

    ` npx sequelize init `

3. 生成模型文件

    3.1. migrate文件

    3.2. model文件

    ` npx sequelize model:generate --name Todo --attributes name:string,deadline:date,content:string `

4. 持久化, 模型对应的数据库表

    ` npx sequelize db:migrate `

### API里面具体使用ORM模型



## 项目的发布和运维
### pm2
批量管理应用

1. pm2安装

    ` npm install pm2 -g `

2. pm2初始化

在项目目录中执行

    ` pm2 init `

生成

```
ecosystem.config.js
```

3. 启动程序

    以前我们启动服务使用`npm start`，现在可以使用pm2启动

    ` pm2 start ecosystem.config.js `

```
┌────┬───────────┬──────────┬────┬───────────┬──────┬──────────┐
│ id │ name      │ mode     │ ↺  │ status    │ cpu  │ memory   │
├────┼───────────┼──────────┼────┼───────────┼──────┼──────────┤
│ 0  │ todo_api  │ cluster  │ 0  │ online    │ 0%   │ 34.6mb   │
└────┴───────────┴──────────┴────┴───────────┴──────┴──────────┘
```

运维不需要知道服务怎样去跑的，只需要知道 启动命令/运维命令/运维文档 就可以了
1. 启动命令

    ` pm2 start ecosystem.config.js `

2. 查看log

    ` pm2 log `

3. 重启服务

    ` pm2 restart ecosystem.config.js `
