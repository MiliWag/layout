"use strict";

// Document ready
document.addEventListener("DOMContentLoaded", function () {
  // cookie statement
  var ktCookieStatementContainer = document.querySelector("#ktCookieStatementContainer");

  if (ktCookieStatementContainer && ktCookieStatementContainer.length !== null) {
    if (!checkCookieRecord("kt-cookie-statement-key")) {
      document.querySelector("#ktCookieStatement").style.display = "block";
    } // Conset to allow cookies


    cookiesConsentButton = document.querySelector("#ktCookieStatementConfirm");

    if (cookiesConsentButton && cookiesConsentButton.length !== null) {
      cookiesConsentButton.addEventListener("click", function () {
        setCookieRecord("kt-cookie-statement-key", 1, 10);
        document.querySelector("#ktCookieStatement").style.display = "none";
      });
    }
  }
}); // Nastaví cookie hodnotu dle klíče po zadanou dobu (pro celou cestu /)

function setCookieRecord(cookieName, cookieValue, expirationDaysCount) {
  var date = new Date();
  date.setFullYear(date.getFullYear() + expirationDaysCount);
  document.cookie = cookieName + "=" + cookieValue + "; path=/; expires=" + date.toUTCString();
} // Smaže cookie hodnotu dle klíče po zadanou dobu (pro celou cestu /)


function removeCookieRecord(cookieName) {
  var date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  document.cookie = cookieName + '=""; path=/; expires=' + date.toUTCString();
} // Vrátí hodnotu cookie dle klíče


function getCookieRecord(cookieName) {
  var name = cookieName + "=";
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookieValue = cookies[i];

    while (cookieValue.charAt(0) == " ") {
      cookieValue = cookieValue.substring(1);
    }

    if (cookieValue.indexOf(name) == 0) {
      return cookieValue.substring(name.length, cookieValue.length);
    }
  }

  return "";
} // Zkontroluje, zda existuje cookie (hodnota dle klíče)


function checkCookieRecord(cookieName) {
  var cookieValue = getCookieRecord(cookieName);

  if (cookieValue != "") {
    return true;
  }

  return false;
} // Odstraní z URL parametr a jeho hodnotu


function removeUrlParameter(parameter) {
  var url = document.location.href;
  var urlParts = url.split("?");

  if (urlParts.length >= 2) {
    var urlBase = urlParts.shift();
    var queryString = urlParts.join("?");
    var prefix = encodeURIComponent(parameter) + "=";
    var parts = queryString.split(/[&;]/g);

    for (var i = parts.length; i-- > 0;) {
      if (parts[i].lastIndexOf(prefix, 0) !== -1) {
        parts.splice(i, 1);
      }
    }

    url = urlBase + "?" + parts.join("&");
    window.history.pushState("", document.title, url);
  }

  return url;
} // Vrátí hodnotu parametru z URL podle jeho klíče (názvu)
// BUJS #1 – getParameterByName by James Padolsey (http://james.padolsey.com/javascript/bujs-1-getparameterbyname/)


function getUrlParameterValue(key) {
  var match = RegExp("[?&]" + key + "=([^&]*)").exec(window.location.search);
  return match && decodeURIComponent(match[1].replace("/+/g", " "));
} // Vrátí hodnotu parametru z URL podle jeho klíče (názvu)
// add or update query string parameter by Niyaz (http://stackoverflow.com/a/6021027)


function addOrUpdateUrlParameterValue(key, value) {
  var url = window.location.href;
  var regExp = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = url.indexOf("?") !== -1 ? "&" : "?";

  if (url.match(regExp)) {
    window.history.pushState({}, null, url.replace(regExp, "$1" + key + "=" + value + "$2"));
  } else {
    window.history.pushState({}, null, url + separator + key + "=" + value);
  }
} // Document ready


document.addEventListener("DOMContentLoaded", function () {
  //Fancybox inicializace
  galleryFancybox();
  fancyboxInit();
}); //WP gallery fancybox

function galleryFancybox() {
  if ($(".gallery").length) {
    var galleryID = "I";
    $(".gallery").each(function () {
      $(this).find(".gallery-icon a").attr("data-fancybox", galleryID);
      galleryID += "I";
    });
  }

  if ($(".wp-block-gallery").length) {
    var galleryID = "W";
    $(".wp-block-gallery").each(function () {
      $(this).find(".blocks-gallery-item a").attr("data-fancybox", galleryID);
      galleryID += "W";
    });
  }
} //Fancybox init


function fancyboxInit() {
  if ($("[data-fancybox]").length) {
    $("[data-fancybox] , .kt-img-link").fancybox({
      animationEffect: "fade",
      idleTime: 99,
      thumbs: {
        autoStart: true,
        axis: "x"
      },
      buttons: ["close" //"zoom",
      //"share",
      //"slideShow",
      //"fullScreen",
      //"download",
      //"thumbs",
      ]
    });
  }
}

