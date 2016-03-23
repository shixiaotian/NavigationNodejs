/**
 * Created by 石啸天 on 2015/6/15.
 */

$(function(){
    var groupUrl = "list/truck_group";
    var stateUrl = "list/truck_group_state";
    var listUrl = "list/truck_group_list";
    var certDetailUrl = "certDetail"
    var unCertDetailUrl = "unCertDetail"
    //获取页面url参数
    var groupId = rl.getQueryString("groupId");
    if(groupId == null || groupId =="") {
        groupId =0;
    }
    var authentication = rl.getQueryString("authentication");
    if(authentication == null || authentication =="") {
        authentication =0;
    }
    //初始化页面
    initListPage(groupUrl ,stateUrl ,listUrl ,certDetailUrl ,unCertDetailUrl,groupId ,authentication);




});

/**
 * 拼装页码
 *
 */
function makeItemString(detailUrl,truckId,truckRoleType,truckCode,driver,truckGroup,truckPlatformDynamic,truckCertStatus,Width,tonnage,truckModel,truckRunningType) {
    //拼装星星之前的页面
    var state="";
    //尾部按钮
    var itemBottom="";
    //如果停运
    if(truckRunningType == 2) {

        state="停运";
        itemBottom = ""+
            "<p class='list-ft'>" +
//            "<a href='' class='btn btn-default'>发起会话</a>" +
//            "<a href='' class='btn btn-default'>编辑车辆</a>" +
//            "<a href='' class='btn btn-org'>派车</a>" +
            "</p>"+
            "</li></a>"+
            "";

    } else {
        itemBottom = ""+
            "<p class='list-ft'>" +
            "<a href='' class='btn btn-default'>发起会话</a>" +
            "<a href='' class='btn btn-default'>查看位置</a>" +

            "</p>"+
            "</li></a>"+
            "";
    }
    /*else if(truckPlatformDynamic == 1) {

        state="空车";
        itemBottom = ""+
            "<p class='list-ft'>" +
                "<a href='' class='btn btn-default'>发起会话</a>" +
                "<a href='' class='btn btn-default'>查看位置</a>" +
                "<a href='' class='btn btn-org'>派车</a>" +
            "</p>"+
            "</li></a>"+
            "";

    } else {

        state="运输";
        itemBottom =" "+
            "<p class='list-ft'>" +
                "<a href='' class='btn btn-default'>编辑车辆</a>" +
                "<a href='' class='btn btn-org'>派车</a>" +
            "</p>"+
            "</li></a>"+
            "";

    }*/
    //是否认证
    var isCert = getCertStatus(truckCertStatus);
    var url = detailUrl + "?truckId="+truckId;
    //判断产权外请
    var truckRoleTypeName = getTruckRoleType(truckRoleType);
    var itemBeforeStar = ""+
    "<a class='item'><li>"+
        "<a href='javascript:;' onclick=gotoUrl('"+url+"') class='list-bd'>"+
            "<p class='lo-top'>"+
            "<strong class='status'>"+state+"</strong>"+
            "<strong class='ruck-license'>"+truckCode+"  "+"</strong>"+
                isCert+
                truckRoleTypeName+
        "";

    //拼装star之后
    var itemAfterStar = ""+
                "</span>"+
            "</p>"+
        "<div class='lo-info clearfix'>"+
            "<div class='info-list'>"+
                "<ul>";
    var itemDriver ="";
    var tel =""
    //目前锁定成单个主驾驶和副驾驶

    var hasMainDriver = false;
    var hasSecDriver = false;

    //成型等级星星
    var star = "";
    for(var i = 0; i < driver.length ; i++) {

        var name = driver[i].truename != null ? driver[i].truename : "";
        var dtel = driver[i].tel != null ? driver[i].tel : "";

        tel = dtel;
        //如果是主驾驶
        if(driver[i].roleType == 1 && hasMainDriver == false && name != ""){
            if(truckRoleType == 1) {
                itemDriver = itemDriver + "<li><span class='tag org-tag'>主</span>" + name + " " + dtel + "</li>";
            } else {
                star = driver[i].sincerityLevel;
                //拼装star数量
                var itemStar = "<span class='user-level'>" + rl.getLevel(star) + "</span>";
                itemDriver = itemDriver + "<li>" + name + " " + dtel + itemStar + "</li>";

            }
            hasMainDriver = true;

        } else if(hasSecDriver == false){
            if(truckRoleType == 1) {
                itemDriver = itemDriver + "<li><span class='tag blue-tag'>副</span>" + name + " " + dtel + "</li>";
            } else {

            }
            hasSecDriver = true;
        }

    }
     var   itemTruck = "<li>" +
                        truckModel+"，" +
                        "<span class='hel'>"+Width+"</span>米，" +
                        "<span class='hel'>"+tonnage+"</span>吨" +
                    "</li>";
//                    "<li>"+truckGroup+" </li>"+
     var itemBeforeBottom="</ul>"+
                "</div>"+
            "</div>"+
         "</a>"+
         "<div class='dail'>" +
            "<a href='tel:"+tel+"'></a>" +
         "</div>"+
        "";


    var sum = itemBeforeStar +  itemAfterStar + itemTruck + itemDriver  + itemBeforeBottom + itemBottom;
    return sum;
}

