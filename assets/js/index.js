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
    var footerItemContainerfFlag =
      footerItemContainer.classList.contains("displayShow");
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

  //--------- slideBox start ---------
  // slideBox參數
  var slideBox = document.querySelectorAll(".slideBox"),
    dots = document.querySelectorAll(".dots .item"),
    // 動畫是否執行中
    actionFlag = true,
    // 預期上一張下一張
    nextIndex = 0,
    // 預設顯示第幾張
    activeIndex = 2,
    // 動畫秒數
    transitionSecond = "transform .5s",
    transitionSecondDelay = "transform .5s 100ms",
    // 自動播放參數
    autoObj = {
      auto: true,
      autoSecond: 3000,
      interval: null,
      timer: function () {
        autoObj.interval = setInterval(function () {
          if (autoObj.auto) {
            slideHandler("next", "auto");
          } else {
            clearInterval(autoObj.interval);
            autoObj.auto = true;
            autoObj.timer();
          }
        }, autoObj.autoSecond);
      },
    };
  slideBoxInit();
  // 初始化
  function slideBoxInit() {
    var prev = document.querySelector(".prev"),
      next = document.querySelector(".next");
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

    dots.forEach(function (element, index) {
      element.addEventListener(
        "click",
        function (e) {
          let clickItem = Number(element.dataset.item);
          dotsHandler(clickItem);
        },
        false
      );
    });

    slideBox[activeIndex].classList.add("active");
    slideBox[
      (nextIndex += activeIndex == slideBox.length - 1 ? 0 : 1 + activeIndex)
    ].classList.add("startRight");
    dots[activeIndex].classList.add("active");
    // 是否自動播放
    if (autoObj.auto) autoObj.timer();
    // --------touch---------
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);

    var xDown = null;
    var yDown = null;

    function getTouches(evt) {
      return (
        evt.touches || // browser API
        evt.originalEvent.touches
      ); // jQuery
    }

    function handleTouchStart(evt) {
      const firstTouch = getTouches(evt)[0];
      xDown = firstTouch.clientX;
      yDown = firstTouch.clientY;
    }

    function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        /*most significant*/
        if (xDiff > 0) {
          /* right swipe */
          next.click();
        } else {
          /* left swipe */
          prev.click();
        }
      } else {
        if (yDiff > 0) {
          /* down swipe */
        } else {
          /* up swipe */
        }
      }
      /* reset values */
      xDown = null;
      yDown = null;
    }
  }
  // 上下張處理
  function slideHandler(type, autoFlag) {
    if (!actionFlag) return;
    if (!autoFlag) {
      autoObj.auto = false;
    }
    if (type === "prev") {
      slideBox[nextIndex].style.transition = "unset";
      slideBox[nextIndex].classList.remove("startRight");
    }

    slideBox[activeIndex].classList.remove("active");
    slideBox[activeIndex].style.transition = transitionSecondDelay;
    slideBox[activeIndex].classList[type === "prev" ? "add" : "remove"](
      "startRight"
    );

    // 計算要顯示哪張
    type === "next"
      ? activeIndex < slideBox.length - 1
        ? activeIndex++
        : (activeIndex = 0)
      : activeIndex > 0
      ? activeIndex--
      : (activeIndex = slideBox.length - 1);

    //-----------因應dots增加 start-------------
    if (type === "next") {
      slideBox[activeIndex].style.transition = "unset";
      slideBox[activeIndex].classList.add("startRight");
    } else {
      if (activeIndex === slideBox.length - 1) {
        slideBox[activeIndex].style.transition = "unset";
        slideBox[activeIndex].classList.remove("startRight");
      }
    }
    setTimeout(function () {
      slideBox[activeIndex].style.transition = transitionSecond;
      slideBox[activeIndex].classList.add("active");
    }, 100);
    //-----------因應dots增加 end-------------
    nextIndex =
      activeIndex == slideBox.length - 1
        ? 0
        : (activeIndex % (slideBox.length - 1)) + 1;

    if (type === "next") {
      slideBox[nextIndex].style.transition = "unset";
      slideBox[nextIndex].classList.add("startRight");
    }

    // handle dots
    document.querySelector(".dots .item.active").classList.remove("active");
    dots[activeIndex].classList.add("active");
  }
  // 處理dots
  function dotsHandler(index) {
    if (index === activeIndex) return;
    autoObj.auto = false;
    // 全部狀態歸0
    slideBox.forEach(function (element, index) {
      element.classList.remove("startRight");
      element.classList.remove("active");
      element.removeAttribute("style");
    });
    document.querySelector(".dots .item.active").classList.remove("active");

    // 上一張
    if (index < activeIndex) {
      slideBox[activeIndex].style.transition = transitionSecond;
      slideBox[activeIndex].classList.add("startRight");
      setTimeout(function () {
        slideBox[index].style.transition = transitionSecond;
        slideBox[index].classList.add("active");
      });
    }
    // 下一張
    else if (index > activeIndex) {
      slideBox[activeIndex].style.transition = transitionSecond;
      slideBox[index].classList.add("startRight");
      setTimeout(function () {
        slideBox[activeIndex].classList.remove("startRight");
        slideBox[index].style.transition = transitionSecond;
        slideBox[index].classList.add("active");
      });
    }
    activeIndex = index;
    dots[index].classList.add("active");
  }
  //--------- slideBox end ---------

  window.addEventListener("resize", function () {
    mobileMenuList.classList.remove("active");
    overlay.classList.remove("overlayShow");
    iconClose.click();
  });
})();

var direction = function direction() {
  window.open("./page/crud.html", "_blank");
};