$(document).ready(function () {
  // Validování formuláře pomocí jQuery globálně na základě data attributu, který vpisován defaulntě KT_Form třídou
  $('[data-validate="jquery"]').submit(function () {
    $(".validator").remove();
    $("#jquery-kt-validator").remove();
    var showNotice = $(this).data("show-notice");
    var validationResult = $(this).formValidation();
    return validationResult;
  });
  $("input.kt-field, textarea.kt-field").click(function () {
    $(this).next("div.validator").remove();
  });
  $("body").on("click", "div.validator", function () {
    $(this).remove();
  });
  $("input").on("input", function () {
    $(this).siblings(".validator").remove();
  });
});

(function ($) {
  /**
   * jQueryś plugin pro validaci KT_Form na straně browseru
   *
   * @author Tomáš Kocifaj
   * @link http://www.ktstudio.cz
   *
   * @returns {Boolean}
   */
  $.fn.formValidation = function () {
    var dataValidators = "validators";
    var isValid = true;
    var methods = {
      validate: function validate(element) {
        var validators = element.data(dataValidators);

        for (var index in validators) {
          var currentValidator = validators[index];
          var validatorFunction = currentValidator.condition;

          if (currentValidator.condition !== "required" && element.val() === "") {
            continue;
          }

          var result = methods[validatorFunction](element.val(), currentValidator.params);

          if (result === false) {
            element.after(methods.errorMsgContent(currentValidator.msg));
            isValid = false;
            return;
          }
        }
      },
      // validační funkce na základě předané hodnoty
      required: function required(value, param) {
        if (value !== "") {
          return true;
        }

        return false;
      },
      integer: function integer(value, param) {
        return value % 1 === 0;
      },
      "float": function float(value, param) {
        var RE = /^-{0,1}\d*\.{0,1}\d+$/;
        return RE.test(value);
      },
      email: function email(value, param) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(value);
      },
      url: function url(value) {
        var regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regexp.test(value);
      },
      range: function range(value, param) {
        console.log(!methods["float"](value));

        if (!methods["float"](value)) {
          return false;
        }

        var minValue = parseInt(param[0]);
        var maxValue = parseInt(param[1]);

        if (value >= minValue && value <= maxValue) {
          return true;
        }

        return false;
      },
      length: function length(value, param) {
        if (value.length === param) {
          return true;
        }

        return false;
      },
      maxLength: function maxLength(value, param) {
        if (value.length <= param) {
          return true;
        }

        return false;
      },
      minLength: function minLength(value, param) {
        if (value.length >= param) {
          return true;
        }

        return false;
      },
      maxNumber: function maxNumber(value, param) {
        if (!methods["float"](value)) {
          return false;
        }

        value = parseInt(value);

        if (value <= param) {
          return true;
        }

        return false;
      },
      minNumber: function minNumber(value, param) {
        if (!methods["float"](value)) {
          return false;
        }

        value = parseInt(value);

        if (value >= param) {
          return true;
        }

        return false;
      },
      regular: function regular(value, param) {
        var patt = new RegExp(param);
        return patt.test(value);
      },
      // funkce vrátím HTML s chybovou hláškou na základě předané MSG
      errorMsgContent: function errorMsgContent(msg) {
        var html = '<div class="validator">' + '<span class="erorr-s">' + msg + "</span>" + "</div>";
        return html;
      }
    };
    $(this).find("[data-" + dataValidators + "]").each(function () {
      methods.validate($(this));
    });
    return isValid;
  };
})($); // Document ready


document.addEventListener("DOMContentLoaded", function () {
  LazyLoadingInit();
}); // Lazy loading Init

function LazyLoadingInit() {
  var myLazyLoad = new LazyLoad({
    elements_selector: "[data-src], [data-bg]",
    threshold: 400,
    callback_set: function callback_set(el) {
      objectFitImages(el);
    }
  });
  $(document).ajaxComplete(function () {
    myLazyLoad.update();
  });
} // Document ready


document.addEventListener("DOMContentLoaded", function () {
  preventDefaultUtil();
  moveToHtmlTargetInit();
}); //Prevent Default

function preventDefaultUtil() {
  var preventDefaultItems = document.querySelectorAll(".js-prevent-default"),
      i;

  if (preventDefaultItems[0] != undefined) {
    for (i = 0; i < preventDefaultItems.length; ++i) {
      preventDefaultItems[i].addEventListener("click", function (e) {
        e.preventDefault();
      });
    }
  }
} // Funkce pro animované posunutí na prvek v DOM dokumentu


