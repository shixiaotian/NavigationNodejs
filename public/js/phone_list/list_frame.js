/**
 * Created by 石啸天 on 2015/6/15.
 *
 */
/**---------------------------*/
/**
 * 使用方法 -重写此方法
 * 1.方法体内post传参需要重写
 * 2.makeItemString方法需要重写
 * 3.在页面加载完成后调用 initListPage
 *
 * @param listUrl 列表请求url
 * @param groupId 分组id
 * @param authentication 已认证未认证-参数名不确定
 */
/*function getTruckItems(listUrl,groupId ,authentication) {

    $.get(listUrl,{groupId:groupId ,authentication:authentication},function(data){
        var mData=JSON.parse(data).data;
        $("#list_items").empty();
        for(var i=0;i<mData.length;i++) {
            var m=mData[i];
            $("#list_items").append(
                makeItemString(m.truckId,m.truckLicenseNo,m.sincerityLevel,m.truename,m.phone,m.groupName,m.truckCertStatus,m.truckLength,m.truckTonnage,m.truckModelName)
            );
        }
    });

}*/
//全局当前页变量
var globalCurPage = 1;
/**
 * 重置全局当前页变量
 */
function resetCurPage() {
    globalCurPage = 1;
}
/**
 * ios返回方法
 */
function fnComeback() {
    // 调用OC中comeBack方法
    window.location.href = 'chen://comeBack';
}

/**
 * 初始化数据
 */
function initListPage(groupUrl ,stateUrl ,listUrl ,certDetailUrl ,unCertDetailUrl ,groupId ,authentication) {

    //初始化读取页数
    var curPage = 1;
    getListGroup(groupUrl ,stateUrl ,listUrl  ,certDetailUrl ,unCertDetailUrl,groupId ,authentication,curPage);
    getListItems(listUrl ,certDetailUrl ,unCertDetailUrl ,groupId ,authentication,curPage);
    //上下拉动
    iSrcoll(groupUrl,stateUrl,listUrl,certDetailUrl ,unCertDetailUrl);

}
/**
 * 从服务器拉去最新的车辆分组信息
 *
 * @param account 账户
 */
function getListGroup(groupUrl ,stateUrl ,listUrl ,certDetailUrl ,unCertDetailUrl ,groupId ,authentication,curPage) {
    $.get(groupUrl,{},function(data){
        var mData=JSON.parse(data).data;
        if(mData.length > 0) {
                //修改下拉头子项数量
                $("#truck_group_size").empty();
                //修改item
                $("#group_ul").empty();
                var sum = 0;
                for (var i = 0; i < mData.length; i++) {
                    $("#group_ul").append(
                    );
                    sum = sum + mData[i].num;
                }

                $("#all_group_title").empty();

                $("#group_ul").append(
                        "<li class='all'><a href='javascript:void(0)' class='active' id='0'>全部分组<span class='hel'>(" + sum + ")</span></a></li>"
                );
                //判断groupId是否存在不存在则输出主标题，存在则输出当前标题
                if (groupId == 0) {
                    $("#all_group_title").append("全部分组<span class='hel'  id='truck_group_size'>(" + sum + ")</span>");
                } else {
                    $("#0").removeClass("active");
                }
                for (var i = 0; i < mData.length; i++) {

                    $("#group_ul").append(
                            "<li><a href='javascript:void(0)' id='" + mData[i].id + "'>" + mData[i].groupName + "<span class='hel'>(" + mData[i].num + ")</span></a></li>"
                    );
                    //如果groupId不为0则标题显示
                    if (mData[i].id == groupId) {
                        $("#all_group_title").append(mData[i].groupName + "<span class='hel'  id='truck_group_size'>(" + +mData[i].num + ")</span>");
                        $("#" + mData[i].id).addClass("active");
                    }
                }
                getListState(groupUrl ,stateUrl ,listUrl ,certDetailUrl ,unCertDetailUrl,groupId  ,authentication ,curPage);
            }
    });

}

/**
 * 全部状态
 *
 * @param account 账户
 */
