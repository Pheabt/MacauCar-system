/**
 * Created by Administrator on 2019/7/22.
 */

var panelDiv = echarts.init(document.getElementById("panelChartDiv"));
var startTimesDiv = echarts.init(document.getElementById("totalDiv1"));
var powerDiv = echarts.init(document.getElementById("totalDiv2"));
var paramsStatisticsDiv = echarts.init(document.getElementById("carParamsStatisticsDiv"));

var speedOption = getPanelOption();
var startTimesOption = getStartTimes();
var powerOption = getPowerOption();
var paramsStatisticsOption = getCarParamsStatisticsChartOption();

panelDiv.setOption(speedOption);
startTimesDiv.setOption(startTimesOption);
powerDiv.setOption(powerOption);
paramsStatisticsDiv.setOption(paramsStatisticsOption);

updateParamsStatisticsOptionCycle();


/**
 * 速度仪表显示更新
 * @param speed
 */
function updateSpeed(speed) {
    var speedConv = Math.round(speed * 3.6) ;         //转为Km/H
    speedOption.series[0].data[0].value = speedConv;
    panelDiv.setOption(speedOption);
}

/**
 * 更新出车次数
 * @param list
 */
function updateStartTimesShow(list){
    var dateList = new Array();
    var timesList = new Array();
    for(var i = 0; i < list.length; i++){
        dateList.push(list[i].date);
        timesList.push(list[i].times);
        startTimesOption.xAxis[0].data = dateList;
        startTimesOption.series[0].data = timesList;
    }
    startTimesDiv.setOption(startTimesOption);

}


/**
 * 电量柱状图显示更新
 * @param list
 */
function updatePower(list) {
    var carNameList = new Array();
    var powerList = new Array();
    var emptyList = new Array();
    for(var i = 0; i<list.length; i++){
        carNameList.push(list[i].carName);
        powerList.push(list[i].power);
        emptyList.push(100 - list[i].power);
        if(list[i].carId == selectCar){
            SingleCarData.battery = list[i].power;
        }
    }
    powerOption.xAxis[0].data = carNameList;
    powerOption.series[0].data = powerList;
    powerOption.series[1].data = emptyList;
    powerDiv.setOption(powerOption);
}

/**
 * 更新单车数据
 */
function updateParamsStatisticsOptionCycle() {
    updateParamsStatisticsOption;
    setInterval(updateParamsStatisticsOption, TIME_INTERVAL.second_1);

}
function updateParamsStatisticsOption() {
    //续航
    paramsStatisticsOption.series[0].data[0].value =  SingleCarData.remainMileage;
    // paramsStatisticsOption.series[0].data[1].value = SingleCarData.remainMileage;
    //电量
    paramsStatisticsOption.series[2].data[0].value = 100 - SingleCarData.battery;
    paramsStatisticsOption.series[2].data[1].value = SingleCarData.battery;
    //行时
    paramsStatisticsOption.series[3].data[0].value = SingleCarData.totalRunDuration;
    //里程
    paramsStatisticsOption.series[4].data[0].value = SingleCarData.totalMileage;

    paramsStatisticsDiv.setOption(paramsStatisticsOption);
}