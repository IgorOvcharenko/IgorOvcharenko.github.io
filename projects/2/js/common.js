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

if (ua.IE()) {
   console.log(true)
   $('.header__title').css('color', '#92278f').css('background', 'transparent')
   $('.header__advantages__title').css('color', '#92278f').css('background', 'transparent')
   $('.video-block__title').css('color', '#92278f').css('background', 'transparent')
   $('.advantages__title').css('color', '#92278f').css('background', 'transparent')
   $('.gallery__offer__title').css('color', '#92278f').css('background', 'transparent')
   $('.testimonials__title').css('color', '#92278f').css('background', 'transparent')
   $('.delivery__title').css('color', '#92278f').css('background', 'transparent')
   $('.footer__title').css('color', '#92278f').css('background', 'transparent')
}

$(document).ready(function () {

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

   new WOW().init();

   var path = $('body').data('path');

   $('.policy').magnificPopup({
      type: 'inline',
      midClick: true
   });

   $('.gallery__item').magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: {
         enabled: true,
      }
   });

   function changeNumber() {
      var number = +$('.slick-active .advantages__item__number').text()
      switch (number) {
         case 1:
            $('.advantages__product__number').removeClass('active')
            $('.advantages__product__number.one').addClass('active')
            break;
         case 2:
            $('.advantages__product__number').removeClass('active')
            $('.advantages__product__number.two').addClass('active')
            break;
         case 3:
            $('.advantages__product__number').removeClass('active')
            $('.advantages__product__number.three').addClass('active')
            break;
      }
   }

   var sliderIsLive2 = false;

   if (document.documentElement.clientWidth >= 576) {
      $('.advantages .advantages__slider').slick({
         infinite: true,
         slidesToShow: 1,
         slidesToScroll: 1,
         dots: true,
         arrows: false,
         fade: true,
         dotsClass: 'dots',
         rows: 0,
      });
      sliderIsLive2 = true
   }

   window.addEventListener("resize", function () {
      if (document.documentElement.clientWidth < 576) {
         if (sliderIsLive2) {
            $('.advantages .advantages__slider').slick('unslick')
         }
         sliderIsLive2 = false;
      } else {
         if (!sliderIsLive2) {
            $('.advantages .advantages__slider').slick({
               infinite: true,
               slidesToShow: 1,
               slidesToScroll: 1,
               dots: true,
               arrows: false,
               fade: true,
               dotsClass: 'dots',
               rows: 0,
            });
            sliderIsLive2 = true;
         }
      }
   });

   $('.advantages .left').on('click', function () {
      $('.advantages__slider').slick('slickPrev');
      changeNumber();
   });
   $('.advantages .right').on('click', function () {
      $('.advantages__slider').slick('slickNext');
      changeNumber();
   });


   $('.testimonials__slider').slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      dots: false,
      arrows: false,
      responsive: [
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               fade: true,
               dots: true,
               dotsClass: 'dots',
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

   $('.first .item__slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.first .item__slider-nav'
   });
   $('.first .item__slider-nav').slick({
      slidesToShow: 4,
      slidesToScroll: 0,
      asNavFor: '.first .item__slider',
      dots: false,
      arrows: false,
      centerMode: true,
      focusOnSelect: true,
      vertical: true,
      responsive: [
         {
            breakpoint: 992,
            settings: {
               vertical: false
            }
         }
      ]
   });

   $('.second .item__slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.second .item__slider-nav'
   });
   $('.second .item__slider-nav').slick({
      slidesToShow: 4,
      slidesToScroll: 0,
      asNavFor: '.second .item__slider',
      dots: false,
      arrows: false,
      centerMode: true,
      focusOnSelect: true,
      vertical: true,
      responsive: [
         {
            breakpoint: 992,
            settings: {
               vertical: false
            }
         }
      ]
   });

   $('.third .item__slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.third .item__slider-nav'
   });
   $('.third .item__slider-nav').slick({
      slidesToShow: 4,
      slidesToScroll: 0,
      asNavFor: '.third .item__slider',
      dots: false,
      arrows: false,
      centerMode: true,
      focusOnSelect: true,
      vertical: true,
      responsive: [
         {
            breakpoint: 992,
            settings: {
               vertical: false
            }
         }
      ]
   });

   var sliderIsLive = false;
   if (document.documentElement.clientWidth < 768) {
      sliderIsLive = true;
      $('.gallery__wrap').slick({
         infinite: true,
         slidesToShow: 1,
         slidesToScroll: 1,
         dots: true,
         arrows: false,
         fade: true,
         rows: 0,
         dotsClass: 'dots',
      });
   }

   window.addEventListener("resize", function () {
      if (document.documentElement.clientWidth >= 768) {
         if (sliderIsLive) {
            $('.gallery__wrap').slick('unslick')
         }
         sliderIsLive = false;
      } else {
         if (!sliderIsLive) {
            sliderIsLive = true;
            $('.gallery__wrap').slick({
               infinite: true,
               slidesToShow: 1,
               slidesToScroll: 1,
               dots: true,
               arrows: false,
               fade: true,
               rows: 0,
               dotsClass: 'dots',
            });
         }
      }
   });

   $('.gallery .left').on('click', function () {
      $('.gallery__wrap').slick('slickPrev');
   });
   $('.gallery .right').on('click', function () {
      $('.gallery__wrap').slick('slickNext');
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

});