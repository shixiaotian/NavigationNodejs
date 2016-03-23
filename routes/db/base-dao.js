// 数据库配置
var mysql = require('mysql')
, mysqlConfig = require('../../config/data-resource.json');

// var machineNo = "nodejs_1";

var dao = {
	version : "0.0.1"
	/**
	* 查询nodejs服务器导航信息
	**/
	, getNavigation : function(callback, type) {
		// 数据库实际使用对象
		var db = mysql.createClient(mysqlConfig);
		var result;
		// 查询
		db.query("select distinct " 
			+ "a.base_internation_name name, a.base_internation_describe describer, b.base_web_navigation_url url " 
			+ "from base.base_internation a left join base.base_web_navigation b "
			+ "on a.base_internation_id = b.base_web_navigation_name_id "
			+ "where b.base_web_navigation_onwer='"+ type +"' "
			+ "and b.delete=0 "
			+ "and a.delete=0" 
			, function(err, results) {
				// 关闭连接
				db.end();
				// 回调
				if(results  == null) {
					results = {};
				}
				callback(results);
				
				}

			);
		
	}
	/* 查询全部 伪dns */
	, getAllDNS : function(callback) {

		// 数据库实际使用对象
		var db = mysql.createClient(mysqlConfig);
		db.query("select distinct " 
			+ "a.base_dns_id id, " 
			+ "a.base_dns_code code, "
			+ "a.base_dns_name name, "
			+ "a.base_dns_url url "
			+ "from base.base_dns a "
			+ "where a.delete=0" 
			, function(err, results) {
				// 关闭连接
				db.end();
				
				if(results  == null) {
					results = {};
				}
				// 回调
				callback(results);
				}
			);
	}
	/* 查询编码的 伪dns */
	, getDNSByCode : function(callback, code) {

		// 数据库实际使用对象
		var db = mysql.createClient(mysqlConfig);
		// 查询参数
		var para = [code];
		// 查询数据
		db.query("select distinct " 
			+ "a.base_dns_id id, " 
			+ "a.base_dns_code code, "
			+ "a.base_dns_name name, "
			+ "a.base_dns_url url "
			+ "from base.base_dns a "
			+ "where a.delete=0 " 
			+ "and a.base_dns_code = ?"
			, para
			, function(err, results) {
				// 关闭连接
				db.end();
				
				if(results  == null) {
					results = {};
				}
				// 回调
				callback(results);
				}
			);
	} 
	, getAllState : function(callback, code) {

		// 数据库实际使用对象
		var db = mysql.createClient(mysqlConfig);
		// 查询数据
		db.query("select distinct " 
			+ "a.base_state_id id, " 
			+ "a.base_state_name name, "
			+ "a.base_state_value value "
			+ "from base.base_state a "
			+ "where a.delete=0 " 
			, function(err, results) {
				// 关闭连接
				db.end();
				
				if(results  == null) {
					results = {};
				}
				// 回调
				callback(results);
				}
			);
	} 
	, getAllUser : function(callback) {

		// 数据库实际使用对象
		var db = mysql.createClient(mysqlConfig);
		// 查询数据
		db.query("select distinct " 
			+ "a.cust_user_id id, " 
			+ "a.cust_user_account_email email, "
			+ "a.cust_user_account_phone phone, "
			+ "a.cust_user_password password "
			+ "from cust.cust_user a "
			+ "where a.delete=0 " 
			, function(err, results) {
				// 关闭连接
				db.end();
				
				if(results  == null) {
					results = {};
				}
				// 回调
				callback(results);
				}
			);
	} 

}

module.exports = dao;
