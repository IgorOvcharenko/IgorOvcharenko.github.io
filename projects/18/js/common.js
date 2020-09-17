/**
 * Device/Browser Detection
 */

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

   $(".galery a").fancybox();
   $(".products__item__galery a").fancybox();
   $(".policy").fancybox();
   $(".modalbox").fancybox();
   $(".modalbox").fancybox();

   /*
   Таймер
   */

   var now = new Date(),
      secPassed = now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();
   var t = (60 * 60 * 24 * 3) - secPassed;

   jQuery('.timer__counter').countdown({
      until: (t),
      labels: ['Годы', 'Месяцы', 'Недели', 'Дни', 'Часов', 'Минут', 'Секунд'],
      labels1: ['Годы', 'Месяцы', 'Недели', 'Дни', 'Часов', 'Минут', 'Секунд'],
      format: 'dHMS',
      layout: ' <ul class="ul-time"><li class="time-bg"><span>{d10}</span><span>{d1}</span></li><li class="time-bg"><span>{h10}</span><span>{h1}</span></li><li class="time-bg"><span>{m10}</span><span>{m1}</span></li><li class="time-bg"><span>{s10}</span><span>{s1}</span></li></ul>'
   });

   /*
   Прокрутка
   */

   $('a[href*="#"]').click(function () {
      $('html, body').animate({
         scrollTop: $($.attr(this, 'href')).offset().top + "px"
      }, {
         duration: 800,
         easing: "swing"
      });
      return false;
   });

   /*
   Отзывы
   */

   $('.testimonials__wrap').slick({
      slidesToShow: 2,
      slidesToScroll: 2,
      rows: 0,
      speed: 800,
      dots: true,
      arrows: true,
      prevArrow: '.arrow-prev',
      nextArrow: '.arrow-next',
      dotsClass: 'galery-pagination',
      responsive: [
         {
            breakpoint: 980,
            settings: {
               adaptiveHeight: true,
               slidesToShow: 1,
               slidesToScroll: 1,
            }
         }]
   });

   /*
   Галерея
   */

   $('.galery').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      rows: 0,
      speed: 800,
      fade: true,
      dots: true,
      arrows: true,
      prevArrow: '.galery-arrow-prev',
      nextArrow: '.galery-arrow-next',
      dotsClass: 'galery-pagination',
      asNavFor: '.galery-thumbs',
   });

   $('.galery-thumbs').slick({
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: '.galery',
      arrows: false,
      dots: false,
   });

   /*
   Отзывы
   */

   function readURL(input) {
      if (input.files && input.files[0]) {
         var reader = new FileReader();

         reader.onload = function (e) {
            $('#commentImg').attr('src', e.target.result);

         }

         reader.readAsDataURL(input.files[0]);
      }
   }
   $("#commentImgInput").change(function () {
      readURL(this);
   });

   $('.testimonials__link').on('click', function () {
      $(".comment-form").show();
      $(".comment-message-wrap").hide();
      $('#commentName').val('');
      $('#commentText').val('');
   });

   $('.comment-form').submit(function (e) {
      e.preventDefault();
      $(".comment-form").hide();
      $(".comment-message-wrap").show();
      setTimeout("$.fancybox.close()", 1000);
   });

   /*
   Видео
   */

   (function youtube() {

      var $videos = $('.video');
      var isMobile = ua.Mobile();

      $videos.each(function () {
         var $video = $(this);

         var $link = $video.find('.video-link'),
            $poster = $video.find('.video-poster'),
            $button = $video.find('.video-button'),
            $iframe = $video.find('.iframe-fluid'),
            id = parseLinkURL($link);

         $link.removeAttr('href');



         $video.on('click', function () {
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

   /*
   Выбор цвета
   */

   $('.color-picker__item').on('click', function () {
      $('.color-picker__item').removeClass('active');
      $(this).addClass('active');
      if ($(this).data('color') === 'brown') {
         $('.product-1').css('display', 'flex');
         $('.product-2').css('display', 'none');
         
         $('#product-title').text('Мокасины LEVI’S (555)');

      }
      if ($(this).data('color') === 'blue') {
         $('.product-2').css('display', 'flex');
         $('.product-1').css('display', 'none');
         
         $('#product-title').text('Мокасины LEVI’S (553)');
      }
   });

   /*
   Анимация 
   */

   $(window).scroll(function () {
      if (isVisible('.advantages__inner', '.advantages')) {
         showImage('.advantages__item');
      }
      if (isVisible('.preview__image__wrap img', '.preview')) {
         showImage('.preview__image__wrap img');
      }
      if (isVisible('.footer .header__product__wrap', '.footer')) {
         showImage('.footer .header__product__wrap');
      }
   });

   function isVisible(selector, block) {
      let $block = $(block);
      var windowBottom = $(window).scrollTop() + $(window).height();
      var bottom = $block.offset().top + $(selector).height() / 2;
      return windowBottom >= bottom;
   }

   function showImage(selector) {
      $(selector).show();
   }
})

