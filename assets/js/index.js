"use strict";

if (typeof NodeList.prototype.forEach !== "function") {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

(function () {
  // ------- Notification start -------
  // https://www.gss.com.tw/blog/javascript-notification
  var notifyConfig = {
    body: "\\ ^o^ /", // 設定內容
    image:
      "https://az749841.vo.msecnd.net/siteszhtw/alv1/e4503cca-106d-4e5e-a803-72a1dccff6e8/SiteMap%E5%9C%96%E7%89%87%E6%9B%B4%E6%96%B0_1672x662.3ec174bc91e9b70fa27279e6eabca32e.fill-729x289.jpg",
    icon: "https://az749841.vo.msecnd.net/modulesassets/sfv4/Assets.img.skoda-logo-landscapeV2.a4df7efeb9c9eb4987594f574894ff1e.154x46-Fill.png", // 設定 icon
    tag: "newArrival",
    requireInteraction: true,
  };

//   if (
//     Notification?.permission === "default" ||
//     Notification?.permission === "undefined"
//   ) {
//     Notification.requestPermission(function (permission) {
//       if (permission === "granted") {
//         // 使用者同意授權
//         var n = new Notification("Hi there!", notifyConfig); // 建立通知
//       }
//     });
//   }
  // ------- Notification end -------

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
    activeIndex = 1,
    // 動畫秒數
    transitionSecond = "transform .4s",
    transitionSecondDelay = "transform .4s",
    // 自動播放參數
    autoObj = {
      auto: true,
      autoSecond: 3000,
      interval: null,
      timer: function () {
        autoObj.interval = setInterval(function () {
          slideHandler("next", "auto");
        }, autoObj.autoSecond);
      },
      restTimer: function () {
        if (autoObj.auto) {
          clearInterval(autoObj.interval);
          autoObj.timer();
        }
      },
    };

  slideBoxInit();
  // 初始化
  function slideBoxInit() {
    var touchtime = Number;
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
    var slideWrapper = document.querySelector(".slideWrapper");
    slideWrapper.addEventListener("touchstart", handleTouchStart, false);
    slideWrapper.addEventListener("touchmove", handleTouchMove, false);
    slideWrapper.addEventListener("touchend", handleTouchEnd, false);

    var xDown = null;
    var yDown = null;
    
    function getTouches(evt) {
      return (
        evt.touches || // browser API
        evt.originalEvent.touches
      ); // jQuery
    }

    function handleTouchStart(evt) {
      touchtime = new Date().getTime();
      const firstTouch = getTouches(evt)[0];
      xDown = firstTouch.clientX;
      yDown = firstTouch.clientY;
      clearInterval(autoObj.interval);
    }

    function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }
      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;
      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;
      var timeDiff = Math.abs(touchtime - new Date().getTime());
      // -----------------------------------
      if (
        timeDiff > 400 
      ) {
          slideWrapper.style.transition = "transform .5s";
          slideWrapper.style.transform =
            "translateX(" + (Math.abs(xDiff) > 20
              ? (xDiff < 0 ? 20 : -20) * 10
              : xDiff * 10) + "px)";
      }
    }
    function handleTouchEnd(evt) {
      var xUp = evt.changedTouches[0].clientX,
        yUp = evt.changedTouches[0].clientY,
        xDiff = xDown - xUp,
        yDiff = yDown - yUp,
        timeDiff = Math.abs(touchtime - new Date().getTime());

      // 看參數
      // document.querySelector(".pamrContainer").innerHTML = "";
      // document
      //   .querySelector(".pamrContainer")
      //   .append(`x : ${Math.abs(xDown - xUp)} , y : ${Math.abs(yDown - yUp)} , time : ${timeDiff}`);

      // 上 / 下張 靈敏度調整
      if (
        timeDiff <= 400 &&
        timeDiff > 150 &&
        Math.abs(xDown - xUp) > 50 &&
        Math.abs(yDown - yUp) < 50
      ) {
        // -----------------------------------
        /*most significant*/
        if (xDiff > 0) {
          /* right swipe */
          next.click();
        } else {
          /* left swipe */
          prev.click();
        }
      }
      // 重新計時
      autoObj.restTimer();
      // 放掉後定位於0px
      slideWrapper.style.transform = "translateX(" + 0 + "px)";
    }
  }
  // 上下張處理
  function slideHandler(type, autoFlag) {
    if (!actionFlag) return;
    if (!autoFlag) {
      autoObj.restTimer();
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
      slideBox[activeIndex].style.transition = transitionSecond;
      slideBox[activeIndex].classList.add("active");
    //-----------因應dots增加 end-------------
    nextIndex =
      activeIndex == slideBox.length - 1
        ? 0
        : (activeIndex % (slideBox.length - 1)) + 1;

    if (type === "next") {
      slideBox[nextIndex].style.transition = "unset";
      slideBox[nextIndex].classList.add("startRight");
    }

//     new Notification("Hi, welcome to SKODA !" + activeIndex, notifyConfig);

    // handle dots
    document.querySelector(".dots .item.active").classList.remove("active");
    dots[activeIndex].classList.add("active");
  }
  // 處理dots
  function dotsHandler(index) {
    if (index === activeIndex) return;
    autoObj.restTimer();
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