function moveToHtmlTarget(elemnt, topOffset, bottomOffset) {
  var offset = elemnt.offset().top;

  if (topOffset > 0) {
    offset = offset - topOffset;
  }

  if (bottomOffset > 0) {
    offset = offset + bottomOffset;
  }

  $("html, body").animate({
    scrollTop: offset
  }, 1000);
  return this;
}

function moveToHtmlTargetInit() {
  $("[data-kt-target]").click(function () {
    var targetElement = $($(this).data("kt-target"));
    var targetBottomOffset = $(this).data("kt-bottom-offset");
    var targetTopOffset = $(this).data("kt-top-offset");
    moveToHtmlTarget(targetElement, targetTopOffset, targetBottomOffset);
  });
} //Document ready


$(function () {
  asideNavMobile();
}); //Resize
//Resize

$(window).resize(function () {
  if (window.matchMedia("(min-width: 62em)").matches) {
    asideNavResizeReset();
  }
}); //Functions

function asideNavMobile() {
  $(".widget_categories .widgettitle").click(function () {
    //Up to tablet portrait - up to 991px
    if (window.matchMedia("(max-width: 61.938em)").matches) {
      $(this).closest(".widget_categories").find("ul").stop().slideToggle(300);
      $(this).toggleClass("js-open");
    }
  });
  $(".widget_nav_menu .widgettitle").click(function () {
    //Up to tablet portrait - up to 991px
    if (window.matchMedia("(max-width: 61.938em)").matches) {
      $(".widget_nav_menu > div > ul").stop().slideToggle(300);
      $(this).toggleClass("js-open");
    }
  });
  $(".widget_pages .widgettitle").click(function () {
    //Up to tablet portrait - up to 991px
    if (window.matchMedia("(max-width: 61.938em)").matches) {
      $(".widget_pages > ul").stop().slideToggle(300);
      $(this).toggleClass("js-open");
    }
  }); //Widget categories with select

  $(".widget_categories select").closest(".widget_categories").addClass("widget_categories_select");
  $(".widget_categories select").selectric();
}

function asideNavResizeReset() {
  $(".aside-nav-heading").removeClass("js-open");
  $(".aside-nav nav").removeAttr("style");
  $(".widget ul").removeAttr("style");
} //Document ready


$(function () {
  headerNavButtonClick();
  headerMaskClick();
  desktopSubmenu();
  mobileSubmenuInit();
  mobileSubmenu();
  headerSearch();
  headerLang(); //Initializations

  $(".header-main").headroom({
    offset: 0,
    onTop: function onTop() {//SomeCoolFunction()
    },
    onNotTop: function onNotTop() {//EvenCoolerFunction()
    }
  });
}); //Resize

$(window).resize(function () {
  if (window.matchMedia("(min-width: 62em)").matches) {
    $(".nav-main").removeClass("js-transition");
    headerMaskHide();
    headerNavHide();
  }

  if (window.matchMedia("(min-width: 36em)").matches) {
    if ($(".header-search-inner").hasClass("js-search-open")) {
      headerSearchClose();
      headerMaskHide();
    }
  }
}); //Header nav

function headerNavButtonClick() {
  $(".header-nav-button").click(function () {
    if (!$(".nav-main").hasClass("js-open")) {
      headerNavShow();
      headerMaskShow();
    } else {
      headerNavHide();
      headerMaskHide();
    }

    if (!$(".nav-main").hasClass("js-transition")) {
      $(".nav-main").addClass("js-transition");
    }
  });
}

function headerNavShow() {
  $(".nav-main").addClass("js-open");
  $(".header-nav-button").addClass("js-open");
  $("body,html").addClass("js-no-scroll");
}

function headerNavHide() {
  $(".nav-main").removeClass("js-open");
  $(".header-nav-button").removeClass("js-open");
  $("body,html").removeClass("js-no-scroll");

  if (window.matchMedia("(max-width: 61.938em)").matches) {} //Sub menu close


  $(".sub-menu-button").removeClass("js-open");
  $(".sub-menu-button").closest(".menu-item-has-children").removeClass("js-open");
  $(".sub-menu-button").prev(".sub-menu").find(".js-open").removeClass("js-open");
  $(".nav-main").find(".sub-menu").slideUp(300);
} //Header lang


function headerLang() {
  $(".header-language-current").click(function () {
    $(".header-language-list").toggleClass("js-open");
  }); //Close

  $(document).click(function (e) {
    if (!$(".header-language-switcher *").is(e.target) && $(".header-language-list").has(e.target).length === 0) {
      $(".header-language-list").removeClass("js-open");
    }
  });
} //Header Mask


function headerMaskClick() {
  $(".header-mask").click(function () {
    headerNavHide();
    headerMaskHide();
  });
}

function headerMaskShow() {
  $(".header-mask").addClass("js-active");
}

