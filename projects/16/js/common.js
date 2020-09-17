
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

   $(".policy").fancybox({
      hideScrollbar: false,
   });

   $('.gallery__inner').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      responsive: [
         {
            breakpoint: 1280,
            settings: {
               slidesToShow: 2,
            },
            breakpoint: 1024,
            settings: {
               slidesToShow: 1,
            },
            breakpoint: 980,
            settings: {
               slidesToShow: 3,
            },
            breakpoint: 601,
            settings: {
               slidesToShow: 1,
            }
         }
      ]
   });

   $('.testimonials__slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      dotsClass: 'dots',
      appendDots: '.dots',
      fade: true,
      cssEase: 'linear'
   });

   $('.arrow-left').on('click', function () {
      $('.testimonials__slider').slick('slickPrev');
   });
   $('.arrow-right').on('click', function () {
      $('.testimonials__slider').slick('slickNext');
   });
   $('.gallery__arrow-left').on('click', function () {
      $('.gallery__inner').slick('slickPrev');
   });
   $('.gallery__arrow-right').on('click', function () {
      $('.gallery__inner').slick('slickNext');
   });

   $('[data-fancybox="gallery"]').fancybox({
      hideScrollbar: false,
   });
   $('[data-fancybox="gallery1"]').fancybox({
      hideScrollbar: false,
   });
   $('[data-fancybox="gallery2"]').fancybox({
      hideScrollbar: false,
   });
   $('[data-fancybox="gallery3"]').fancybox({
      hideScrollbar: false,
   });
   $('[data-fancybox="gallery4"]').fancybox({
      hideScrollbar: false,
   });

   $('.header .main-product').addClass('animated fadeInRight')

   $(window).scroll(function () {
      if (isVisible('.header', '.header')) {
         addAnimClass('.info-block__item', 'fadeInUp');
      }
      if (isVisible('.testimonials__wrap', '.testimonials__wrap')) {
         addAnimClass('.delivery__item', 'fadeInUp');
      }
      if (isVisible('.item-1', '.item-1')) {
         addAnimClass('.item-2', 'fadeInUp');
      }
      if (isVisible('.offer', '.offer')) {
         addAnimClass('.item-3', 'fadeInUp');
      }
      if (isVisible('.item-3', '.item-3')) {
         addAnimClass('.item-4', 'fadeInUp');
      }
      if (isVisible('.advantages-gallery', '.advantages-gallery')) {
         addAnimClass('.item-1', 'fadeInUp');
      }
      if (isVisible('.footer', '.footer')) {
         addAnimClass('.footer .main-product', 'fadeInRight');
      }
   });

   function isVisible(selector, block) {
      let $block = $(block);
      var windowBottom = $(window).scrollTop() + $(window).height();
      var bottom = $block.offset().top + $(selector).height();
      return windowBottom >= bottom;
   }

   function addAnimClass(selector, animationName) {
      $(selector).addClass('animated');
      $(selector).addClass(animationName);
   }

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

   var today = new Date(),
      tomorrow = new Date(),
      day,
      month,
      year,
      i = 2

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

   $('.item__right').on('click', function (e) {
      if ($(e.target).is('.sizes__choice')) {
         $(this).find('.sizes__choice').removeClass('active');
         $(e.target).addClass('active');
         var size = $(e.target).data('size');
         $(this).closest('.item__right').find('.item__size').text(size);
      }
      if ($(e.target).is('.color')) {
         $(this).find('.color').toggleClass('active');
         $(this).closest('.item').find('.item__image').toggleClass('active');
         $(this).closest('.item').find('.item__side-image').toggleClass('active');
         $(this).closest('.item').find('.item__gallery').toggleClass('active');
      }
   })

   $('a[href*="#"]').click(function () {
      $('html, body').animate({
         scrollTop: $($.attr(this, 'href')).offset().top + "px"
      }, {
         duration: 800,
         easing: "swing"
      });
      return false;
   });

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


   changeSale('.header, .item, footer', '.new-price', '.old-price', '.sale__percent');
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

});