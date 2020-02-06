const express = require('express');
const app = express();

const models = require('../models');//模型对象
//models.User - 访问User对象
//models.Sequelize - 访问Sequelize静态化的属性
//models.sequelize - 访问Sequelize实例

//http://127.0.0.1:3000/create?name=Tom
app.get('/create', async (req, res)=>{
    let {name} = req.query;

    // promise user --> sequelize 对象
    let user = await models.User.create({
       name
    })
    console.log(user);
    res.json({
        message: '创建成功',
        user
    })
})

//http://127.0.0.1:3000/list
app.get('/list', async (req, res)=>{
    let list = await models.User.findAll();
    res.json({
        list
    })
})

//http://127.0.0.1:3000/detail/1
app.get('/detail/:id', async (req, res)=>{
    let {id} = req.params;

    let user = await models.User.findOne({
        where: {
            id
        }
    });

    res.json({
        user
    })
})

app.listen(3000, ()=>{
    console.log('server started');
})