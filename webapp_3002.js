// 
var express = require('express');
//
var path = require('path');
//
var favicon = require('static-favicon');
//
var logger = require('morgan');
//
var cookieParser = require('cookie-parser');
//
var bodyParser = require('body-parser');

// controller
// 主页
var routes = require('./routes/index');
// nodejs站点页面
var nodejs = require('./routes/nodejs');
// jfinal站点
var jfinal = require('./routes/jfinal');
// html 例子
var htmlDemo = require('./routes/nodejs_html_demo');

// 数据库
var dao = require('./routes/db/base-dao');
 
var app = express();
 
// 绑定视图路径
app.set('views', path.join(__dirname, 'views'));
// 指定页面模板后缀
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.session({
secret : 'fens.me',

cookie: { maxAge: 900000 }
}));


console.log(path.join(__dirname, 'public'));
// 应用控制器
app.use('/', routes);
app.use('/nodejs', nodejs);
app.use('/nodejs/html-demo', htmlDemo);
app.use('/jfinal', jfinal);



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('未能找到');
    err.status = 404;
    next(err);
});
 
/// error handlers
 
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
 
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
 
// 启动监听
var server = app.listen(3002, function() {
    console.log('监听端口 %d', server.address().port);
});

// 全局数据

// 缓存 根 页导航
console.log("--------------- 开始加载基础数据 ---------------");

dao.getNavigation(function(data) {

  // 绑定导航
  global.rootNavigation = {'navigation':data};
  console.log("根     导航加载完毕");

  }, "nodejs_r"); 

// 缓存 nodejs 页导航
dao.getNavigation(function(data) {

  // 绑定导航
  global.nodejsNavigation = {'navigation':data};
  console.log("nodejs 导航加载完毕");

}, "nodejs"); 

// 缓存 伪dns 
dao.getAllDNS(function(data) {

    global.dns = {'dnss': data};
    console.log("伪DNS 加载完毕");

  });  


// 缓存用户账户密码
dao.getAllUser(function(data) {

    global.users = {'users': data};
    console.log("用户数据缓存 加载完毕");

  });
 
module.exports = app;
