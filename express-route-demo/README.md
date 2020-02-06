## 路由Route


## web服务如何处理一个请求

url-->网络-->dns解析-->目标服务器

如何响应这个请求-->路由//规则

### 请求的方法来区分

1. GET
2. POST

### 通过uri（路径）
e.g. ` www.baidu.com/a/b/c.html `
其中` /a/b/c.html `就是uri


## app.all
1. 需要定义一个api/路由需要满足客户端无论使用什么请求方式(get/post/delete/put)都可以得到响应

```javascript
app.all('/demo', (req, res)=>{})
```

2. 无论客户端使用任何uri，我们的服务器都可以得到响应

典型的使用场景就是日志

```javascript
app.all('*', (req, res)=>{})
```

## app.use
可以实现app.all实现的两种场景

```javascript
app.use('/demo', (req, res))=>{})
```

```javascript
app.use((req, res)=>{})
```

注意： app.use常用作中间件的使用

## 路由的拆分

### member
### sku
### order

```javascript
express.Router
```