function headerMaskHide() {
  $(".header-mask").removeClass("js-active");
} //Desktop submenu


function desktopSubmenu() {
  if (window.matchMedia("(min-width: 62em)").matches) {
    $(".sub-menu .menu-item-has-children").mouseover(function () {
      $(".sub-menu .sub-menu").each(function () {
        var leftOffset = $(this).offset().left;
        elWidht = $(this).width();

        if ($(window).width() <= leftOffset + elWidht + 5) {
          $(this).addClass("js-sub-menu-left");
        }
      });
    });
  }
} //Mobile submenu init


function mobileSubmenuInit() {
  $(".menu-item-has-children").append('<span class="sub-menu-button"></span>');
} //Mobile submenu


function mobileSubmenu() {
  $(".sub-menu-button").click(function () {
    if (!$(this).hasClass("js-open")) {
      $(this).addClass("js-open");
      $(this).closest(".menu-item-has-children").addClass("js-open");
      $(this).prev(".sub-menu").slideDown(300);
    } else {
      $(this).removeClass("js-open");
      $(this).closest(".menu-item-has-children").removeClass("js-open");
      $(this).prev(".sub-menu").find(".js-open").removeClass("js-open");
      $(this).prev(".sub-menu").slideUp(300);
      $(this).prev(".sub-menu").find(".sub-menu").slideUp(300);
    }
  });
} //Header search


function headerSearch() {
  $(".header-search-button").click(function () {
    if (!$(".header-search-inner").hasClass("js-search-open")) {
      headerSearchOpen();
    } else {
      headerSearchClose();
      headerMaskHide();
    }
  });
  $(document).click(function (e) {
    if (!$(".header-search *").is(e.target) && $(".header-search-inner").has(e.target).length === 0) {
      if ($(".header-search-inner").hasClass("js-search-open")) {
        headerSearchClose();
      }
    }
  });
}

function headerSearchOpen() {
  $(".header-search-inner").addClass("js-search-open");
  $(".header-search-input").focus();

  if (window.matchMedia("(max-width: 35.938em)").matches) {
    headerMaskShow();
    $("body,html").addClass("js-no-scroll");
  }

  $(".header-search-inner").addClass("js-animate");
}

function headerSearchClose() {
  $(".header-search-inner").removeClass("js-animate");
  $(".header-search-inner").removeClass("js-search-open");
  $(".header-search-input").val("");
  $("body,html").removeClass("js-no-scroll");
} //Document ready


$(function () {
  hpSliderInit();
  hpSliderButtonSize();
}); //Resize

$(window).resize(function () {
  hpSliderButtonSize();
}); //Functions
//Hp slider init

function hpSliderInit() {
  $(".hp-slider").slick({
    infinite: false,
    lazyLoad: "ondemand",
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    //fade: true,
    prevArrow: $(".hp-slider-prev"),
    nextArrow: $(".hp-slider-next"),
    dots: true,
    appendDots: $(".hp-slider-buttons"),
    responsive: [{
      breakpoint: 768,
      settings: {
        autoplay: false
      }
    }]
  }).on("setPosition", function (event, slick) {
    slick.$slides.css("height", slick.$slideTrack.height() + "px");
  });
} //Hp slider button size


function hpSliderButtonSize() {
  //Up to phone landscape - up to 767px
  if (window.matchMedia("(max-width: 47.938em)").matches) {
    $(".hp-slider-button").removeClass("btn-large");
    $(".hp-slider-button").addClass("btn-small");
  } //Tablet portrait - from 768px


  if (window.matchMedia("(min-width: 48em)").matches) {
    $(".hp-slider-button").removeClass("btn-small");
    $(".hp-slider-button").addClass("btn-large");
  }
}

function myFunction() {
  var navbarToggler = document.querySelector('#navbarToggler');
  var navbar = document.querySelector('#navbar');
  navbarToggler.classList.toggle('change');
  navbar.classList.toggle('menu-show');
  console.log('kliknuto');
} //Document ready


$(function () {
  commentResponse();
  commentResponseCancel();
}); //Functions

function commentResponse() {
  $(".comments-item-reply span").click(function () {
    $("#comment_parent").val($(this).parent(".comments-item-reply").data("comment-id"));
    moveToHtmlTarget($("#commentform"), 90, 0);
    $(".comment-form-quote-notice").remove();
    $("#commentform").prepend('<div class="comment-form-quote-notice"><span>Odpověď na:</span> <span>"' + $(this).closest(".comments-item").find(".comments-item-content p").text().substring(0, 115) + '..."</span><span class="quote-notice-remove"></span></div>');
  });
}

function commentResponseCancel() {
  $(document).on("click", ".quote-notice-remove", function () {
    $(this).parent(".comment-form-quote-notice").remove();
    $("#comment_parent").val(0);
  });
}