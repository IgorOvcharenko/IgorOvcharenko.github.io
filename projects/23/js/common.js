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

   $('.usage__slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      fade: true,
      rows: 0,
      dotsClass: 'dots',
   });

   $('.usage .left').on('click', function () {
      $('.usage__slider').slick('slickPrev');
   });
   $('.usage .right').on('click', function () {
      $('.usage__slider').slick('slickNext');
   });

   $('.testimonials__slider').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      rows: 0,
      dotsClass: 'dots',
      responsive: [
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 2,
            }
         },
         {
            breakpoint: 576,
            settings: {
               slidesToShow: 1,
               dots: true,
            }
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


   var now = new Date(),
      secPassed = now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();
   var t = (60 * 60 * 24 * 2) - secPassed;

   jQuery('.timer').countdown({
      until: (t),
      labels: ['Годы', 'Месяцы', 'Недели', 'Дни', 'Часов', 'Минут', 'Секунд'],
      labels1: ['Годы', 'Месяцы', 'Недели', 'Дни', 'Часов', 'Минут', 'Секунд'],
      format: 'dHMS',
      layout: '<ul class="ul-time">' +
         '<li class="time-bg">' +
         '<span>{d10}</span><span>{d1}</span>' +
         '<p>Дней</p>' +
         '</li>' +
         '<li class="time-bg">' +
         '<span>{h10}</span><span>{h1}</span>' +
         '<p>Часов</p>' +
         '</li>' +
         '<li class="time-bg">' +
         '<span>{m10}</span><span>{m1}</span>' +
         '<p>Минут</p>' +
         '</li>' +
         '<li class="time-bg">' +
         '<span>{s10}</span><span>{s1}</span>' +
         '<p>Секунд</p>' +
         '</li>' +
         '</ul>'
   });

   if (navigator.userAgent.toLowerCase().match(/(ipad|iphone)/)) {

   } else {
      var scenesParallax = [];

      mQ("(max-width: 991px)", function () {
         if (!scenesParallax.length) return
         scenesParallax.forEach(function (scene) {
            scene.disable();
            scene.element.removeAttribute('style');
         })
      }, function () {
         if (scenesParallax.length === 0) {
            $('.parallax').each(function (i) {
               scenesParallax[i] = new Parallax($(this).children('div').attr('data-depth', randomNum(15, 15)).end().get(0), {
                  frictionX: 0.01,
                  frictionY: 0.01,
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

});