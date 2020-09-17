
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

   $(".policy").fancybox();

   (function youtube() {

      var $videos = $('.video');
      var isMobile = ua.Mobile();

      $videos.each(function () {
         var $video = $(this);

         var $link = $video.find('.video-link'),
            $button = $video.find('.video-button'),
            $iframe = $video.find('.iframe-fluid'),
            id = parseLinkURL($link);

         $link.removeAttr('href');



         $video.on('click', function () {
            $('.video-block .video-inner').css('z-index', 10);
            $link.remove();
            $button.remove();
            var iframe = createIframe(id);

            if (isMobile) {
               $video.addClass('active mobile');
            } else {
               $video.addClass('active');
            }

            $iframe.append(iframe);

         });
      })


      function parseLinkURL(link) {

         var regexp = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/i,
            url = link.attr('href'),
            match = url.match(regexp);

         return match[1];

      }

      function createIframe(id) {
         var base = 'https://www.youtube.com/embed/';
         var query = isMobile ? '?rel=0&enablejsapi=1' : '?rel=0&autoplay=1';

         return $('<iframe>', {
            src: base + id + query,
            id: 'player-' + id,
            allow: 'autoplay',
            allowfullscreen: '',
            on: {
               load: function () {
                  isMobile && createPlayer(id);
               }
            }
         });
      }

      function createPlayer(id) {

         var player = new YT.Player('player-' + id, {
            host: "https://www.youtube.com",
            events: {
               'onReady': function (e) {
                  e.target.playVideo();
               }
            }
         });

      }

   })();

   var now = new Date(),
      secPassed = now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();
   var t = (60 * 60 * 24 * 3) - secPassed;

   jQuery('.timer__count').countdown({
      until: (t),
      labels: ['Годы', 'Месяцы', 'Недели', 'Дни', 'Часов', 'Минут', 'Секунд'],
      labels1: ['Годы', 'Месяцы', 'Недели', 'Дни', 'Часов', 'Минут', 'Секунд'],
      format: 'dHM',
      layout: '<ul class="ul-time">' +
         '<li class="time-bg">' +
         '<span>{d10}</span><span>{d1}</span>' +
         '</li>' +
         '<li class="time-bg"> : </li>' +
         '<li class="time-bg">' +
         '<span>{h10}</span><span>{h1}</span>' +
         '</li>' +
         '<li class="time-bg"> : </li>' +
         '<li class="time-bg">' +
         '<span>{m10}</span><span>{m1}</span>' +
         '</li>' +
         '</ul>'
   });

   var today = new Date(),
      tomorrow = new Date(),
      day,
      month,
      year,
      i = 3;

   tomorrow.setDate(today.getDate() + i);

   day = tomorrow.getDate();
   if (day < 10) {
      day = '0' + day;
   }

   month = tomorrow.getMonth() + 1;
   if (month < 10) {
      month = '0' + month;
   }

   year = tomorrow.getFullYear();

   $('.sale__date span').text(day + '.' + month + '.' + String(year).slice(2));

   $('.second .red').css('display', 'none');

   $('.second').on('click', function (e) {
      if ($(e.target).is('.arrow-left') || $(e.target).is('.arrow-right')) {
         $('.second .black').toggle();
         $('.second .red').toggle();
         $(this).closest('.products__item').find('.products__item__image').toggleClass('unactive');
      }
   })

   $('.sprey').on('click', function (e) {
      if ($(e.target).is('.arrow-left') || $(e.target).is('.arrow-right')) {
         $('.sprey .sprey-1').toggle();
         $('.sprey .sprey-2').toggle();
         $(this).closest('.products__item').find('.products__item__image').toggleClass('unactive');
      }
   })

   $('.products__item').on('click', function (e) {
      if ($(e.target).is('.button-description') || $(e.target).is('.close-button')) {
         $(this).closest('.products__item').find('.description').toggle();
         $(this).closest('.products__item').find('.orderForm').toggle();
      }
   })

   $('.testimonials__carousel').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      dotsClass: 'dots-class',
      appendDots: '.dots',
      responsive: [
         {
            breakpoint: 1024,
            settings: {

            }
         }
      ]
   });

   $('.testimonials__arrow-next').on('click', function () {
      $('.testimonials__carousel').slick('slickNext');
   });
   $('.testimonials__arrow-prev').on('click', function () {
      $('.testimonials__carousel').slick('slickPrev');
   });

   $('a[href*="#"]').click(function () {
      $('html, body').animate({
         scrollTop: $($.attr(this, 'href')).offset().top + "px"
      }, {
         duration: 800,
         easing: "swing"
      });
      return false;
   });


   $('.header__image').show();

   $(window).scroll(function () {
      if (isVisible('.advantages__inner', '.advantages__inner')) {
         showImage('.advantages__image');
      }
      if (isVisible('.galery', '.galery')) {
         addAnimClass('.products__item.first');
      }
      if (isVisible('.products__item.first', '.products__item')) {
         addAnimClass('.products__item.second');
      }
      if (isVisible('.products__item.second', '.products__item')) {
         addAnimClass('.products__item.third');
      }
      if (isVisible('.products__item.third', '.products__item')) {
         addAnimClass('.products__item.sprey');
      }
      if (isVisible('.footer', '.footer')) {
         showImage('.footer__image');
      }
   });

   function isVisible(selector, block) {
      let $block = $(block);
      var windowBottom = $(window).scrollTop() + $(window).height();
      var bottom = $block.offset().top + $(selector).height()/1.3;
      return windowBottom >= bottom;
   }

   function showImage(selector) {
      $(selector).css('display', 'block');
   }

   function addAnimClass(selector) {
      $(selector).addClass('animate');
   }

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
            scenesParallax[i] = new Parallax($(this).children('div').attr('data-depth', randomNum(10, 20)).end().get(0), {
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
});



