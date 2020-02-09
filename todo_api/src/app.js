const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const models = require('../db/models')

/*
{
    [model:Todo],
    sequelize,
    Sequelize
}
*/

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded());

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// 1. 所有的错误， http status == 500

/**
 * 创建一个Todo
*/
app.post('/create', async (req, res, next)=>{
    try {
        let { name, deadline, content } = req.body;
        //数据持久化到数据库
        let todo = await models.Todo.create({
            name,
            deadline,
            content
        })

        res.json({
            todo,
            message: '任务创建成功'
        })
    } catch (error) {
        next(error)
    }
})

/**
 * 修改一个Todo
*/
app.post('/update', async (req, res, next)=>{
    try {
        let { name, deadline, content, id } = req.body;

        let todo = await models.Todo.findOne({
            where:{
                id
            }
        })

        if (todo) {
            //执行更新的功能
            todo = await todo.update({
                name,
                deadline,
                content
            })
        }

        res.json({
            todo
        })
    } catch (error) {
        next(error)
    }
})

/**
 * 修改,删除一个Todo
*/
app.post('/update_status', async (req, res, next)=>{
    try {
        let { id, status } = req.body;

        let todo = await models.Todo.findOne({
            where:{
                id
            }
        })

        if (todo && status != todo.status) {
            //执行更新
            todo = await todo.update({
                status
            })
        }

        res.json({
            todo
        })
    } catch (error) {
        next(error)
    }
})

/**
 * 查询任务列表
*/
app.get('/list/:status/:page', async (req, res, next)=>{
    //1. 状态 1-待办 2-完成 3-删除 -1-全部
    //2. 分页的处理

    try {
        let {status, page} = req.params;
        let limit = 10;
        let offset = (page - 1) * limit;
        let where = {};

        if (status != -1) {
            where.status = status;
        }

        let list = await models.Todo.findAndCountAll({
            where,
            offset,
            limit
        })

        res.json({
            list,
            message: '列表查询成功'
        })
    } catch (error) {
        next(error)
    }
})

app.use((err, req, res, next)=>{
    if (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

app.listen(3001, ()=>{
    console.log('server started');
})