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
var titleFontSize = 16;

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
 * 分类统计里程
 */
function getMileageOption() {

    var option = {
        title: {
            text: '驾驶里程',
            textStyle: {
                // color: '#00e6ff'
                fontSize: titleFontSize
            }
        },

        tooltip: {
            trigger: 'axis',
            textStyle: {
                // color: '#108DD1'
            }
        },
        legend: {
            // data: ['自驾'],
            // textStyle: {
            //     color: '#108DD1'
            // }
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
                    // color: '#00e6ff'
                },
                axisLabel: {
                    // color: '#00e6ff'
                },
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value',
                nameTextStyle: {
                    // color: '#00e6ff'
                },
                splitLine: {  //分割线
                    show: false
                },
                axisLabel: {
                    // color: '#00e6ff'
                },
                axisLine: {
                    lineStyle: {
                        // color: '#00e6ff'
                    }
                }
            }
        ],
        series: [
            {
                name: '自驾里程',
                type: 'line',
                // smooth: true,
                lineStyle: {
                    // color: '#AE9AFE'
                },
                areaStyle: {
                    // color: '#108DD1',
                    opacity: 0.5
                },
                data: []
            },
            {
                name: '人驾里程',
                type: 'line',
                // smooth: true,
                lineStyle: {
                    // color: '#AE9AFE'
                },
                areaStyle: {
                    // color: '#108DD1',
                    // opacity: 0.5
                },
                data: []
            }
        ]
    };

    return option;

}

/**
 * 出车次统计
 * @returns
 * */
function getStartTimesOption() {

    var option = {
        title: {
            text: '发车统计',
            textStyle: {
                // color: '#00e6ff'
                fontSize: titleFontSize
            }
        },

        tooltip: {
            trigger: 'axis',
            textStyle: {
                // color: '#108DD1'
            }
        },
        legend: {
            data: ['出车次', '接管次数'],
            textStyle: {
                // color: '#108DD1'
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
                    // color: '#00e6ff'
                },
                axisLabel: {
                    // color: '#00e6ff'
                },
                data: []
            }
        ],
        yAxis: [
            {
                type: 'value',
                nameTextStyle: {
                    // color: '#00e6ff'
                },
                splitLine: {  //分割线
                    show: false
                },
                axisLabel: {
                    // color: '#00e6ff'
                },
                axisLine: {
                    lineStyle: {
                        // color: '#00e6ff'
                    }
                }
            }
        ],
        series: [
            {
                name: '出车次',
                type: 'line',
                // smooth: true,
                lineStyle: {
                    // color: '#AE9AFE'
                },
                areaStyle: {
                    // color: '#108DD1',
                    // opacity: 0.5
                },
                data: []
            },
            {
                name: '接管次数',
                type: 'line',
                // smooth: true,
                lineStyle: {
                    // color: '#AE9AFE'
                },
                areaStyle: {
                    // color: '#108DD1',
                    // opacity: 0.5
                },
                data: []
            }
        ]
    };

    return option;

}


/**
 * 驾驶时长
 *
 */
