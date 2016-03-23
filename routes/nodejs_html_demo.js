// 服务器
var router = require('./index');

// 页面地址
router.get('/nodejs/html-demo', function(req, res) {

    // 渲染页面
    res.render('nodejs-html-demo', global.nodejsNavigation);

  });  