var isfirstState=true;
function getListState(groupUrl ,stateUrl ,listUrl  ,certDetailUrl ,unCertDetailUrl,groupId ,state ,curPage) {
//    if(state == null || state =="") {
//        alert();
//        state = getQueryString("authentication");
//    }
    $.get(stateUrl,{groupId:groupId},function(data){
        var mData=JSON.parse(data).data;
        //全部数量
        var sum=mData.certified + mData.noCertified;
        //修改item
        if(isfirstState) {

            var all = "<li class='all'><a href='javascript:void(0)' id='state_all_group'>全部状态<span class='hel'>(" + sum + ")</span></a></li>";
            var authentication = "<li><a href='javascript:void(0)' id='state_authentication_group'>已认证<span class='hel'>(" + mData.certified + ")</span></a></li>";
            var noAuthentication = "<li><a href='javascript:void(0)' id='state_unauthentication_group'>未认证<span class='hel'>(" + mData.noCertified + ")</span></a></li>";
            $("#state_items_ul").append(all);
            //已认证
            $("#state_items_ul").append(authentication);
            //未认证
            $("#state_items_ul").append(noAuthentication);
            reFlashStateTitle(sum,mData.certified,mData.noCertified,state);
            //注册列表头监听
            //只注册一次
            listIOnclickListener();
            isfirstState=false;
            //每次刷新数据需要重新加载
            listItemsOnclickListener(groupUrl ,stateUrl ,listUrl  ,certDetailUrl ,unCertDetailUrl,curPage );

        }else {
            reFlashStateTitle(sum,mData.certified,mData.noCertified ,state);
            $("#state_all_group").empty();
            $("#state_all_group").append("全部状态<span class='hel'>(" + sum + ")</span>");

            $("#state_authentication_group").empty();
            $("#state_authentication_group").append("已认证<span class='hel'>(" + mData.certified + ")</span>");

            $("#state_unauthentication_group").empty();
            $("#state_unauthentication_group").append("未认证<span class='hel'>(" + mData.noCertified + ")</span>");

        }

    });
    //刷新状态标题
    function reFlashStateTitle(sum,certified,noCertified,state) {

        $("#all_state_title").empty();
        //刷新标题
        if(state == 0 || state == null) {
            $("#state_all_group").attr("class","active");
            $("#all_state_title").append("全部状态<span class='hel'>("+sum+")</span>");
        }
        if(state == 1) {
            $("#state_authentication_group").attr("class","active");
            $("#all_state_title").append("已认证<span class='hel'>("+certified+")</span>");
        }
        if(state == 2) {
            $("#state_unauthentication_group").attr("class","active");
            $("#all_state_title").append("未认证<span class='hel'>("+noCertified+")</span>");
        }
    }

}
/**
 * 列表单击监听
 */
function listIOnclickListener() {

    $(".filter-by a").on("click",function(e){
        e.preventDefault();
        if(!$(this).hasClass("active")) {
            $(this).addClass("active").siblings("a").removeClass("active");
            $(this).children(".mui-icon").addClass("mui-icon-arrowup");
            $(this).siblings("a").children(".mui-icon").removeClass("mui-icon-arrowup");
            if($(this).attr("id") == "all_group") {
                $("#state_items").addClass("hide");
                $("#group_items").removeClass("hide");
            }
            if($(this).attr("id") == "all_state") {
                $("#group_items").addClass("hide");
                $("#state_items").removeClass("hide");
            }
        }else {
            $(this).removeClass("active");
            $(this).children(".mui-icon").removeClass("mui-icon-arrowup");
            $("#group_items").addClass("hide");
            $("#state_items").addClass("hide");
        }
    });

}

/**
 * 列表子项单击监听事件
 *
 * @param groupUrl 下拉列表url
 * @param stateUrl 认证状态url
 * @param listUrl  列表项url
 * @param curPage  当前页
 */
function listItemsOnclickListener(groupUrl ,stateUrl ,listUrl  ,certDetailUrl ,unCertDetailUrl,curPage) {
    //重置页码
    resetCurPage();
    $(".filter-list li a").on("click",function(e){
        e.preventDefault();
        var dom = $(this).html();
        $(this).parents(".filter-list").find("a").removeClass("active");
        $(this).addClass("active");
        $(".filter-by .active .filter-name").html(dom);
        $(".filter-by a .mui-icon").removeClass("mui-icon-arrowup");;
        $(".filter-by .active").removeClass("active");
        $(".filter-mask").addClass("hide");
        //列表被点击
        truckAndStateListOnClick(groupUrl ,stateUrl ,listUrl  ,certDetailUrl ,unCertDetailUrl,curPage);

    });
}

