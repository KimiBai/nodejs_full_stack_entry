const express = require('express');

const userRouter = require('./router/user_router');
const app = express();

app.use(userRouter)

app.get('/demo', [demo_middleware], (req, res)=>{
    //自定义异常
    //throw new Error('测试功能异常');
    
    //res.json({
    //    message
    //})
})

//异常处理在中间件中的使用
function demo_middleware(req, res, next) {
    try {
        // mysql操作
        throw new Error('测试中间件异常');
    } catch (error) {
        next(error)
    }

    // Promise.then().catch(next)
}

// tips: 异常处理一定是收口的。就是所有异常处理尽可能的放在同一个地方。

function error_handler_middleware(err, req, res, next) {
    if (err) {
        let {message} = err;
        res
        .status(500)
        .json({
            message: `${message || '服务器异常'}`
        })

    } else {

    }
}
//404错误处理
function not_found_handler_middleware(req, res, next) {
    res.json({
        message: 'API不存在'
    })
}

//异常处理要放在所有路由的最后面，因为它是链式的业务
app.use(error_handler_middleware)
app.use(not_found_handler_middleware)

app.listen(3000, ()=>{
    console.log('server started');
})