function getDriveTimeOption() {
    var option = {
        title: {
            text: "驾驶时间",
            textStyle: {
                // color: "#436EEE",
                fontSize: titleFontSize
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: [
                {
                    name: '人工驾驶时长',
                    icon: 'circle',
                    textStyle: {
                        color: 'red',  // 单独设置某一个图列的颜色
                        backgroundColor: '#fff' // 单独设置某一个图列的字体背景色
                    }
                },
                {
                    name: '自驾时长',
                    icon: 'circle',
                    textStyle: {
                        color: 'red',  // 单独设置某一个图列的颜色
                        backgroundColor: '#fff' // 单独设置某一个图列的字体背景色
                    }
                }
            ]
        },
        //x轴显示
        xAxis: {
            data: [20180611, 20180612, 20180613, 20180614, 20180615, 20180616, 20180617],
            show: true,  // 是否显示
            position: 'bottom',  // x轴的位置
            offset: 0, // x轴相对于默认位置的偏移
            type: 'category',   // 轴类型， 默认为 'category'
            name: '日期',    // 轴名称
            nameLocation: 'end',  // 轴名称相对位置
            nameTextStyle: {   // 坐标轴名称样式
                color: 'red',
                padding: [5, 0, 0, -5]
            },
            nameGap: 15, // 坐标轴名称与轴线之间的距离
            nameRotate: 0,  // 坐标轴名字旋转
            axisLine: {       // 坐标轴 轴线
                show: true,  // 是否显示
                symbol: ['none', 'arrow'],  // 是否显示轴线箭头
                symbolSize: [8, 8], // 箭头大小
                symbolOffset: [0, 7],  // 箭头位置
                // ------   线 ---------
                lineStyle: {
                    // color: 'blue',
                    width: 1,
                    type: 'solid'
                }
            },
            axisTick: {    // 坐标轴 刻度
                show: true,  // 是否显示
                inside: true,  // 是否朝内
                length: 3,     // 长度
                lineStyle: {   // 默认取轴线的样式
                    color: 'red',
                    width: 1,
                    type: 'solid'
                }
            },
            axisLabel: {    // 坐标轴标签
                show: true,  // 是否显示
                inside: false, // 是否朝内
                rotate: 0, // 旋转角度
                margin: 5, // 刻度标签与轴线之间的距离
                color: 'red'  // 默认取轴线的颜色
            },
            splitLine: {    // gird区域中的分割线
                show: false,  // 是否显示
                lineStyle: {
                    // color: 'red',
                    // width: 1,
                    // type: 'solid'
                }
            },
            splitArea: {    // 网格区域
                show: false  // 是否显示，默认为false
            },
            // show: false
        },
        //   ------   y轴  ----------
        yAxis: {
            show: true,  // 是否显示
            position: 'left', // y轴位置
            offset: 0, // y轴相对于默认位置的偏移
            type: 'value',  // 轴类型，默认为 ‘category’
            name: '时长',   // 轴名称
            nameLocation: 'end', // 轴名称相对位置value
            nameTextStyle: {    // 坐标轴名称样式
                color: '#fff',
                padding: [5, 0, 0, 5]  // 坐标轴名称相对位置
            },
            nameGap: 15, // 坐标轴名称与轴线之间的距离
            nameRotate: 270,  // 坐标轴名字旋转

            axisLine: {    // 坐标轴 轴线
                show: true,  // 是否显示
                //  -----   箭头 -----
                symbol: ['none', 'arrow'],  // 是否显示轴线箭头
                symbolSize: [8, 8],  // 箭头大小
                symbolOffset: [0, 7], // 箭头位置

                // ----- 线 -------
                lineStyle: {
                    // color: 'blue',
                    width: 1,
                    type: 'solid'
                }
            },
            axisTick: {      // 坐标轴的刻度
                show: true,    // 是否显示
                inside: true,  // 是否朝内
                length: 3,      // 长度
                lineStyle: {
                    color: 'red',  // 默认取轴线的颜色
                    width: 1,
                    type: 'solid'
                }
            },
            axisLabel: {      // 坐标轴的标签
                show: true,    // 是否显示
                inside: false,  // 是否朝内
                rotate: 0,     // 旋转角度
                margin: 8,     // 刻度标签与轴线之间的距离
                color: 'red',  // 默认轴线的颜色
            },
            splitLine: {    // gird 区域中的分割线
                show: true,   // 是否显示
                lineStyle: {
                    color: '#666',
                    width: 1,
                    type: 'dashed'
                }
            },
            splitArea: {     // 网格区域
                show: false   // 是否显示，默认为false
            }
        },
        tooltip: {
            position: ['50%', '50%'],
            padding: [5, 10]
        },
        grid: {
            // left: '0%'
        },
        series: [
            {
                name: "人工驾驶时长",
                type: "bar",
                stack: "业务",//折叠显示
                data: ["87.54", "88.54", "90", "91", "92", '95', '100'],
                barWidth: 25,
                //显示颜色
                itemStyle: {
                    normal: {color: "blue"}
                },
                label: {   // 图形上的文本标签
                    show: false,
                    position: 'insideTop', // 相对位置
                    rotate: 0,  // 旋转角度
                    color: '#eee'
                }
            },
            {
                name: "自驾时长",
                type: "bar",
                stack: "业务",
                data: ["87.54", "88.54", "90", "91", "92", '95', '100'],
                barWidth: 25,
                label: {   // 图形上的文本标签
                    show: false,
                    position: 'insideTop', // 相对位置
                    rotate: 0,  // 旋转角度
                    color: '#eee'
                },
                itemStyle: {
                    normal: {color: "#3FBB49"}
                }
            }
        ]
    };
    return option;

}
