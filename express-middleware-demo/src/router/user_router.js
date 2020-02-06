const express = require('express');
const router = express.Router();

//1. 中间件在路由中的使用，第一个场景，log
router.use(function(req, res, next) {
    console.log('log from router')
    next();
})

function valid_login_params(req, res, next) {
    let {name,password} = req.query;

    if(!name || !password) {
        res.json({
            message: '参数校验失败'
        })
    } else {
        req.formdata = {
            name,
            password
        }
        next();
    }
}

//2. 路由内部使用
router.get('/login', [valid_login_params/* middleware */], (req, res)=>{
    let {formdata} = req;
    res.json({
        messsage: 'from router demo',
        formdata
    })
})

router.get('/demo', [/* middleware */], (req, res)=>{
    res.json({
        messsage: 'from router demo'
    })
})

module.exports = router;