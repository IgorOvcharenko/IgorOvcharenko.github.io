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

   changeSale('.header, .footer, .offer', '.new-price', '.old-price', '.sale');
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

   $('.sale-date span').text(+ day + '.' + month + '.' + year);



   $('[data-fancybox="gallery"]').fancybox({
      hideScrollbar: false,
      loop: true,
   });
   $('[data-fancybox="gallery1"]').fancybox({
      hideScrollbar: false,
      loop: true,
   });
   $('[data-fancybox="gallery2"]').fancybox({
      hideScrollbar: false,
      loop: true,
   });
   $('[data-fancybox="gallery3"]').fancybox({
      hideScrollbar: false,
      loop: true,
   });
   $('[data-fancybox="gallery4"]').fancybox({
      hideScrollbar: false,
      loop: true,
   });
   $('[data-fancybox="gallery5"]').fancybox({
      hideScrollbar: false,
      loop: true,
   });
   $('[data-fancybox="gallery6"]').fancybox({
      hideScrollbar: false,
      loop: true,
   });
   $('[data-fancybox="gallery0"]').fancybox({
      hideScrollbar: false,
      loop: true,
   });
   $('[data-fancybox="policy"]').fancybox({
      hideScrollbar: false,
      loop: true,
   });

   $('.offer-gallery__gallery').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      dotsClass: 'dots',
      speed: 200,
      fade: true,
      cssEase: 'linear',
   });

   $('.arrows .left').on('click', function () {
      $('.offer-gallery__gallery').slick('slickPrev');
   });
   $('.arrows .right').on('click', function () {
      $('.offer-gallery__gallery').slick('slickNext');
   });

   $('.testimonials__slider').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      dotsClass: 'dots',
      dots: true,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1
            }
         },
         {
            breakpoint: 900,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }
      ]
   });

   $('.testimonials-delivery .arrows .left').on('click', function () {
      $('.testimonials__slider').slick('slickPrev');
   });
   $('.testimonials-delivery .arrows .right').on('click', function () {
      $('.testimonials__slider').slick('slickNext');
   });

   $('.gallery .slick-current').next().addClass('slick-next');

   $('a[href*="#"]').click(function () {
      $('html, body').animate({
         scrollTop: $($.attr(this, 'href')).offset().top + "px"
      }, {
         duration: 800,
         easing: "swing"
      });
      return false;
   });

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
               invertX: Math.random() >= 0.1,
               invertY: Math.random() >= 0.1
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