"use strict";

;(function () {

    var mobileMenuList = document.querySelector(".mobileMenuList"),
        overlay = document.querySelector(".overlay"),
        searchContainer = document.querySelector(".searchContainer"),
        deskRightSectionNav = document.querySelector(".deskRightSectionNav"),
        iconClose = document.querySelector(".iconClose"),
        iconHamburger = document.querySelector(".iconHamburger"),
        deskSearch = document.querySelector(".deskSearch"),
        deskSemobileWatchMorearch = document.querySelector(".mobileWatchMore"),
        footerItemContainer = document.querySelector("footer .itemContainer"),
        iconAngleUp = document.querySelector(".iconAngle.up"),
        iconAngleDown = document.querySelector(".iconAngle.down"),
        hamburgerIsOpen = false;

    //mobile漢堡鈕
    iconHamburger.addEventListener("click", function(){

        hamburgerIsOpen = mobileMenuList.classList.contains("active");
        mobileMenuList.classList[hamburgerIsOpen ? "remove" : "add"]("active");
        mobileMenuList.classList[hamburgerIsOpen ? "add" : "remove"]("remove");
        overlay.classList[hamburgerIsOpen ? "remove" : "add"]("overlayShow");
        
    });
    
    function deskRightSectionNavToggle(flag){
        deskRightSectionNav.classList[flag ? "add" : "remove" ]("show");
        deskRightSectionNav.classList[flag ? "remove" : "add" ]("hidden");
        searchContainer.classList[flag ? "add" : "remove" ]("hidden");
        searchContainer.classList[flag ? "remove" : "add" ]("show");
    }

    // Desk搜尋按鈕  
    deskSearch.addEventListener("click", function () {
        deskRightSectionNavToggle();
    });
    // Desk搜尋關閉
    iconClose.addEventListener("click", function () {
        deskRightSectionNavToggle("iconCloseByClick");
    });

    // overlay click
    overlay.addEventListener("click", function(){
        if(mobileMenuList.classList.contains("active"))
            iconHamburger.click();
    });

    // Mobile footer 了解更多
    deskSemobileWatchMorearch.addEventListener("click", function(){
        var footerItemContainerfFlag = footerItemContainer.classList.contains("displayShow");
        footerItemContainer.classList[footerItemContainerfFlag ? "remove" : "add" ]("displayShow");
        iconAngleUp.classList[footerItemContainerfFlag ? "add" : "remove" ]("displayShow");
        iconAngleDown.classList[footerItemContainerfFlag ? "add" : "remove" ]("displayHidden");
    });

    // slideBox
    var slideBox = document.querySelectorAll(".slideBox"),i = 0;
    setInterval(function(){
            if(i < slideBox.length-1 ){
                slideBox[i].classList.remove("active");
                i++;
                slideBox[i].classList.add("active");
            }else{//跑到最後一張掉頭到第一張
                slideBox[i].classList.remove("active");
                i = 0;
                slideBox[i].classList.add("active");
            }
    },2000)


    window.addEventListener("resize", function () {
        mobileMenuList.classList.remove("active");
        overlay.classList.remove("overlayShow");
        iconClose.click();
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