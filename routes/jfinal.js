// 服务器
var router = require('./index');
/* JFinal 网站*/
router.get('/jfinal', function(req, res) {

  	res.redirect('/');
});