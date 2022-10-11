// 高德地图处理函数
var lineMap = new HashMap();

var selectedCarCircleMarker, map = new AMap.Map("aMap", {
    resizeEnable: true,
    center: [116.420257, 40.038558],  //北苑校区
    //center: [116.419978, 40.038562],  //校本部
    // center: [106.50455068, 29.3826192],  //106.50455068,29.38261920 重庆

    zoom: 8, //数字大 图片放的越大

    mapStyle: 'amap://styles/darkblue'   //darkblue   graffiti light fresh blue
});


if (location.href.indexOf('&x guide=1')    !== -1) {
    map.setStatus({scrollWheel: false})
}


var carShowInMakerStr0 =
    '<div style="height: 52px; width: 52px;"><img style="transform:rotate(';

var carShowInMakerStr1 = 'deg)" src="http://14.29.138.84/images_resources/car.png"></div><div style="color: #ffffff; word-break: keep-all">';
// 实例化点标记
function addMakerCar(carId, carName, lon, lat, heading) {
    var carMaker = new AMap.Marker({
        map: map,
        // icon: "img/car.png",
        position: new AMap.LngLat(lon, lat),
        // offset: new AMap.Pixel(-10, -10),
        offset: new AMap.Pixel(-26, -26),
        // content: '<div><img src="img/car.png"></div><div style="color: #ffffff">'+carName+'</div>',
        content: carShowInMakerStr0 + heading + carShowInMakerStr1 + carName + '</div>', //显示的内容为车图片，不用icon是因为除了显示车图片还要显示车名字，
        //maker中icon与content同时使用时是以content为准，如果使用icon就不好显示车名字了
        angle: 0,             //点标记旋转角度，即车辆行驶方向，正北方向为0度， 不在这里设置heading是因为旋转会带着文字一块旋转，所以heading设置在content中
        clickable: true,  //可点击
        title: "点击查看"+ carName,
        extData: {id: carId}
    });

    AMap.event.addListener(carMaker, "click", function () {
        switchSelectedCar(carId);
    });
    if (carId == selectCar) {
        updateRunningCarCircleLocation(lon, lat);
        map.setCenter(new AMap.LngLat(lon, lat));
    }
}


/**
 * 删除所有车辆makers
 */
function deleteCarMakers() {
    var makersList = map.getAllOverlays('marker');
    for (var i = 0; i < makersList.length; i++) {
        var makerItem = makersList[i];
        // var extData = makerItem.getExtData();
        map.remove(makerItem); //移除车辆maker
    }
}

/**
 * 圆标记，用于标记运行车特殊形状
 */
function initTagRunningCarCircle() {
    selectedCarCircleMarker = new AMap.CircleMarker({
        radius: 24,    //半径，单位px
        strokeColor: "#ffffff",    //轮廓线条颜色
        strokeOpacity: 0.7,     //轮廓线条透明度
        strokeWeight: 2,         //轮廓线宽度
        fillColor: "#FFFF00",    //圆形填充颜色
        fillOpacity: 0.2 //圆形填充透明度 默认0.9
        // zIndex: ,       //默认10
    });
    selectedCarCircleMarker.setMap(map);
    selectedCarCircleMarker.hide(); //初始化后自地图上隐藏
    console.info("create running car tag in AMap completed");
}


/**
 * 更新选中车的标记位置
 * @param lon
 * @param lat
 */
function updateRunningCarCircleLocation(lon, lat) {
    selectedCarCircleMarker.setCenter(new AMap.LngLat(lon, lat));
    selectedCarCircleMarker.show(); //在地图中显示
}

/**
 * 隐藏选中运行车标记
 * 当没有车选中运行时执行
 */
function hideRunningCarCircleTag() {
    selectedCarCircleMarker.hide();
}

/**使选中圆环闪烁
 */
// setInterval(function () {
//     map.remove(selectedCarCircleMarker);
//     selectedCarCircleMarker = new AMap.CircleMarker({
//         radius: 24,    //半径，单位px
//         strokeColor: "#ffffff",    //轮廓线条颜色
//         strokeOpacity: 0.6,     //轮廓线条透明度
//         strokeWeight: 1,         //轮廓线宽度
//         fillColor: "#018dff",    //圆形填充颜色
//         fillOpacity: 0.3 //圆形填充透明度 默认0.9
//         // zIndex: ,       //默认10
//     });
//     selectedCarCircleMarker.setMap(map);
// }, 600);

/**
 * 加载路径
 */

function loadRoads() {
    $.ajax({
            url: '/haylion/api/projectBase/loadAMapRoads',
            success: function (result) {
                var error = result.error;
                var returnCode = error.returnCode;
                if (0 == returnCode) {
                    var data = result.data;
                    var list = data.list;
                    createRoads(list);
                }
            }
        }
    );
}

/**
 * 创建路线
 **/
function createRoads(arr) {
    if (arr == null || arr.length < 1) {
        return;
    }
    var lineArr = new Array();     //路线集合
    for (var i = 0; i < arr.length; i++) {
        var pointsArr = new Array();     //路线点的集合
        var lonLatStr = arr[i];
        var lonLatArr = lonLatStr.split(",");
        for (var j = 0; j < lonLatArr.length - 2; j += 2) {

            var wgs84togcj02 = coordtransform.wgs84togcj02(lonLatArr[j], lonLatArr[j + 1]);
            pointsArr.push(new AMap.LngLat(wgs84togcj02[0], wgs84togcj02[1]));
        }
        lineArr.push(pointsArr);
    }

    for (var i = 0; i < lineArr.length; i++) {
        var lineOption = {
            map: map,
            path: lineArr[i],
            strokeColor: '#66CD00', //线颜色默认#006600
            strokeStyle: 'dashed', //线样式，实线:solid，虚线:dashed
            strokeWeight: 5,   //线宽默认1
            strokeDasharray: [10, 10]
        };

        var polyLine = new AMap.Polyline(lineOption);
        lineMap.put(i+1, polyLine);
        var lineNO = i+1;
        //为下拉框创建路线选择
        $('#lineSelect').append("<option value='"+lineNO+"'>"+"路线"+lineNO+"</option>");
    }
}

initTagRunningCarCircle();//初始化运行标记

//loadRoads();  //加载路径
//本部
// 116.426721,39.991014  最北
//116.426748,39.98956 最南


//北苑
// 116.419855,40.03942  最北
//116.419978,40.038562  最南