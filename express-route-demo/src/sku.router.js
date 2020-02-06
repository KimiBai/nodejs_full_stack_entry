const express = require('express');
const router = express.Router();

router.get('/list', (req, res)=>{
    res.json({
        list:[
            {
                id: 2,
                price: 200,
                name: 'shose'
            }
        ]
    })
})

module.exports = router;//将路由组件暴露出去