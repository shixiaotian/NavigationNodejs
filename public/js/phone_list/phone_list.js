/**
 * Created by Administrator on 2015/7/3.
 */


/**
 * 专用工具
 *
 * @type {{}}
 */
var rl = {
    version : "0.0.1",
    /**
     * 判断公司类型
     *
     * @param orgTypeId 组织类型编号
     */
    getCompanyType : function (orgTypeId) {

        switch (orgTypeId){

            case 1:return "货主";break;
            case 2:return "物流公司";break;
            default :return "未知";

        }
    },
    /**
     * 获取页面参数方法
     *
     * @param sProp 要查询的参数名称
     * @returns {*}
     * @constructor
     */
    getQueryString : function (sProp) {
        var re = new RegExp("[&,?]"+sProp + "=([^//&]*)", "i");
        var a = re.exec(document.location.search);
        if (a == null)
            return "";
        return a[1];
    },
    /**
     * ajax请求异常
     */
    ajaxError : function () {
        alert("未能获取数据");
    },
    /**
     * 获取等级
     * 20 等级制
     *
     * @param level 等级数
     * @param star 1-5
     * @param moon 6-10
     * @param sun 11-15
     * @param crown 16-20
     */
    getLevel : function(level) {
        var star = "<i class='ico-star'></i>";
        var moon = "<i class='ico-moon'></i>";
        var sun = "<i class='ico-sun'></i>";
        var crown = "<i class='ico-crown'></i>";
        //返回字符串
        var result = "";
        //星星
        if(level > 0 && level <= 5 ) {
            for (var i = 0; i < level; i++) {
                result = result + star;
            }
        }
        //月亮
        if(level > 5 && level <= 10 ) {
            for (var i = 5; i < level; i++) {
                result = result + moon;
            }
        }
        //太阳
        if(level > 10 && level <= 15 ) {
            for (var i = 10; i < level; i++) {
                result = result + sun;
            }
        }
        //皇冠
        if(level > 15 && level <= 20 ) {
            for (var i = 15; i < level; i++) {
                result = result + crown;
            }
        }
        return result;
    }
}
