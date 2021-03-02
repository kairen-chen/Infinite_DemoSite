"use strict";

if (typeof NodeList.prototype.forEach !== 'function')  {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

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
    var slideBox = document.querySelectorAll(".slideBox"),
        activeIndex = 0,
        slideBoxFlag = false,oldIndex = 0;

    // slideAuto = setInterval(function(){
    //     slideHandler("next");
    // },2000);
    var oldIndex = 0;
    function slideHandler(type){
        // window.clearInterval(slideAuto);
        // 進場方向控制
        slideBoxFlag = document.querySelector(".slideBox").classList.contains("rightToleft");
        if((!slideBoxFlag && type === "next") | (slideBoxFlag && type === "prev")){
            slideBox.forEach(function(element,index){
                element.classList[(type === "next") ? "add" : "remove"]("rightToleft");
            });
        }

      
        // slideBox.forEach(function(element,index){
        //     if(oldIndex !== index){
        //         slideBox[index].style.transition = "unset";
        //         slideBox[index].classList.remove("rightToleft");
        //     }
        // });

        // 動畫執行
        setTimeout(function(){
            slideBox[activeIndex].classList.remove("active");

            slideBox[activeIndex].classList.add("rightToleft");
            // slideBox[activeIndex].style.transition = "transform 0.5s";

   
            type === "next" ? (( activeIndex < slideBox.length - 1 ) ? activeIndex++ : activeIndex = 0) : (( activeIndex > 0 ) ? activeIndex-- : activeIndex = slideBox.length - 1);
            // slideBox[activeIndex].classList.remove("rightToleft");
            
            slideBox[activeIndex].classList.add("active");
           
        });
    }

    document.querySelector(".prev").addEventListener("click",function(){
        slideHandler("prev");
    },false);

    document.querySelector(".next").addEventListener("click",function(){
        slideHandler("next");
    },false);


    window.addEventListener("resize", function () {
        mobileMenuList.classList.remove("active");
        overlay.classList.remove("overlayShow");
        iconClose.click();
    });

})();

var direction = function direction() {
    window.open("./page/crud.html", "_blank");
};