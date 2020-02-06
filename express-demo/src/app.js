const express = require('express');

//是一个express的实例
const app = express();

/*app.use((req, res)=>{
    res.json({
        name:"zhangsan"
    })
})*/

//http://120.0.0.1:3000/name
/*app.get('/name', (req, res)=>{
    res.send('Tom GET');
})*/

//http://120.0.0.1:3000/name/20
app.get('/name/:age', (req, res)=>{
    let {age} = req.params;
    res.json({
        name:'Tom',
        age
    })
})

app.post('/name', (req, res)=>{
    res.send('Tom POST');
})

app.listen(3000, ()=>{
    console.log("server started");
})