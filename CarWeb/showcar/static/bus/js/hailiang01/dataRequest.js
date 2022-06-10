/**
 * Created by Administrator on 2019/7/24.
 */
const  org = "haiLiang";
loadCarRunningShowInMapCycle();
loadPowerCycle();
loadControlDataCycle();
loadCarStartTimesCycle();
loadSingleCarTotalMileageCycle();
loadSingleCarTotalRunDurationCycle();
centerTotalMileageDurationAndTimesCycle();
singleCarRemainMileageCycle();
/**
 * 请求运行中车辆，地图更新显示
 */
function loadCarRunningShowInMapCycle() {
    setInterval(loadCarRunningShowInMap, TIME_INTERVAL.second_1);
}
function loadCarRunningShowInMap() {
    $.ajax({
            url: '/haylion/api/currentCar/runningCarsForMap',
            type: 'post',
            dataType: 'json',
            async: true,
            data: {
                org: org
            },
            success: function (result) {
                var error = result.error;
                var returnCode = error.returnCode;
                if (0 == returnCode) {
                    var list = result.data.list;
                    // updateParamsStatistics(list);
                    updateLocation(list);
                    updateSelectBtn(list);
                } else {
                    errorExecute(error);
                }
                connectServerStatus = returnCode;
                //更新连接状态闪烁灯
                // updateServerConnectFlag(returnCode);
            },
            error: function () {
                updateLocation(null);
                updateSelectBtn(null);
                connectServerStatus = 1;
            }
        }
    );
}

/**
 * 循环加载控制信息
 */
function loadControlDataCycle() {
    setInterval(getControlData, TIME_INTERVAL.second_1);
}

function getControlData() {
    if(selectCar == ""){
        return;
    }
    $.ajax({
        url:'/haylion/api/currentCar/getCarControlInfo',
        type: 'post',
        dataType: 'json',
        async: true,
        data:{carId: selectCar},
        success: function (result) {
            var error = result.error;
            var returnCode = error.returnCode;
            if (0 == returnCode) {
                var data = result.data;
                var controlData = data.control_data;
                if(controlData != null){
                    //int inSteer; //方向盘角度
                    //  int inThrottle;// 油门
                    //  byte inGear;   //1-P  2-D   3-N  4-R
                    //  byte inLight;  //1-左转  2-右转  3-双闪 4-刹车
                    // byte inBrake;
                    var angleSteer = controlData.feedSteer;
                    updateSteerImg(angleSteer);
                }
            }
        }
    });
}

/**
 * 电量循环加载
 */
function loadPowerCycle() {
    loadCarsPower();
    setInterval(function () {
        loadCarsPower()
    }, TIME_INTERVAL.minute_2);
}
/**
 * 请求车的电量
 */
function loadCarsPower() {
    $.ajax({
            url: '/haylion/api/currentCar/allCarsPower',
            type: 'post',
            dataType: 'json',
            async: true,
            data: {
                org: org
            },
            success: function (result) {
                var error = result.error;
                var returnCode = error.returnCode;
                if (0 == returnCode) {
                    var data = result.data;
                    var list = data.list;
                    updatePower(list);
                }
            }
        }
    );
}

/**
 * 循环请求出车次数
 */
function loadCarStartTimesCycle() {
    loadCarStartTimes();
    setInterval(loadCarStartTimes, TIME_INTERVAL.second_5);
}

function  loadCarStartTimes() {
    $.ajax({
            url: '/haylion/api/currentCar/weekRunTimes',
            type: 'post',
            dataType: 'json',
            async: true,
            data: {
                org: org
            },
            success: function (result) {
                var error = result.error;
                var returnCode = error.returnCode;
                if (0 == returnCode) {
                    var data = result.data;
                    var list = data.list;
                    updateStartTimesShow(list);
                }
            }
        }
    );

}


function loadSingleCarTotalMileageCycle() {
    loadSingleCarTotalMileage();
    setInterval(loadSingleCarTotalMileage, TIME_INTERVAL.second_5);
}
/**
 * 获取单车总里程
 */