/**
 * 全部车队 与 全部状态 单击监听事件
 *
 * @param groupUrl 下拉列表url
 * @param stateUrl 认证状态url
 * @param listUrl  列表项url
 * @param curPage  当前页
 */
function truckAndStateListOnClick(groupUrl ,stateUrl ,listUrl  ,certDetailUrl ,unCertDetailUrl,curPage) {

    //首先遍历全部车队列表读取groupId
    var groupId = getLeftActiveGroupId();

    //然后遍历全部状态列表读取state
    var state = getRightActiveStata();

    //重新加载列表
    getListItems(listUrl ,certDetailUrl ,unCertDetailUrl,groupId ,state,curPage);
    getListState(groupUrl ,stateUrl ,listUrl ,certDetailUrl ,unCertDetailUrl ,groupId ,state ,curPage);

}
/**
 * 遍历读取下拉列表查找左侧列表被选中的分组id *
 */
function getLeftActiveGroupId() {

    var data =$("#group_ul > li");
    for(var i=0;i<data.length;i++) {

        var id = data.children("a")[i].id;
        var choice = $("#"+id).attr("class");
        if(choice == "active") {
            return id;
        }

    }
    return 0;

}
/**
 * 获取右侧认证状态列表选中id
 */
function getRightActiveStata() {

    var state_all_group = $("#state_all_group").attr("class");
    if(state_all_group == "active") {
        return 0;
    }

    var state_authentication_group = $("#state_authentication_group").attr("class");
    if(state_authentication_group == "active") {
        return 1;
    }

    var state_unauthentication_group = $("#state_unauthentication_group").attr("class");
    if(state_unauthentication_group == "active") {
        return 2;
    }

    return 0;

}
/**
 * 跳转去详情界面
 *
 * @param url 例：1.list?   2.list?partnerId=123
 */
function gotoUrl(url) {

    var groupId = getLeftActiveGroupId();
    var state = getRightActiveStata();
    var urls = url + "&groupId=" + groupId + "&" + "authentication=" + state;
    window.location.href=urls;

}

/**
 * 下拉刷新
 * 上拉追加数据
 */
function iSrcoll(groupUrl,stateUrl,listUrl,certDetailUrl ,unCertDetailUrl) {
    var hasMore = true;

    function muiInt() {
        mui.init({
            pullRefresh: {
                container: '#controller',
                down: {
                    callback: pulldownRefresh
                },
                up: {
                    contentrefresh: '正在加载...',
                    callback: pullupRefresh
                }
            }
        });
    }
    muiInt();

    /**
     * 下拉刷新具体业务实现
     */
    function pulldownRefresh() {

        setTimeout(function() {

            var groupId = getLeftActiveGroupId();
            var state =getRightActiveStata();
            initListPage(groupUrl, stateUrl, listUrl,certDetailUrl ,unCertDetailUrl, groupId, state);
            mui('#controller').pullRefresh().endPulldownToRefresh(); //refresh completed

        }, 1500);
    }

    /**
     * 上拉加载具体业务实现
     */
    function pullupRefresh() {

        var groupId = getLeftActiveGroupId();
        var state =getRightActiveStata();

        globalCurPage = globalCurPage + 1;
        $.get(listUrl, {groupId: groupId, authentication: state, curPage: globalCurPage}, function (data) {
            setTimeout(function () {

                var mData = JSON.parse(data).data;
                if (mData.length > 0) {
                    befordLoadData(mData, certDetailUrl, unCertDetailUrl);
                    hasMore = false;
                } else {
                    hasMore = true;
                }
                mui('#controller').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
            }, 1500);
        });

    }
    if (mui.os.plus) {

        mui.plusReady(function() {
            setTimeout(function() {
                mui('#controller').pullRefresh().pullupLoading();
            }, 1000);

        });
    } else {
//        mui.ready(function() {
//            mui('#controller').pullRefresh().pullupLoading();
//        });
    }

}
//请求分组列表数据。并且进行抽象加载
function getListItems(listUrl ,certDetailUrl ,unCertDetailUrl,groupId ,authentication,curPage) {

    $.get(listUrl,{groupId:groupId ,authentication:authentication ,curPage:curPage},function(data){
        var mData=JSON.parse(data).data;
        $("#list_items").empty();
        befordLoadData(mData ,certDetailUrl ,unCertDetailUrl);
    });;

}