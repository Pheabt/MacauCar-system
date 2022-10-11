/**
 * Created by Administrator on 2019/7/22.
 */

var mileageDiv = echarts.init(document.getElementById("mileageDiv"));
var startTimesDiv = echarts.init(document.getElementById("goTimesDiv"));
var driveTimeDiv = echarts.init(document.getElementById("driveTimeDiv"));

var speedOption = getMileageOption();
var startTimesOption = getStartTimesOption();
var  driveTimeOption = getDriveTimeOption();


mileageDiv.setOption(speedOption);
startTimesDiv.setOption(startTimesOption);
driveTimeDiv.setOption(driveTimeOption);

function updateMileage() {

}
