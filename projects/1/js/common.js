var ua = {

   Android: function () {
      return !!navigator.userAgent.match(/android/i);
   },

   iOS: function () {
      return !!navigator.platform.match(/ip(hone|od|ad)/i);
   },

   Mac: function () {
      return /mac/i.test(navigator.platform);
   },

   Apple: function () {
      return (ua.iOS() || ua.Mac());
   },

   Mobile: function () {
      return (ua.iOS() || ua.Android())
   },

   IE: function () {
      return /msie|trident/i.test(navigator.userAgent);
   },

   Edge: function () {
      return /Edg(e|)/i.test(navigator.userAgent);
   },

   Chrome: function () {
      return /chrom(e|ium)/i.test(navigator.userAgent);
   },

   Firefox: function () {
      return /firefox/i.test(navigator.userAgent);
   },

   Safari: function () {
      return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
   }

};

$(document).ready(function () {

   if (ua.Firefox()) {
      $('.video').attr({
         controls: true
      })
   }

   new WOW().init();

   var path = $('body').data('path');

   $('.order__photo').each(function () { // the containers for all your galleries
      $(this).magnificPopup({
         delegate: 'a', // the selector for gallery item
         type: 'image',
         gallery: {
            enabled: true
         }
      });
   });

   $('.order').click(function (e) {
      if ($(e.target).hasClass('colors__item') || $(e.target).hasClass('order__colors__image')) {
         switch ($(e.target).data('color')) {
            case 'gray':
               $('.colors__item').removeClass('active')
               $('.colors__item.gray').addClass('active')
               $('.order__colors__item').removeClass('active')
               $('.order__colors__item.gray').addClass('active')
               $('.order__product').removeClass('active');
               $('.order__photo').removeClass('active');
               $('.order__product.gray').addClass('active');
               $('.order__photo.gray').addClass('active');
               break;
            case 'silver':
               $('.colors__item').removeClass('active')
               $('.colors__item.silver').addClass('active')
               $('.order__colors__item').removeClass('active')
               $('.order__colors__item.silver').addClass('active')
               $('.order__product').removeClass('active');
               $('.order__photo').removeClass('active');
               $('.order__product.silver').addClass('active');
               $('.order__photo.silver').addClass('active');
               break;
            case 'gold':
               $('.colors__item').removeClass('active')
               $('.colors__item.gold').addClass('active')
               $('.order__colors__item').removeClass('active')
               $('.order__colors__item.gold').addClass('active')
               $('.order__product').removeClass('active');
               $('.order__photo').removeClass('active');
               $('.order__product.gold').addClass('active');
               $('.order__photo.gold').addClass('active');
               break;
            default:
               break;
         }
      }
   });


   $('.testimonials__slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      mobileFirst: true,
      rows: 1,
      responsive: [
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
            }
         },
         {
            breakpoint: 991,
            settings: {
               slidesToShow: 3,
            }
         },
         {
            breakpoint: 1200,
            settings: "unslick"
         },
      ]
   });

   $('.testimonials .left').on('click', function () {
      $('.testimonials__slider').slick('slickPrev');
   });
   $('.testimonials .right').on('click', function () {
      $('.testimonials__slider').slick('slickNext');
   });


   //changeSale('.header, .footer, .item', '.new-price', '.old-price', '.sale');
   function changeSale(container, newPrice, oldPrice, sale, saleNumber) {
      var container = container;

      $(newPrice).each(function () {
         var price = parseInt($(this).text()),
            percent = $(this).closest(container).find(sale).text().replace(/[^0-9]/gim, ''),
            currency = $(this).text().replace(/[0-9]/g, '');

         if (sale.length == '') {
            percent = saleNumber;
         }

         price = Math.ceil((price * 100) / (100 - percent));
         $(this).closest(container).find(oldPrice).text(price + " " + currency);
      });
   }

   $('a[href*="#"]').click(function () {
      $('html, body').animate({
         scrollTop: $($.attr(this, 'href')).offset().top + "px"
      }, {
         duration: 800,
         easing: "swing"
      });
      return false;
   });

   if (navigator.userAgent.toLowerCase().match(/(ipad|iphone)/)) {
   } else {
      var scenesParallax = [];

      mQ("(max-width: 1199px)", function () {
         if (!scenesParallax.length) return
         scenesParallax.forEach(function (scene) {
            scene.disable();
            scene.element.removeAttribute('style');
         })
      }, function () {
         if (scenesParallax.length === 0) {
            $('.parallax').each(function (i) {
               scenesParallax[i] = new Parallax($(this).children('div').attr('data-depth', randomNum(15, 15)).end().get(0), {
                  frictionX: 0.03,
                  frictionY: 0.03,
                  invertX: Math.random() >= 0.5,
                  invertY: Math.random() >= 0.5
               });
            })
         } else {
            scenesParallax.forEach(function (scene) {
               scene.enable();
            })
         }
      });

      function randomNum(min, max) {
         var numLow = min, numHigh = max,
            adjustedHigh = (parseFloat(numHigh) - parseFloat(numLow)) + 1;
         return Math.floor(Math.random() * adjustedHigh) + parseFloat(numLow);
      }
      function mQ(mqStr, match, mismatch) {
         var mq = matchMedia(mqStr);
         mq.addListener(widthChange);
         widthChange(mq);
         function widthChange(mq) {
            if (mq.matches) {
               match();
            } else {
               mismatch();
            }
         }
      }
   }
   var now = new Date()
   var isMobile = ua.Mobile();

   function instock(elem, settings) {
      var $instock = $(elem);

      var defaults = {
         minNum: 5,
         delay: 1000,
         startHours: 6, // 0 - 23
      };

      var options = $.extend({}, defaults, settings);

      var $numElem = $instock.find(".protection__quantity__number");
      var numCount = parseInt($numElem.text(), 10);

      var start = new Date();
      start.setHours(options.startHours, 0, 0, 0);
      var end = new Date();
      end.setHours(23, 59, 59, 999);

      var startOfDay = start.getTime();
      var endOfDay = end.getTime();

      var step = (endOfDay - startOfDay) / (numCount - options.minNum);
      var numLeft = numCount;

      update();
      var instockInterval = setInterval(update, 60000);

      function update() {
         if (now.getTime() < startOfDay) return;

         numLeft = numCount - Math.round((Date.now() - startOfDay) / step);

         if (numLeft <= options.minNum) {
            numLeft = options.minNum;
            clearInterval(instockInterval);
         }

         updateNum(numLeft);
      }

      setTimeout(addActiveClass, options.delay);

      function addActiveClass() {
         $instock.addClass("active");
      }

      function removeActiveClass() {
         $instock.removeClass("active");
      }

      function updateNum(num) {
         $numElem.text(num);
      }

      $instock.on("click", function () {
         $orderLink.eq(0).trigger("click");
      });

      if (isMobile) {
         $(window).scroll(function () {
            if (
               $(window).scrollTop() + $(window).height() >=
               $(document).height() - 200 ||
               ($(window).scrollTop() + $(window).height() >=
                  $("#order").offset().top &&
                  $(window).scrollTop() <
                  $("#order").offset().top + $("#order").height())
            ) {
               removeActiveClass();
            } else {
               addActiveClass();
            }
         });
      }
   }

   instock(".protection__quantity")
});