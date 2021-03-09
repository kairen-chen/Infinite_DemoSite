"use strict";

if (typeof NodeList.prototype.forEach !== "function") {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

(function () {
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
  iconHamburger.addEventListener("click", function () {
    hamburgerIsOpen = mobileMenuList.classList.contains("active");
    mobileMenuList.classList[hamburgerIsOpen ? "remove" : "add"]("active");
    mobileMenuList.classList[hamburgerIsOpen ? "add" : "remove"]("remove");
    overlay.classList[hamburgerIsOpen ? "remove" : "add"]("overlayShow");
  });

  function deskRightSectionNavToggle(flag) {
    deskRightSectionNav.classList[flag ? "add" : "remove"]("show");
    deskRightSectionNav.classList[flag ? "remove" : "add"]("hidden");
    searchContainer.classList[flag ? "add" : "remove"]("hidden");
    searchContainer.classList[flag ? "remove" : "add"]("show");
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
  overlay.addEventListener("click", function () {
    if (mobileMenuList.classList.contains("active")) iconHamburger.click();
  });

  // Mobile footer 了解更多
  deskSemobileWatchMorearch.addEventListener("click", function () {
    var footerItemContainerfFlag = footerItemContainer.classList.contains(
      "displayShow"
    );
    footerItemContainer.classList[footerItemContainerfFlag ? "remove" : "add"](
      "displayShow"
    );
    iconAngleUp.classList[footerItemContainerfFlag ? "add" : "remove"](
      "displayShow"
    );
    iconAngleDown.classList[footerItemContainerfFlag ? "add" : "remove"](
      "displayHidden"
    );
  });

  // slideBox
  var slideBox = document.querySelectorAll(".slideBox"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    activeIndex = 0,
    transitionSecond = "transform 0.5s",
    actionFlag = true,
    nextIndex = 0;
  slideBox[activeIndex].classList.add("active");
  slideBox[ nextIndex += ( activeIndex == (slideBox.length - 1) ) ? 0 : 1 + activeIndex] .classList.add("startRight");

  function slideHandler(type) {
    if (!actionFlag) return;

    if (type === "prev") {
      slideBox[nextIndex].style.transition = "unset";
      slideBox[nextIndex].classList.remove("startRight");
    } 

    slideBox[activeIndex].classList.remove("active");
    slideBox[activeIndex].style.transition = transitionSecond;
    slideBox[activeIndex].classList[type === "prev" ? "add" : "remove"]("startRight");

    // 計算要顯示哪張slide
    type === "next"
      ? activeIndex < slideBox.length - 1
        ? activeIndex++
        : (activeIndex = 0)
      : activeIndex > 0
      ? activeIndex--
      : (activeIndex = slideBox.length - 1);
      
      
      slideBox[ activeIndex ].style.transition = transitionSecond;
      slideBox[ activeIndex ].classList.add("active");
      nextIndex = activeIndex == slideBox.length - 1 ? 0 : (activeIndex % (slideBox.length - 1) + 1);
      
      if(type === "next"){
        slideBox[ nextIndex ].style.transition = "unset";
        slideBox[ nextIndex ].classList.add("startRight");
      }
      
  }

  // 管控動畫結束再執行下一動作
  slideBox.forEach(function (element, index) {
    element.addEventListener(
      "transitionend",
      function (e) {
        actionFlag = true;
      },
      false
    );
    element.addEventListener(
      "transitionstart",
      function (e) {
        actionFlag = false;
      },
      false
    );
  });

  prev.addEventListener(
    "click",
    function () {
      slideHandler("prev");
    },
    false
  );

  next.addEventListener(
    "click",
    function () {
      slideHandler("next");
    },
    false
  );

  window.addEventListener("resize", function () {
    mobileMenuList.classList.remove("active");
    overlay.classList.remove("overlayShow");
    iconClose.click();
  });
})();

var direction = function direction() {
  window.open("./page/crud.html", "_blank");
};
