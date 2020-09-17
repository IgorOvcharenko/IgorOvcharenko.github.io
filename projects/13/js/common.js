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

   $('.gallery__slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      centerMode: true,
      speed: 200,
      fade: true,
      cssEase: 'linear',
   });

   $('.gallery .slick-current').next().addClass('slick-next');
   $('.slick-slide[data-slick-index="5"]').addClass('slick-prev');

   function addClassToSiblings() {
      var next = 'slick-next';
      var prev = 'slick-prev';
      $('.gallery .slick-slide').removeClass(next);
      if ($('.gallery .slick-current').next()[0]) {
         $('.gallery .slick-current').next().addClass(next);
      } else {
         $('.slick-slide[data-slick-index="0"]').addClass(next);
      }
      $('.gallery .slick-slide').removeClass(prev);
      if ($('.gallery .slick-current').prev()[0]) {
         $('.gallery .slick-current').prev().addClass(prev);
      } else {
         $('.slick-slide[data-slick-index="5"]').addClass(prev);
      }
   }

   $('.arrows .left').on('click', function () {
      $('.gallery__slider').slick('slickPrev');
      addClassToSiblings();
   });
   $('.arrows .right').on('click', function () {
      $('.gallery__slider').slick('slickNext');
      addClassToSiblings();
   });

   $('.testimonials__slider').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1
            }
         },
         {
            breakpoint: 800,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }
      ]
   });

   $('.testimonials .arrows .left').on('click', function () {
      $('.testimonials__slider').slick('slickPrev');
   });
   $('.testimonials .arrows .right').on('click', function () {
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

});