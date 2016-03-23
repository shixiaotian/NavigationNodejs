/**
 * Created by Administrator on 2015/6/16.
 */
$(function(){
    var truckId = Number(rl.getQueryString("truckId"));
    getDetail(truckId);

});

/**
 * 获取详情数据
 *
 * @param truckId 卡车Id
 */
function getDetail(truckId) {

    //请求服务器数据
    $.get("certDetail/truck_inf",{truckId:truckId},function(data){
        var mData=JSON.parse(data).data;
        //绑定司机数据
        setDriver(mData.driver);
        //绑定卡车数据
        setTruck(mData);

    });
}


/**
 * 设置司机数据
 *
 * @param data
 */
function setDriver(data) {
    var mainDriver;
    //遍历数据找出主驾驶
    for(var i = 0 ; i < data.length ; i++) {
        if(data[i].roleType == 1 ) {
            mainDriver = data[i];
            break;
        }
        //绑定副驾驶
        mainDriver = data[i];
    }
    if(mainDriver != null) {
        var name = mainDriver.truename != null ? mainDriver.truename : "";
        var tel = mainDriver.tel != null ?mainDriver.tel : "";
        var imageUrl = mainDriver.headImageUrl != null ? mainDriver.headImageUrl : "";
        var sincerityLevel = mainDriver.sincerityLevel != null ? mainDriver.sincerityLevel : 0;
        //名字
        $("#nanme_tel_star").append(name + " " + tel +getStar(sincerityLevel));
        //头像
        $("#head_image").attr("src",imageUrl);
        //司机认证数据插入
        if (mainDriver.identityCertStatus == 3)
            $("#certificate").append("<li>身份证</li>");
        if (mainDriver.driveLicenseStatus == 3)
            $("#certificate").append("<li>驾驶证</li>");
        if (mainDriver.qualificationLicenseStatus == 3)
            $("#certificate").append("<li>从业资格证</li>");
        if (data.hzQualificationLicenseStatus == 3)
            $("#certificate").append("<li>危险品运输从业资格证</li>");
    }

}
/**
 * 设置车辆数据
 *
 * @param data
 */
function setTruck(data) {

    var truckCode = data.truckLicenseNo != null ? data.truckLicenseNo : "";
    var truckGroupName = data.truckGroupName !=null ? data.truckGroupName : "";
    var truckModelName = data.truckModelName != null ? data.truckModelName : "";
    var truckRemarks = data.truckRemarks != null ? data.truckRemarks : "";
    var truckTonnage = data.truckTonnage != null ? data.truckTonnage : "";
    var truckLength = data.truckLength != null ? data.truckLength : "";
    var truckLocation = data.truckLocation != null ? data.truckLocation : "";
    var LocationDate = data.LocationDate != null ? data.LocationDate : "";
    var businessRecord = data.businessRecord != null ? data.businessRecord : "";
    var businessRecordData= data.businessRecordData != null ? data.businessRecordData :"0";

    //卡车牌号
    $("#truck_code").append(truckCode);
    //卡车型号
    $("#truck_model").append(truckModelName);
    //卡车长度
    $("#truck_actual_width").append(truckLength);
    //卡车载重
    $("#truck_tonnage").append(truckTonnage);
    //卡车分组名车
    $("#truck_group").append(truckGroupName);
    //备注
    $("#truck_remarks").append(truckRemarks);

    //卡车所在坐标与时间
    $("#location").append(truckLocation);
    $("#loaction_date").append(LocationDate);


    //以下暂无数据
    $("#business_record").append(businessRecord);

    $("#praise").append("100%");
    $("#complaint_rate").append("0%");
    $("#ruin_rate").append("0%");

    $("#business_record_data").append(businessRecordData+"单");
    //车辆认证数据插入

    if (data.drivingLicenseStatus == 3)
        $("#certificate").append("<li>行驶证</li>");
    if (data.operateLicenseStatus == 3)
        $("#certificate").append("<li>道路运输经营许可证</li>");
    if (data.insureCardStatus == 3)
        $("#certificate").append("<li>车辆保险</li>");

}

/**
 * 绑定星级
 *
 * @param level
 */
function getStar(level) {

    var star = "<span class='user-level'>";
    star = star + rl.getLevel(level);
    star = star + "</span>";
    return star;

}