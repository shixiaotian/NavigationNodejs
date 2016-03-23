// 服务器
var router = require('./index');
// 数据库
var dao = require('./db/base-dao');
// 加密模块
var crypto = require('crypto');

 /* nodejs 网站*/
router.get('/nodejs', function(req, res) {
  
  res.render('nodejs-index', global.nodejsNavigation);

});  

/* 个人介绍 */

/* 状态服务 */
router.get('/nodejs/state/all', function(req, res) {

  dao.getAllState(function(data) {

    // 与导航绑定
    global.nodejsNavigation['state'] = (data);;
   
    // 渲染页面
    res.render('nodejs-state', global.nodejsNavigation);

  });  

});
/* 伪DNS服务 */
/* 获取数据库中全部的 DNS 信息*/
router.get('/nodejs/dns/all/current', function(req, res) {

  dao.getAllDNS(function(data) {

    // 刷新 DNS
    global.dns['dnss'] = data;
    // 与导航绑定
    global.nodejsNavigation['dnss'] = data;
    // 提示更新缓存
    console.log("伪DNS 缓存更新");

    res.render('nodejs-dns', global.nodejsNavigation);

  });  

});
/* 获取缓存中的 DNS 信息 */
router.get('/nodejs/dns/all', function(req, res) {

    // 与导航绑定
    global.nodejsNavigation['dnss'] = dns.dnss;
    res.render('nodejs-dns', global.nodejsNavigation);

});

/* 获取数据库中指定code的 DNS 信息 */
router.get('/nodejs/dns/:code', function(req, res) {

 	var code = req.params.code;

 	 dao.getDNSByCode(function(data) {

 	 	var results = { code:200,data:data };
	    res.json(results);

  	},code);  

});

/* 登录 */
router.get('/nodejs/login', function(req, res) {

    var tag = 'nodejs-login';
    if(req.session.user) {
        tag = 'nodejs-index';
    }

    res.render(tag, global.nodejsNavigation);
});

router.post('/nodejs/login', function(req, res) {

  var account = req.body.username;
  var password = req.body.password;
  var user = req.session.user;

  authenticate(user, account, password, function (err, user) {
        if (user) {

            // req.session.regenerate(function () {

                req.session.user = user;
                req.session.success = 'Authenticated as ' + user.username + ' click to <a href="/logout">logout</a>. ' + ' You may now access <a href="/restricted">/restricted</a>.';
                res.redirect('/nodejs');
            // });
        } else {
            // req.session.error = '登录失败，请检查 ' + ' 用户名和密码。';
            res.redirect('/nodejs/login');
        }

    });

});

router.get('/nodejs/logout', function(req, res) {

    req.session.user = null;
    res.redirect('/nodejs');
});

/* 检查权限 */
function authenticate(user, account, password, callback) {


  users.users.forEach(function(e){
      console.log(e);
    //判断账号是否正确
    if(account == e.email || account == e.phone) {
      // 判断密码是否相同
      var sha1Password = sha1(password);
      console.log(sha1Password);
      console.log(e.password);
      if(sha1Password == e.password) {

        user = e;
        console.log(user);
      }
    // 进行毁掉
    callback(new Error(), user);
    return ;

    }     

  });

}


/* 临时使用的sha1加密 */
function sha1(str) {


  var md5sum = crypto.createHash('sha1');
  md5sum.update(str, 'utf8');
  str = md5sum.digest('hex');

  return str;

}