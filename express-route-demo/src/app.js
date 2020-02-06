const express = require('express');

const app = express();
//引入ruter组件
const memberRouter = require('./member.router');
const skuRouter = require('./sku.router');

//注册路由
app.use('/member', memberRouter)
app.use('/sku', skuRouter)

/*
//1. 通过请求的方法类型区分不同路由 get/post/delete/put...
app.get('/demo', (req, res)=>{
    //req: 请求对象
    //res: 服务响应对象
    res.json({
        message: 'hello express route from get demo'
    })
})

app.post('/demo', (req, res)=>{
    //req: 请求对象
    //res: 服务响应对象
    res.json({
        message: 'hello express route from post demo'
    })
})

//2. 通过uri(路径)区分不同路由
app.get('/user/byname', (req, res)=>{
    let {name} = req.query;
    res.json({
        name
    })
})

app.get('/user/byid', (req, res)=>{
    let {id} = req.query;
    res.json({
        id
    })
})
*/

/*
//app.all的使用
app.all('/all',(req, res)=>{
    res.json({
        message: "demo",
        methos: req.method
    })
})

app.all('/*',(req, res)=>{
    res.json({
        message: "demo",
        methos: req.method,
        uri:req.uri
    })
})
*/

/*
//app.use的使用
app.use('/demo', (req, res)=>{
    res.json({
        message: 'from use demo',
        method: req.method
    })
})

app.use((req, res)=>{
    res.json({
        message: 'from use demo',
        method: req.method,
        uri: req.path
    })
})
*/

app.listen(3000, ()=>{
    console.log("server started");
})