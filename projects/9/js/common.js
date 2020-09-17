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

   if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
      $('.advantages').click(function (e) {
         if ($(e.target)[0].closest('.advantages__item')) {
            $('.advantages__item__title').css('border-radius', '22px');
            $('.advantages__item__text').css('top', '-140px');
            $(e.target).closest('.advantages__item').find('.advantages__item__title').css('border-radius', '0');
            $(e.target).closest('.advantages__item').find('.advantages__item__text').css('top', '0');
         }
         else {
            $('.advantages__item__title').css('border-radius', '22px');
            $('.advantages__item__text').css('top', '-140px');
         }
      });
   }

   new WOW().init();

   $('[data-fancybox="gallery"]').fancybox({
      hideScrollbar: false,
      infobar: false,
      arrows: true,
      loop: true,
   });
   $('[data-fancybox="gallery1"]').fancybox({
      hideScrollbar: false,
      infobar: false,
      arrows: true,
      loop: true,
   });
   $('[data-fancybox="gallery2"]').fancybox({
      hideScrollbar: false,
      infobar: false,
      arrows: true,
      loop: true,
   });
   $('[data-fancybox="gallery3"]').fancybox({
      hideScrollbar: false,
      infobar: false,
      arrows: true,
      loop: true,
   });
   $('[data-fancybox="gallery4"]').fancybox({
      hideScrollbar: false,
      infobar: false,
      arrows: true,
      loop: true,
   });

   $('[data-fancybox="gallery10"]').fancybox({
      hideScrollbar: false,
      infobar: false,
      arrows: true,
      loop: true,
   });

   $(".policy").fancybox({
      hideScrollbar: false,
   });


   $('.testimonials__slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      dotsClass: 'dots',
   });

   $('.testimonials .left').on('click', function () {
      $('.testimonials__slider').slick('slickPrev');
   });
   $('.testimonials .right').on('click', function () {
      $('.testimonials__slider').slick('slickNext');
   });

   $('.gallery__slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      fade: true,
      cssEase: 'linear',
      dotsClass: 'dots',
   });

   $('.gallery .left').on('click', function () {
      $('.gallery__slider').slick('slickPrev');
   });
   $('.gallery .right').on('click', function () {
      $('.gallery__slider').slick('slickNext');
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

   $('.sale-date span').text(day + '.' + month + '.' + String(year).slice(2));
});