const express = require('express');

const userRouter = require('./router/user_router')
const app = express();


function log_middleware(req, res, next) {
    console.log("request coming...")
    next();
}

app.use(log_middleware);

app.use('/user', userRouter);

/*
//加载一个static的中间件
app.use(express.static('static', {
    extensions:['html','htm']
}))

//中间件完整的结构
//1. 是一个函数
//2. err,req,res,next-->function

function demo_middleware(err, req, res, next) {
    //1. 异常处理
    //2. 处理业务功能，然后转交控制权->next
    //3. 响应请求-->结束响应-->当作路由的处理函数
}

//test ?name=23132
function valid_name_midd(req, res, next) {
    let {name} = req.query;

    if (!name || !name.length) {
        res.json({
            message: "缺少name参数"
        })
    } else {
        next();
    }
}

// STEP 1
app.all('*', valid_name_midd)

// STEP 2
//route
app.get('/test', (req, res)=>{
    res.json({
        message: 'test'
    })
})
*/

app.listen(3000, ()=>{
    console.log('server started')
})