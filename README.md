# Nodejs全栈入门

1. 实现一个web服务，提供标准的API服务
2. 了解js在服务器段的基本知识
3. 基本的mysql管理知识
4. 了解ORM以及相关框架的使用
5. 了解基本的web服务运维相关的知识

# nodemon
自动重启server，当发现监听文件有变化是帮我们自动重启server

## 将nodemon安装在开发目录， ` -D `表示安装在dev环境
` npm install nodemon -D `

## nrm
nrm用来管理node源

### 通过npm安装, ` -g `安装在全局目录
` npm install nrm -g `

### 切换源
` nrm use taobao `

## nvm
管理不同版本的nodejs

> https://github.com/nvm-sh/nvm


Web应用

前端
(ajax,ws)-->服务器(Web应用)-->缓存/数据库

## experss
接受req，处理res
express是node中一种Web框架

# 课程回顾

1. 技术栈
    1.1. node --> http, 异常
    1.2. web框架，express,hapi,koa,egg
    1.3. 参数校验
    1.4. mysql的使用
    1.5. ORM， sequelize的使用

2. 技术的关键点
    2.1. api的使用流程
        web-->webserver-->router-->hander-->orm-->db
3. 注意事项
    3.1. demo，真实开发中，需要做详细的模型设计-->模型之间的关系
    3.2. api的使用文档-->api文档的使用工具
    3.3. 测试，获取测试用例并严格的跑一遍
