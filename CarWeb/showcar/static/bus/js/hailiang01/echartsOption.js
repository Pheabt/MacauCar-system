/**
 * Created by Administrator on 2019/7/22.
 */


var lightWhite = '#f6f5fc';

var titleColor = '#00e6ff';
var mainColor1 = '#00e6ff';
var titleColor2 = '#AE9AFE';
var mainColor = '#108DD1';
var secondaryColor1 = '#4f558b';
var secondaryColor2 = '#018dff';
var secondaryColor3 = '#2d3049';
var secondaryColor4 = '#28343f';
var backgroundColor = '#15171e';


var defaultFontSize = 12;

var screenWidth = window.screen.width;


reSetFontSize();
/**
 * 计算屏幕分辨率，用来设置图表字体大小
 **/
function reSetFontSize() {
    if (screenWidth > 1900) {
        defaultFontSize = 18;
    }
}


var labelNo = {
    show: false
};
/**
 * 得到渐变色
 *竖直方向
 * LinearGradient(0, 0, 0, 1,  前4个参数代表方向，颜色变化起始位置，左下右上  0001 代表从上方开始
 * **/
function getColorOfDegreesVertical() {   //设置渐变色
    var resultColor = new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
        offset: 0,
        color: mainColor1
    }, {
        offset: 1,
        color: secondaryColor2
    }]);
    return resultColor;
}
var myItemNoShowStyle = {
    normal: {
        color: function (params) {
            var colorList = [secondaryColor1, getColorOfDegreesVertical()];
            return colorList[params.dataIndex];
        },
        labelLine: {
            show: false
        }
    }
};

var labelFormatter = {
    normal: {
        show: true,
        position: 'center',
        formatter: function (params) {
            return params.name + "\n" + params.value
        },
        textStyle: {
            color: lightWhite,
            fontSize: 16
        }
    }
};


/**
 * 获取仪表option
 * @returns
 */
function getPanelOption() {

    var option = {
        // backgroundColor: '#1b1b1b',
        tooltip: {
            formatter: "{a} <br/>{c} {b}"
        },
        toolbox: {
            show: false  //不显示工具箱
        },
        series: [
            {
                name: '速度',
                type: 'gauge',
                min: 0,
                max: 160,
                center: ["50%", "43%"],  //圆心坐标   百分比计算min(width, height) * 50%
                radius: '80%', //半径     min(width, height) / 2 * 75%
                splitNumber: 8,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
                        width: 2,
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 8
                    }
                },
                axisLabel: {            // 坐标轴文本标签
                    textStyle: {       // 属性lineStyle控制线条样式
                        fontSize: defaultFontSize,
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 8
                    }
                },
                axisTick: {            // 坐标轴小标记  刻度线
                    length: 8,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 8
                    }
                },
                splitLine: {           // 分隔线
                    length: 14,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        width: 2,
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 8
                    }
                },
                pointer: {           //指针设置
                    length: '70%',  //指针长度 默认80%
                    width: 6,  //最宽处 默认8
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 5
                },
                title: {
                    offsetCenter: [0, "-30%"],  //相对于圆心偏移量  默认 0  -40%
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: defaultFontSize + 2,
                        fontStyle: 'italic',
                        color: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                detail: {       //详情 下面中间的显示数据
                    // backgroundColor: 'rgba(30,144,255,0.8)',
                    // borderWidth: 1,
                    borderColor: '#fff',
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 5,
                    fontSize: 8,   //默认15
                    offsetCenter: [0, '60%'],       // x, y，单位px
                    width: 65,
                    height: 33,
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 20,
                        color: '#fff'
                    }
                },
                data: [{value: 0, name: 'km/h'}]
            }
        ]
    };
    return option;
}
/**
 * 出车次统计
 * @returns
 * */
function getStartTimes() {

    option = {
        title: {
            text: '出车次',
            textStyle: {
                color: '#00e6ff'
            }
        },

        tooltip: {
            trigger: 'axis',
            textStyle: {
                color: '#108DD1'
            }
        },
        legend: {
            data: ['出车次'],
            textStyle: {
                color: '#108DD1'
            }
        },
        toolbox: {
            show: false
        },

        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                nameTextStyle: {
                    color: '#00e6ff'
                },
                axisLabel: {
                    color: '#00e6ff'
                },
                // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value',
                nameTextStyle: {
                    color: '#00e6ff'
                },
                splitLine: {  //分割线
                    show: false
                },
                axisLabel: {
                    color: '#00e6ff'
                },
                axisLine: {
                    lineStyle: {
                        color: '#00e6ff'
                    }
                }
            }
        ],
        series: [
            {
                name: '出车次',
                type: 'line',
                smooth: true,
                lineStyle: {
                    color: '#AE9AFE'
                },
                // normal: {
                //
                //     areaStyle: {type: 'default'}
                //
                // },
                areaStyle: {
                    color: '#108DD1',
                    opacity: 0.5
                },
                data: []
                // data: [10, 12, 21, 54, 260, 830, 710]
            }
        ]

    };

    return option;

}
/**
 *
 *电量echartsOption
 */
