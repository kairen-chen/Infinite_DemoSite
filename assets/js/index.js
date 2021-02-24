"use strict";

;(function () {

    var mobileMenuList = document.querySelector(".mobileMenuList"),
        overlay = document.querySelector(".overlay"),
        flag = false;
    document.querySelector(".iconHamburger").addEventListener("click", function () {
        flag = mobileMenuList.classList.contains("active");
        mobileMenuList.classList[flag ? "remove" : "add"]("active");
        mobileMenuList.classList[flag ? "add" : "remove"]("remove");
        overlay.classList[flag ? "add" : "remove"]("hidden");
        overlay.classList[flag ? "remove" : "add"]("show");
    });

    var searchContainer = document.querySelector(".searchContainer"),
        deskRightSectionNav = document.querySelector(".deskRightSectionNav"),
        searchFlag = false;
    // Desk搜尋按鈕  
    document.querySelector(".deskSearch").addEventListener("click", function () {
        searchContainer.classList.add("show");
        searchContainer.classList.remove("hidden");
        deskRightSectionNav.classList.add("hidden");
        deskRightSectionNav.classList.remove("show");
    });
    // Desk搜尋關閉
    document.querySelector(".iconClose").addEventListener("click", function () {
        deskRightSectionNav.classList.add("show");
        deskRightSectionNav.classList.remove("hidden");
        searchContainer.classList.add("hidden");
        searchContainer.classList.remove("show");
    });

    window.addEventListener("resize", function () {
        mobileMenuList.classList["remove"]("active");
        overlay.classList["add"]("hidden");
    });
})();

var direction = function direction() {
    window.open("./page/crud.html", "_blank");
};

// ;(()=>{
    
//     let mobileMenuList = document.querySelector(".mobileMenuList"),
//         overlay =  document.querySelector(".overlay"),
//         flag = false;
//     document.querySelector(".iconHamburger").addEventListener("click", ()=>{
//         flag = mobileMenuList.classList.contains("active");
//         mobileMenuList.classList[flag ? "remove" : "add"]("active");
//         mobileMenuList.classList[flag ? "add" : "remove"]("remove");
//         overlay.classList[flag ? "add" : "remove"]("hidden");
//         overlay.classList[flag ? "remove" : "add"]("show");
//     });
    
//     let searchContainer = document.querySelector(".searchContainer"),
//         deskRightSectionNav =  document.querySelector(".deskRightSectionNav"),
//         searchFlag = false;
//     // Desk搜尋按鈕   
//     document.querySelector(".deskSearch").addEventListener("click", ()=>{
//         searchContainer.classList.add("show");
//         searchContainer.classList.remove("hidden");
//         deskRightSectionNav.classList.add("hidden");
//         deskRightSectionNav.classList.remove("show");
//     });
//     // Desk搜尋關閉
//     document.querySelector(".iconClose").addEventListener("click", ()=>{
//         deskRightSectionNav.classList.add("show");
//         deskRightSectionNav.classList.remove("hidden");
//         searchContainer.classList.add("hidden");
//         searchContainer.classList.remove("show");
//     });

//     window.addEventListener("resize", ()=>{
//         mobileMenuList.classList["remove"]("active");
//         overlay.classList["add"]("hidden");
//     });



// })()



// let direction = () => {
//     window.open("./page/crud.html", "_blank")
// }