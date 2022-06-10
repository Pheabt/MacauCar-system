/**
 * Created by Administrator on 2019/7/22.
 */
updateCarOnlineLight();
// rotateSteer();
updateConnectLight();
getAngle();

/**
 * 变更选中的车
 * @param carId
 */
function switchSelectedCar(carId) {
    loadCarsPower();
    selectCar = carId;
}


var findCar = false;
/**
 * 更新位置
 * @param list
 */
function updateLocation(list) {
    deleteCarMakers();
    hideRunningCarCircleTag();  //隐藏地图上运行标记
    if (list == null || list.length == 0) {
        //设置车辆是否在线
        carIsOnlineRunning = 1;
        return;
    }
    findCar = false;    //是否有选中车标记
    var length = list.length;
    for (var i = 0; i < length; i++) {
        var car = list[i];
        var carIdNew = car.carId;
        var gps = car.GPS_info;
        var carName = car.carName;
        if (carIdNew == selectCar) { //存在已经选中的车
            findCar = true;
        }
        if (!findCar) {
            if (selectCar == "") { //如果没有选中车辆,那就选当前的
                switchSelectedCar(carIdNew);
                findCar = true;
            } else if (i == length - 1) {   //遍历到最后一个了，如果活跃的车中没有找到选中的车，那就选最后一个车
                switchSelectedCar(carIdNew);
                findCar = true;
            }
        }

        //slam点云坐标
        // var left = gps.x;
        // var top = gps.y;
        //高德地图GPS坐标
        var wgs84togcj02 = coordtransform.wgs84togcj02(gps.lon, gps.lat);
        var lon = wgs84togcj02[0];
        var lat = wgs84togcj02[1];
        var heading = gps.heading;
        // console.info("更新前判断--lon = " + lon + " lat = " + lat + "heading = " + heading);
        if (selectCar == carIdNew) { //更新速度，航向角
            updateSpeed(gps.speed);
            updateHeadingPoint(Math.floor(heading)); //更新航向角
            $("#carName").html(carName);
        }
        // updateMarker(carIdNew, lon, lat, heading);
        addMakerCar(carIdNew, carName, lon, lat, heading); //地图显示
    }
}

/**
 * 更新地图下方供点击选中的按钮
 * @param list
 */
function updateSelectBtn(list) {
    //删除已有按钮
    $("#selectAreaDiv").children().remove();
    //开始新建
    if (null == list || 0 == list.length) {
        return;
    }


    for (var i = 0; i < list.length; i++) {
        var car = list[i];
        var carId = car.carId;
        var carName = car.carName;

        var btnDiv = document.createElement("div");
        $("#selectAreaDiv").append(btnDiv); //注意创建div后立马放到指定div元素中，这样子div就有归属
        btnDiv.id = "btn_" + carId;
        $("#btn_" + carId).addClass("select_but");
        btnDiv.innerHTML = carName;


        $("#btn_" + carId).click(function () {
            var btnCarId = this.id;
            console.info("点击" + this.id);
            //    标记为选中车辆
            var carIdSplit = btnCarId.split("_");
            switchSelectedCar(carIdSplit[1]);
        });
        //设置鼠标点击时变色
        $("#btn_" + carId).mousedown(function () {
            // this.css("background-color", "#5e5e5e");
            this.style.backgroundColor="#5e5e5e";
        });
        $("#btn_" + carId).mouseup(function () {
            // this.css("background-color", "#122b40");
            this.style.backgroundColor="#122b40";
        });

    }
}


/**
 * 更新连接指示灯状态
 */
function updateConnectLight() {
    //connect_light
    var con = true;
    var colorTemp = SYS_Color.red;
    setInterval(function () {
        if (connectServerStatus == 0) {
            colorTemp = SYS_Color.green;
        } else {
            colorTemp = SYS_Color.red;
        }
        if (con) {
            $("#netConnectLight").css("background-color", colorTemp);
            con = false;
        } else {
            $("#netConnectLight").css("background-color", SYS_Color.backgroundColor);
            con = true;
        }
    }, TIME_INTERVAL.millisecond_300);
}

/**
 * 更新车是否在线指示灯
 */
function updateCarOnlineLight() {
    var light_f = true;
    setInterval(function () {
        if (light_f) {
            light_f = false;
            $("#carOnlineLight").css("background-color", SYS_Color.backgroundColor);
        } else {
            light_f = true;
            if (carIsOnlineRunning == 0) {
                $("#carOnlineLight").css("background-color", SYS_Color.green);
            } else {
                $("#carOnlineLight").css("background-color", SYS_Color.yellow);
            }
        }
    }, TIME_INTERVAL.millisecond_200)

}

var newAngle = 0;
/**
 * 方向盘角度更新测试
 */
// rotateSteer();
function rotateSteer() {
    var currentSteerAngle = 0;
    setInterval(function () {
        var endAngle = Math.floor(Math.random() * 540 * 2 - 540);
        newAngle = endAngle;
        rotation("steer_img", currentSteerAngle, endAngle);
        currentSteerAngle = endAngle;
    }, TIME_INTERVAL.second_3);
}
/**
 * 刷新方向盘角度
 */
function updateSteerImg(endAngle) {
    if (endAngle == newAngle) {
        return;
    }
    rotation("steer_img", newAngle, endAngle);
    newAngle = endAngle;
}

var startHeading = 0;
/**
 * 更新航向角指示
 */

// setInterval(function () {
//         var endAngle = Math.floor(Math.random() * 360 * 2 - 360);
//         updateHeadingPoint(endAngle);
//     },
//     2000);

function updateHeadingPoint(endHeading) {
    rotation("direction_point_child", startHeading, endHeading);
    startHeading = endHeading;
}

/**
 * 旋转角度更新
 * @param documentId    要旋转的标签id
 * @param startAngle    开始角度
 * @param lastAngle     结束角度
 */
function rotation(documentId, startAngle, lastAngle) {
    $("#" + documentId).rotate({
        angle: startAngle,
        animateTo: lastAngle,  //从当前角度旋转到多少度
        // callback: ,   //旋转后的回调
        easing: function (x, t, b, c, d) {  //文档表示该参数让旋转更自然
            return c * (t / d) + b;
        }
    });
}

/**
 * 获取标签旋转角度展示
 */
function getAngle() {
    setInterval(function () {
        //方向盘
        var angle = $("#steer_img").getRotateAngle();
        // console.info("endAngle =" +newAngle +" steer angle =" + angle);
        $("#steer_number").html(Math.floor(angle) + "°");

        //航向角
        var angle_heading = $("#direction_point_child").getRotateAngle();
        $("#heading_number").html(Math.floor(angle_heading) + "°");
        // heading_txt
    }, TIME_INTERVAL.millisecond_200);
}

/**
 * 更新系统总里程， 时间， 次数信息
 * @param totalTimes
 * @param duration
 * @param totalMileage
 */
function updateCenterTotalData(totalTimes, duration, totalMileage) {
    $("#centerTotalMileage").html(totalMileage)
    $("#centerTotalTime").html(duration);
    $("#centerTotalTimes").html(totalTimes);
}