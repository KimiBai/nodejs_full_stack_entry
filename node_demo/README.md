# 配置nodemon

## 将nodemon安装在开发目录， ` -D `表示安装在dev环境
` npm install nodemon -D `

## 修改package.json中的启动命令
将
` "start": "node src/app.js" `
修改为
` "start": "nodemon src/app.js"`

## 创建nodemon配置文件
nodemon.json
'''
{
    "watch": ["./src/**/*.js"]
}
'''

注意: nodemon配置文件写完之后，必须重启服务才可以应用nodemon

通过在nodemon之前添加` DEBUG=* `来启用debug log