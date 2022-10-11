/**
 * 视频js函数库
 *
 **/
var frontPlayer, driverPlayer;
var playFlag = 0;  //播放标志

var selectVideoId = "";  //被选中的视频车id

var videoMap = new HashMap();
const FRONT = "front";
const DRIVER = "driver";
var nowFrontVideo = "";
var nowDriverVideo = "";
videoPrepare();


/**
 * 自定义睡眠函数
 * @param numberMillis
 */
function sleep(numberMillis) {
    var nowDate = new Date();
    var exitTime = nowDate.getTime() + numberMillis;
    while (true) {
        nowDate = new Date();
        if (nowDate.getTime() > exitTime) {
            return
        }
    }
}


function videoPrepare() {
    var list = null;
    while (true) {
        list = getCarVideos();
        if (list != null) {
            for (var i = 0; i < list.length; i++) {
                videoMap.put(list[i].carId + FRONT, list[i].frontVideo);
                videoMap.put(list[i].carId + DRIVER, list[i].driverVideo);
            }
            break;
        }
    }
    //打开视频扫描件函数
    videoScan();

}


function videoScan() {
    // var frontVideoElement = document.getElementById("videoSource1");
    // var driverVideoElement = document.getElementById("videoSource2");
    setInterval(function () {
        if (selectCar != "") {
            if (selectCar == selectVideoId) {
                return;
            } else {
                //初始化播放器
                initVideoPlayer1();
                selectVideoId = selectCar;
            }
        }
    }, TIME_INTERVAL.second_1);
}

function initVideoPlayer1() {
    console.log('video player start to init');

    frontPlayer = null;
    driverPlayer = null;

    //先删除已有视频元素节点
    $("#frontVideo").remove();
    $("#driverVideo").remove();
    //创建新视频节点
    var frontVideoElement = document.createElement("video");
    var driverVideoElement = document.createElement("video");
    frontVideoElement.style.cssText = "width: 100%; height: 100%";
    driverVideoElement.style.cssText = "width: 100%; height: 100%";
    frontVideoElement.id = "frontVideo";
    driverVideoElement.id = "driverVideo";
    frontVideoElement.autoplay = "true";
    driverVideoElement.autoplay = "true";

    //视频节点追加入div子元素中
    var frontDiv = document.getElementById("frontDiv");
    var driverDiv = document.getElementById("driverDiv");
    frontDiv.appendChild(frontVideoElement);
    driverDiv.appendChild(driverVideoElement);

    //为视频节点设置source节点
    var frontSource = document.createElement("source");
    var driverSource = document.createElement("source");
    frontSource.id = "videoSource1";
    driverSource.id = "videoSource2";
    frontSource.type = "rtmp/flv";
    driverSource.type = "rtmp/flv";

    frontVideoElement.appendChild(frontSource);
    driverVideoElement.appendChild(driverSource);

    //获取视频流地址
    nowFrontVideo = videoMap.get(selectCar + FRONT);
    nowDriverVideo = videoMap.get(selectCar + DRIVER);
    frontSource.src = nowFrontVideo;
    driverSource.src = nowDriverVideo;
    // console.info(selectCar + "设置前向视频src=" + nowFrontVideo);
    // console.info(selectCar + "设置驾驶视频src=" + nowDriverVideo);


    frontPlayer = new EZUIPlayer('frontVideo');
    driverPlayer = new EZUIPlayer('driverVideo');

    // player = videojs('singleCarPlayer');
    // player.play();

    frontPlayer.on('error', function () {
        console.log('frontPlayer error');
    });
    frontPlayer.on('play', function () {

        console.log('frontPlayer play');
    });
    frontPlayer.on('pause', function () {

        console.log('frontPlayer pause');
    });
    frontPlayer.on('waiting', function () {
        console.log('frontPlayer waiting');
    });


    driverPlayer.on('error', function () {
        console.log('driverPlayer error');
    });
    driverPlayer.on('play', function () {
        console.log('driverPlayer play');
    });
    driverPlayer.on('pause', function () {
        console.log('driverPlayer pause');
    });
    driverPlayer.on('waiting', function () {
        console.log('driverPlayer waiting');
    });
}

