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

   new WOW().init();

   var path = $('body').data('path');

   $('[data-fancybox="gallery"]').fancybox({
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
   $('[data-fancybox="gallery5"]').fancybox({
      hideScrollbar: false,
      infobar: false,
      arrows: true,
      loop: true,
   });
   $('[data-fancybox="gallery6"]').fancybox({
      hideScrollbar: false,
      infobar: false,
      arrows: true,
      loop: true,
   });

   function changeNumbers(container) {
      $(container + ' .active-slide').text($(container + ' .slick-active').find('.header__slider__image').data('number'));
      if ($(container + ' .active-slide').text() === "01") {
         $(container + ' .next-slide').text("02")
         $(container + ' .after-next-slide').text("03")
      } else if ($(container + ' .active-slide').text() === "02") {
         $(container + ' .next-slide').text("03")
         $(container + ' .after-next-slide').text("01")
      } else {
         $(container + ' .next-slide').text("01")
         $(container + ' .after-next-slide').text("02")
      }
   }

   $('.header .header__slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      fade: true,
   });

   $('.header .left').on('click', function () {
      $('.header__slider').slick('slickPrev');
      changeNumbers('.header');
   });
   $('.header .right').on('click', function () {
      $('.header__slider').slick('slickNext');
      changeNumbers('.header');
   });

   $('.footer .header__slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      fade: true,
   });

   $('.footer .left').on('click', function () {
      $('.footer .header__slider').slick('slickPrev');
      changeNumbers('.footer');
   });
   $('.footer .right').on('click', function () {
      $('.footer .header__slider').slick('slickNext');
      changeNumbers('.footer');
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
      swipe: false,
      cssEase: 'linear',
   });

   $('.gallery .slick-current').next().addClass('slick-next');
   $('.slick-slide[data-slick-index="7"]').addClass('slick-prev');
   $('.gallery .slick-current').next().next().addClass('slick-after-next');
   $('.slick-slide[data-slick-index="6"]').addClass('slick-before-prev');

   function addClassToSiblings() {
      var next = 'slick-next';
      var prev = 'slick-prev';
      var beforePrev = 'slick-before-prev';
      var afterNext = 'slick-after-next';

      $('.gallery__slider .slick-slide').removeClass(next);
      $('.gallery__slider .slick-slide').removeClass(afterNext);

      if ($('.gallery__slider .slick-current').next().next()[0]) {

         $('.gallery__slider .slick-current').next().addClass(next);
         $('.gallery__slider .slick-current').next().next().addClass(afterNext);

      } else if ($('.gallery__slider .slick-current').next()[0] && !$('.gallery__slider .slick-current').next().next()[0]) {

         $('.slick-slide[data-slick-index="0"]').addClass(afterNext);
         $('.gallery__slider .slick-current').next().addClass(next);

      } else {

         $('.slick-slide[data-slick-index="0"]').addClass(next);
         $('.slick-slide[data-slick-index="0"]').next().addClass(afterNext);
      }

      $('.gallery__slider .slick-slide').removeClass(prev);
      $('.gallery__slider .slick-slide').removeClass(beforePrev);

      if ($('.gallery__slider .slick-current').prev().prev()[0]) {

         $('.gallery__slider .slick-current').prev().addClass(prev);
         $('.gallery__slider .slick-current').prev().prev().addClass(beforePrev);

      } else if ($('.gallery__slider .slick-current').prev()[0] && !$('.gallery__slider .slick-current').prev().prev()[0]) {

         $('.slick-slide[data-slick-index="7"]').addClass(beforePrev);
         $('.gallery__slider .slick-current').prev().addClass(prev);

      } else {

         $('.slick-slide[data-slick-index="7"]').addClass(prev);
         $('.slick-slide[data-slick-index="7"]').prev().addClass(beforePrev);
      }
   }

   function changeSlideNumber(container) {
      $(container + ' .active-slide').text($(container + ' .slick-active').find('.gallery__link').data('number'));
      $(container + ' .next-slide').text($(container + ' .slick-next').find('.gallery__link').data('number'));
      $(container + ' .after-next-slide').text($(container + ' .slick-after-next').find('.gallery__link').data('number'));
   }

   $('.gallery .left').on('click', function () {
      $('.gallery__slider').slick('slickPrev');
      addClassToSiblings();
      changeSlideNumber('.gallery');
   });
   $('.gallery .right').on('click', function () {
      $('.gallery__slider').slick('slickNext');
      addClassToSiblings();
      changeSlideNumber('.gallery');
   });

   $('.color').on('click', function () {
      $('.color.white').toggleClass('active');
      $('.color.blue').toggleClass('active');
      $('.sprey__product-1').toggleClass('active');
      $('.sprey__product-2').toggleClass('active');
   });


   $('.testimonials__slider').slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      responsive: [
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
            }
         }
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

   $('.item__choice__wrap.white').on('click', function () {
      $('.fourth').find('.item__gallery').removeClass('active');
      $('.fourth').find('.item__product').removeClass('active');
      $('[data-color="white"]').addClass('active');
   });

   $('.item__choice__wrap.pink').on('click', function () {
      $('.fourth').find('.item__gallery').removeClass('active');
      $('.fourth').find('.item__product').removeClass('active');
      $('[data-color="pink"]').addClass('active');
   });

   $('.item__choice__wrap.powder').on('click', function () {
      $('.fourth').find('.item__gallery').removeClass('active');
      $('.fourth').find('.item__product').removeClass('active');
      $('[data-color="powder"]').addClass('active');
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