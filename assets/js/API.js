"use strict";

var API = {
    baseUrl: "http://127.0.0.1:3000",
    statusCode: {
        404: function _() {
            return alert("page not found");
        },
        500: function _() {
            return alert("server broken");
        }
    },
    read: function read() {
        return $.ajax({
            method: "GET",
            url: API.baseUrl + "/gets",
            async: false,
            cache: false,
            // dataType: "jsonp",
            // headers : {
            //     "ver"      : "1.0",
            //     "fileType" : "mp4",
            //     "md5"  : "47e954ec481d097e96261d993ec43ba5",
            //     "fileSize" : 276505673
            // },
            beforeSend: function beforeSend(xhr) {
                xhr.overrideMimeType("json; charset=x-user-defined");

                xhr.setRequestHeader("ver", "1.0");
                xhr.setRequestHeader("dataTest", "@@@@test@@@@");
            },
            data: { dataTest: "@@@@test@@@@" },
            statusCode: API.statusCode
        });
    },
    update: function update(_ref) {
        var id = _ref.id;
        var item = _ref.item;

        return $.ajax({
            method: "PUT",
            url: API.baseUrl + "/gets/" + id,
            async: false,
            cache: false,
            beforeSend: function beforeSend(xhr) {
                xhr.overrideMimeType("json; charset=x-user-defined");
            },
            data: item,
            statusCode: API.statusCode
        });
    },
    create: function create(item) {
        return $.ajax({
            method: "POST",
            url: API.baseUrl + "/gets",
            async: false,
            cache: false,
            beforeSend: function beforeSend(xhr) {
                xhr.overrideMimeType("json; charset=x-user-defined");
            },
            data: item,
            statusCode: API.statusCode
        });
    },
    "delete": function _delete(id) {
        return $.ajax({
            method: "DELETE",
            url: API.baseUrl + "/gets/" + id,
            async: false,
            cache: false,
            beforeSend: function beforeSend(xhr) {
                xhr.overrideMimeType("json; charset=x-user-defined");
            },
            statusCode: API.statusCode
        });
    }
};

// let API = {
//     baseUrl:"http://127.0.0.1:3000",
//     statusCode:{
//         404: () => alert( "page not found" ),
//         500: () => alert( "server broken" ),
//     },
//     read : () => {
//         return $.ajax({
//                     method: "GET",
//                     url: `${API.baseUrl}/gets`,
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
//                     url: `${API.baseUrl}/gets/${id}`,
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
//             url: `${API.baseUrl}/gets`,
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
//                     url: `${API.baseUrl}/gets/${id}`,
//                     async: false,
//                     cache: false,
//                     beforeSend: xhr => {
//                         xhr.overrideMimeType( "json; charset=x-user-defined" );
//                     },
//                     statusCode:API.statusCode
//                 })
//     },
// }