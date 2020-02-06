const express = require('express');

const router = express.Router();

/* router使用方法和app一样
router
    .[method]//get/post
    .all
    .use
    */

router.get('/list', (req, res)=>{
    res.json({
        list:[
            {
                id: 1,
                name: 'lisi'
            }
        ]
    })
})

module.exports = router;//将路由组件暴露出去