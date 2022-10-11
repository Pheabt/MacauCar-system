function verifyFirst() {
    $.ajax({
            url: '/haylion/api/currentCar/verify',
            type: 'post',
            dataType: 'json',
            async: false,
            headers: {
                "Authorization": localStorage.getItem("enjoyToken")
            },
            success: function (result) {
                var error = result.error;
                var returnCode = error.returnCode;
                if (0 == returnCode) {
                    console.info("验证成功");
                } else {
                    console.info("验证失败");
                    window.location = "/haylion/noLogin";
                }
            }
        }
    );
}
verifyFirst();
