// 服务器
var express = require('express');
// 数据库
var dao = require('./db/base-dao');
var router = express(); 





/* 主页 */
router.get('/', function(req, res) {

  // 返回导航
  res.render('index', global.rootNavigation);

});


 
/*router.route('/login')
.get(function(req, res) {
    res.render('login', { title: 'ÓÃ»§µÇÂ¼' });
})
.post(function(req, res) {
    var user={
        username: 'admin',
        password: '123456'
    }
    if(req.body.username === user.username && req.body.password === user.password){
        res.redirect('/home');
    }
    res.redirect('/login');
});*/
 
// router.get('/logout', function(req, res) {
//     res.redirect('/');
// });
 
// router.get('/home', function(req, res) {
//     var user={
//         username:'admin',
//         password:'123456'
//     }
//     res.render('home', { title: 'Home', user: user });
// });
 
module.exports = router;
