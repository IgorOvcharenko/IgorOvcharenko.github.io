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

   changeSale('.header, .product, .sprey, .description, .footer', '.new-price', '.old-price', '.sale');
   changeSale('.sprey', '.new-price', '.old-price', '', 30);
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

   function changeSlideNumber(container) {
      $(container + ' .active-slide').text($(container + ' .slick-current').data('number'));
      $(container + ' .next-slide').text($(container + ' .slick-current + .slick-slide').data('number'));
   }

   $('.header__gallery').slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      responsive: [
         {
            breakpoint: 1025,
            settings: 'unslick',
         }
      ]
   });

   window.addEventListener("resize", function () {
      if (window.innerWidth >= 1025) {
         $('.header__gallery').slick({
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            responsive: [
               {
                  breakpoint: 1025,
                  settings: 'unslick',
               }
            ]
         });
      }
   });

   $('.header .arrow-prev').on('click', function () {
      $('.header__gallery').slick('slickPrev');
      changeSlideNumber('.header');
   });
   $('.header .arrow-next').on('click', function () {
      $('.header__gallery').slick('slickNext');
      changeSlideNumber('.header');
   });

   $('.gallery').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false
   });
   $('.gallery-video .arrow-prev').on('click', function () {
      $('.gallery').slick('slickPrev');
      changeSlideNumber('.gallery__wrap');
   });
   $('.gallery-video .arrow-next').on('click', function () {
      $('.gallery').slick('slickNext');
      changeSlideNumber('.gallery__wrap');
   });

   $('.testimonials__slider').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      responsive: [
         {
            breakpoint: 1279,
            settings: {
               slidesToShow: 2
            },
         },
         {
            breakpoint: 767,
            settings: {
               slidesToShow: 1
            },
         },

      ]
   });
   $('.testimonials .arrow-prev').on('click', function () {
      $('.testimonials__slider').slick('slickPrev');
      changeSlideNumber('.testimonials');
   });
   $('.testimonials .arrow-next').on('click', function () {
      $('.testimonials__slider').slick('slickNext');
      changeSlideNumber('.testimonials');
   });

   $('[data-fancybox="gallery"]').fancybox({
      hideScrollbar: false,
      infobar: true,
      loop: true,
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
   $('[data-fancybox="gallery5"]').fancybox({
      hideScrollbar: false,
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
   var t = (60 * 60 * 24 * 3) - secPassed;

   jQuery('.timer').countdown({
      until: (t),
      labels: ['Годы', 'Месяцы', 'Недели', 'Дни', 'Часов', 'Минут', 'Секунд'],
      labels1: ['Годы', 'Месяцы', 'Недели', 'Дни', 'Часов', 'Минут', 'Секунд'],
      format: 'dHMS',
      layout: '<ul class="ul-time">' +
         '<li class="time-bg">' +
         '<span>{d10}</span><span>{d1}</span>' +
         '</li>' +
         '<li class="time-bg">' +
         '<span>{h10}</span><span>{h1}</span>' +
         '</li>' +
         '<li class="time-bg">' +
         '<span>{m10}</span><span>{m1}</span>' +
         '</li>' +
         '<li class="time-bg">' +
         '<span>{s10}</span><span>{s1}</span>' +
         '</li>' +
         '</ul>'
   });

   $('.color').on('click', function () {
      $('.color.white').toggleClass('active');
      $('.color.blue').toggleClass('active');
      $('.sprey__product-1').toggleClass('active');
      $('.sprey__product-2').toggleClass('active');
   })

});