function getPowerOption() {
    var option = {
        title: {
            text: '电量',
            textStyle: {
                color: SYS_Color.titleColor
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
                return params[0].name + '<br/>'
                    + params[0].seriesName + ' : ' + params[0].value + '<br/>'
                    + params[1].seriesName + ' : ' + (params[1].value + params[0].value);
            }
        },
        legend: {
            show: false,
            selectedMode: false,
            data: ['remainder', 'empty']
        },
        toolbox: {
            show: false

        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisLabel: {
                    textStyle: {
                        color: SYS_Color.lightWhite
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: SYS_Color.titleColor
                    }
                },
                data: ['1号', '2号', '3号', '4号']
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    show: false,
                    textStyle: {
                        color: SYS_Color.titleColor
                    }
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: SYS_Color.titleColor
                    }
                },
                boundaryGap: [0, 0.1]
            }
        ],
        series: [
            {
                name: 'remainder',
                type: 'bar',
                stack: 'sum',
                barCategoryGap: '50%',
                itemStyle: {
                    normal: {
                        color: SYS_Color.mainColor,  //柱状图里面颜色
                        barBorderColor: SYS_Color.mainColor1,       //柱状图外边框颜色
                        barBorderWidth: 1,
                        barBorderRadius: 2,
                        label: {
                            show: true,
                            color: SYS_Color.black,
                            position: 'insideTop'
                        }
                    }
                },
                data: [80, 90, 70, 50]
            },
            {
                name: 'empty',
                type: 'bar',
                stack: 'sum',
                itemStyle: {
                    normal: {
                        color: SYS_Color.backgroundColor,
                        barBorderColor: SYS_Color.mainColor1,   //边框颜色
                        barBorderWidth: 1,
                        barBorderRadius: 2,
                        label: {
                            show: false,
                            position: 'top',
                            formatter: function (params) {
                                for (var i = 0, l = option.xAxis[0].data.length; i < l; i++) {
                                    if (option.xAxis[0].data[i] == params.name) {
                                        return option.series[0].data[i] + params.value;
                                    }
                                }
                            },
                            textStyle: {
                                color: 'tomato'
                            }
                        }
                    }
                },
                data: [20, 10, 30, 50]
            }
        ]
    };
    return option;
}


/**
 * 单车 实时参数统计显示
 */
function getCarParamsStatisticsChartOption() {
    var radius = ["50%", "65%"];
    var option = {
        title: {
            show: false,
            text: '实时参数',
            x: 'left',
            textStyle: {
                color: titleColor
            },
        },
        tooltip: {
            show: false
        },
        legend: {
            show: false
        },
        toolbox: {
            show: false
        },
        series: [
            {
                type: 'pie',
                center: ['12%', '50%'],
                radius: radius,
                itemStyle: myItemNoShowStyle,
                // data: [
                //     {name: 'other', value: 360, label: labelNo},
                //     {name: '续航', value: 0, label: labelFormatter}
                // ]
                data: [
                    {
                        name: '续航', value: 0, label: {
                        normal: {
                            show: true,
                            position: 'center',
                            formatter: function (params) {
                                return params.name + "\n" + params.value + "Km"
                            },
                            textStyle: {
                                color: lightWhite,
                                fontSize: 16
                            }
                        }
                    }
                    }
                ]

            },
            {
                type: 'pie',
                center: ['32%', '50%'],
                radius: radius,
                itemStyle: myItemNoShowStyle,
                data: [
                    {name: 'other', value: 100, label: labelNo},
                    {
                        name: '油门', value: 0, label: {
                        normal: {
                            show: true,
                            position: 'center',
                            formatter: function (params) {
                                return params.name + "\n" + params.value + "%"
                            },
                            textStyle: {
                                color: lightWhite,
                                fontSize: 16
                            }
                        }
                    }
                    }
                ]
            },
            {
                type: 'pie',
                center: ['52%', '50%'],
                radius: radius,
                itemStyle: myItemNoShowStyle,
                data: [
                    {name: 'other', value: 100, label: labelNo},
                    {
                        name: '能量', value: 0, label: {
                        normal: {
                            show: true,
                            position: 'center',
                            formatter: function (params) {
                                return params.name + "\n" + params.value + "%"
                            },
                            textStyle: {
                                color: lightWhite,
                                fontSize: 16
                            }
                        }
                    }
                    }
                ]
            },
            {
                type: 'pie',
                center: ['70%', '50%'],
                radius: radius,
                itemStyle: myItemNoShowStyle,
                data: [{
                    name: '行时', value: 0, label: {
                        normal: {
                            show: true,
                            position: 'center',
                            formatter: function (params) {
                                return params.name + "\n" + params.value + "H"
                            },
                            textStyle: {
                                color: lightWhite,
                                fontSize: 16
                            }
                        }
                    }
                }
                ]
            },
            {
                type: 'pie',
                center: ['88%', '50%'],
                radius: radius,
                itemStyle: myItemNoShowStyle,
                data: [{
                    name: '里程', value: 0, label: {
                        normal: {
                            show: true,
                            position: 'center',
                            formatter: function (params) {
                                return params.name + "\n" + params.value + "Km"
                            },
                            textStyle: {
                                color: lightWhite,
                                fontSize: 16
                            }
                        }
                    }
                }]
            }
        ]
    };

    return option;
}