# ORM

## 安装Sequelize
` npm install sequelize -S `
sequelize-cli(The Sequelize Command Line Interface (CLI))，帮助我们使用
` npm install sequelize-cli -S `

## 初始化Sequelize
` npx sequelize-cli init `

.
├── config
    └── config.json
├── migrations - 数据库迁移文件
├── models - 每个model会跟数据库中的表关联
...
├── seeders - 初始化脚本（比如有些数据在系统初始化时就需要初始化到数据库中去）
...

## 创建一个模型
` npx sequelize-cli model:generate --name User --attributes name:string `
这条命令将创建一个名叫User的模型，其中有一个叫做name的属性。同时在migrations目录下也会创建一个文件，这个文件用来创建表。

## 安装mysql数据库驱动
` npm install mysql2 -S `

node-application --> ORM(Sequelize) --> 驱动(node-mysql) --> mysql db

## 创建数据库表

` npx sequelize-cli db:migrate `
其中还可以添加参数--env,用来表明当前使用那个环境。
默认选择production环境，在开发过程中将其指定为开发环境

` npx sequelize-cli db:migrate --env=development`
