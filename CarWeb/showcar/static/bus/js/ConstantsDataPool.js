/**
 * Created by Administrator on 2019/7/23.
 */
var SYS_Color   = {

    lightWhite : '#f6f5fc',
    titleColor : '#00e6ff',
    mainColor1 : '#00e6ff',
    titleColor2 : '#AE9AFE',
    mainColor : '#108DD1',
    secondaryColor1 : '#4f558b',
    secondaryColor2 : '#018dff',
    secondaryColor3 : '#2d3049',
    secondaryColor4 : '#28343f',
    backgroundColor : '#15171e',

    red:'#ff4500',
    yellow:'#F7FE2E',
    green:'#00CD00',
    blue:'#1e90ff',
    black:'#000000'
};

var TIME_INTERVAL = new Object();
TIME_INTERVAL.millisecond_100 =  100;
TIME_INTERVAL.millisecond_200 =  200;

TIME_INTERVAL.millisecond_250 = 250;
TIME_INTERVAL.millisecond_300 = 300;
TIME_INTERVAL.millisecond_500 = 500;
TIME_INTERVAL.millisecond_600 = 600;
TIME_INTERVAL.millisecond_800 =800;

TIME_INTERVAL.minute_half = 3000 * 10;
TIME_INTERVAL.minute_1 = 6000 * 10;
TIME_INTERVAL.minute_2 = 6000 * 20;
TIME_INTERVAL.minute_5 = 6000 * 50;
TIME_INTERVAL.minute_10 = 6000 * 100;

TIME_INTERVAL.second_1 = 1000;
TIME_INTERVAL.second_2 = 2000;
TIME_INTERVAL.second_3 = 3000;
TIME_INTERVAL.second_5 = 5000;

var SingleCarData = new Object();
SingleCarData.totalMileage = 0;
SingleCarData.heading = 0;
SingleCarData.remainMileage = 0; //续航
SingleCarData.battery = 0;
SingleCarData.totalRunDuration = 0;