function loadSingleCarTotalMileage() {
    if(selectCar == "" || selectCar == null){
        SingleCarData.totalMileage
        return;
    }
    $.ajax({
            url: '/haylion/api/currentCar/getSingeCarTotalMileage',
            type: 'post',
            dataType: 'json',
            async: true,
            data: {
                carId: selectCar
            },
            success: function (result) {
                var error = result.error;
                var returnCode = error.returnCode;
                if (0 == returnCode) {
                    var data = result.data;
                    //将里程转为Km
                    var mileage = data.totalMileage;
                    mileage = mileage / 1000;
                    mileage = mileage.toFixed(1);
                    SingleCarData.totalMileage = mileage;
                }
            }
        }
    );
}

function loadSingleCarTotalRunDurationCycle() {
    loadSingleCarTotalRunDuration();
    setInterval( loadSingleCarTotalRunDuration, TIME_INTERVAL.minute_5);
}
/**
 * 获取单车总运行时长
 */
function loadSingleCarTotalRunDuration() {
    if(selectCar == "" || selectCar == null){
        SingleCarData.totalRunDuration = 0;
        return;
    }
    $.ajax({
            url: '/haylion/api/currentCar/getSingeCarTotalRunDuration',
            type: 'post',
            dataType: 'json',
            async: true,
            data: {
                carId: selectCar
            },
            success: function (result) {
                var error = result.error;
                var returnCode = error.returnCode;
                if (0 == returnCode) {
                    var data = result.data;
                    var duration = data.totalRunTime;
                    //将时间转为小时
                    duration =  duration/3600;
                    duration = duration.toFixed(1); //保留一位小数
                    SingleCarData.totalRunDuration = duration;
                }
            }
        }
    );
}

/**
 * 获取所有车总里程，时间，出车次信息
 */

function centerTotalMileageDurationAndTimesCycle(){
    centerTotalMileageDurationAndTimes();
    setInterval(centerTotalMileageDurationAndTimes, TIME_INTERVAL.minute_2);
}
function centerTotalMileageDurationAndTimes() {
    $.ajax({
            url: '/haylion/api/currentCar/centerTotalMileageDurationAndTimes',
            type: 'post',
            dataType: 'json',
            async: true,
            data: {
                org: org
            },
            success: function (result) {
                var error = result.error;
                var returnCode = error.returnCode;
                if (0 == returnCode) {
                    var data = result.data;
                    var duration = data.duration;
                    var totalMileage = data.totalMileage;
                    var totalTimes = data.totalTimes;

                    //将时间转为小时
                    duration =  duration/3600;
                    duration = Math.round(duration); //四舍五入，保留整数
                    //转为Km
                    totalMileage = totalMileage/1000;
                    totalMileage = Math.round(totalMileage);

                    updateCenterTotalData(totalTimes, duration, totalMileage);

                }
            }
        }
    );
}

/**
 * 续航
 **/
function singleCarRemainMileageCycle() {
    singleCarRemainMileage();
    setInterval(singleCarRemainMileage, TIME_INTERVAL.second_5);
}

/**
 * 获取续航里程
 * @constructor
 */
function singleCarRemainMileage() {
    if(selectCar == null || selectCar == ""){
        SingleCarData.remainMileage = 0;
        return;
    }
    $.ajax({
            url: '/haylion/api/currentCar/getSingeCarRemainMileage',
            type: 'post',
            dataType: 'json',
            async: true,
            data: {
                carId: selectCar
            },
            success: function (result) {
                var error = result.error;
                var returnCode = error.returnCode;
                if (0 == returnCode) {
                    var data = result.data;
                    SingleCarData.remainMileage = data.remainMileage;
                }
            }
        }
    );
}


/**
 * 获取车视频
 */
function getCarVideos() {
    var list = null;
    $.ajax({
            url: '/haylion/api/projectBase/getCarVideos',
            type: 'post',
            dataType: 'json',
            async: false,   //非异步请求
            data: {
                org: org
            },
            success: function (result) {
                var error = result.error;
                var returnCode = error.returnCode;
                if (0 == returnCode) {
                    var data = result.data;
                     list = data.list;
                }
            }
        }
    );
    return list;
}