var tokenId = localStorage.getItem("enjoyToken");

$.ajaxSetup(
    {
        type:"post",
        dataType: 'json',
        // cache: false,
        headers:{
            "Authorization":tokenId
        }
    }
)
