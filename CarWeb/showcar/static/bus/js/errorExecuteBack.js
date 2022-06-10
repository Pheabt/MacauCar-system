function errorExecute(error) {
    var executeMessage = error.returnMessage;
    var returnCode = error.returnCode;
    if (error == null || executeMessage == null || "" == executeMessage) {
        alert("系统错误");
        return;
    }
    if (20001 == returnCode) {
        alert("登录过期，请重新登录");
        window.location = "/haylion/aiShangLogin";
    } else {
        alert(executeMessage);
        return;
    }
}


