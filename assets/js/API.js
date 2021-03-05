"use strict";

var 
  domain = "http://127.0.0.1",
  port = ":4000",
  API = {
    baseURL: domain + port,
    statusCode: {
      404: function () {
        return alert("page not found");
      },
      500: function () {
        return alert("server broken");
      },
    },
    read: function read() {
      return $.ajax({
        method: "GET",
        url: API.baseURL + "/gets",
        async: false,
        cache: false,
        // contentType: "application/json; charset=x-user-defined",//傳送資料至 Server 的編碼類型
        // dataType: "JSON",//指定瀏覽器把資料解析成何種type
        // mimeType: 'json; charset=x-user-defined',
        // headers : {
        //     "ver"      : "1.0",
        //     "fileType" : "mp4",
        //     "md5"  : "47e954ec481d097e96261d993ec43ba5",
        //     "fileSize" : 276505673
        // },
        beforeSend: function beforeSend(xhr) {
          /* 
            overrideMimeType -> 

            1.用來修改 Content-Type
            2.部分版本的 Mozilla 瀏覽器，在伺服器送回的資料未含 json mime-type 標頭（header）時會出錯。
            為了避免這個問題，可以用下列方法覆寫伺服器傳回的檔頭，以免傳回的不是 json 

            ref -> https://iter01.com/511454.html
          */
          // xhr.overrideMimeType("json; charset=x-user-defined");

          xhr.setRequestHeader("ver", "1.0");
          xhr.setRequestHeader("dataTest", "@@@@test@@@@");
        },
        data: { dataTest: "@@@@test@@@@" },
        statusCode: API.statusCode,
      });
    },
    update: function update(_ref) {
      var id = _ref.id;
      var item = _ref.item;

      return $.ajax({
        method: "PUT",
        url: API.baseURL + "/gets/" + id,
        async: false,
        cache: false,
        beforeSend: function beforeSend(xhr) {
          xhr.overrideMimeType("json; charset=x-user-defined");
        },
        data: item,
        statusCode: API.statusCode,
      });
    },
    create: function create(item) {
      return $.ajax({
        method: "POST",
        url: API.baseURL + "/gets",
        async: false,
        cache: false,
        beforeSend: function beforeSend(xhr) {
          xhr.overrideMimeType("json; charset=utf-8");
        },
        data: item,
        statusCode: API.statusCode,
      });
    },
    delete: function _delete(id) {
      return $.ajax({
        method: "DELETE",
        url: API.baseURL + "/gets/" + id,
        async: false,
        cache: false,
        beforeSend: function beforeSend(xhr) {
          xhr.overrideMimeType("json; charset=x-user-defined");
        },
        statusCode: API.statusCode,
      });
    },
  };

// let API = {
//     baseURL:"http://127.0.0.1:3000",
//     statusCode:{
//         404: () => alert( "page not found" ),
//         500: () => alert( "server broken" ),
//     },
//     read : () => {
//         return $.ajax({
//                     method: "GET",
//                     url: `${API.baseURL}/gets`,
//                     async: false,
//                     cache: false,
//                     // dataType: "jsonp",
//                     // headers : {
//                     //     "ver"      : "1.0",
//                     //     "fileType" : "mp4",
//                     //     "md5"  : "47e954ec481d097e96261d993ec43ba5",
//                     //     "fileSize" : 276505673
//                     // },
//                     beforeSend: xhr => {
//                         xhr.overrideMimeType( "json; charset=x-user-defined" );

//                         xhr.setRequestHeader("ver","1.0");
//                         xhr.setRequestHeader("dataTest","@@@@test@@@@");
//                     },
//                     data: { dataTest: "@@@@test@@@@" },
//                     statusCode:API.statusCode
//                 })
//     },
//     update : ({id,item}) => {
//         return $.ajax({
//                     method: "PUT",
//                     url: `${API.baseURL}/gets/${id}`,
//                     async: false,
//                     cache: false,
//                     beforeSend: xhr => {
//                         xhr.overrideMimeType( "json; charset=x-user-defined" );
//                     },
//                     data:item,
//                     statusCode:API.statusCode
//                 })
//     },
//     create : (item) => {
//         return $.ajax({
//             method: "POST",
//             url: `${API.baseURL}/gets`,
//             async: false,
//             cache: false,
//             beforeSend: xhr => {
//                 xhr.overrideMimeType( "json; charset=x-user-defined" );
//             },
//             data:item,
//             statusCode:API.statusCode
//         })
//     },
//     delete : (id) => {
//         return $.ajax({
//                     method: "DELETE",
//                     url: `${API.baseURL}/gets/${id}`,
//                     async: false,
//                     cache: false,
//                     beforeSend: xhr => {
//                         xhr.overrideMimeType( "json; charset=x-user-defined" );
//                     },
//                     statusCode:API.statusCode
//                 })
//     },
// }