function befordLoadData(data ,certDetailUrl ,unCertDetailUrl) {
    for(var i=0;i<data.length;i++) {
        var m=data[i];
        var truckId = m.truckId != null ? m.truckId : "";
        var truckRoleType = m.roleType != null ? m.roleType : "";
        var truckLicenseNo = m.truckLicenseNo != null ? m.truckLicenseNo : "";
        var groupName = m.groupName != null ? m.groupName : "";
        var truckPlatformDynamic = m.truckPlatformDynamic != null ? m.truckPlatformDynamic : 1;
        var truckCertStatus = m.truckCertStatus != null ? m.truckCertStatus : "";
        var truckLength = m.truckLength != null ? m.truckLength : "";
        var truckTonnage = m.truckTonnage != null ? m.truckTonnage : "";
        var truckModelName = m.truckModelName != null ? m.truckModelName : "";
        var truckRunningType = m.truckRunningType != null ? m.truckRunningType : "";
        var driver = m.driver != null ? m.driver : "";

        var detailUrl=getDetailUrl(truckCertStatus , certDetailUrl ,unCertDetailUrl);
        $("#list_items").append(
            makeItemString(detailUrl ,truckId,truckRoleType,truckLicenseNo,driver,groupName,truckPlatformDynamic,truckCertStatus,truckLength,truckTonnage,truckModelName,truckRunningType)
        );
    }
}

/**
 * 根据是否认证返回认证状态字符串
 *
 * @param certstatus
 * @returns {string}
 */
function getCertStatus(certstatus) {
    var result = "";
    if(certstatus  == 3) {
        result = "<i class='ico-verified'></i>"
    }
    return result;
}

function getTruckRoleType(truckRoleType) {

    var truckRoleTypeName = null;
    if(truckRoleType == 1) {
        truckRoleTypeName = "<span class='tag org-tag'>自有</span>";
    } else {
        truckRoleTypeName = "<span class='tag org-tag'>外请</span>";
    }
    return truckRoleTypeName;
}



/**
 * 通过认真状态来区别获取详情链接
 *
 * @param certStatus 认证状态 3为已认证 其他为未认证
 * @param certDetailUrl 已认证url
 * @param unCertDetailUrl 未认证url
 * @returns {string}
 */
function getDetailUrl(certStatus ,certDetailUrl ,unCertDetailUrl) {
    var detailUrl= "";
    //判断是已认证还是未认证详情页，
    if(certStatus == 3) {
        detailUrl = certDetailUrl;
    } else {
        detailUrl = unCertDetailUrl;
    }
    return detailUrl;
}