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

   $('.mgp').each(function () {
      $(this).magnificPopup({
         delegate: 'a',
         type: 'image',
         gallery: {
            enabled: true
         }
      });
   });

   $('.policy').magnificPopup({
      type: 'inline',
      midClick: true
   });

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

   if (window.innerWidth <= 768) {
      if ($('.gallery__link').parent('.gallery__left') || $('.gallery__link').parent('.gallery__right')) {
         $('.gallery__link').unwrap();
      }
      $('.gallery__slider').slick({
         responsive: [
            {
               breakpoint: 5000,
               settings: "unslick",
            },
            {
               breakpoint: 768,
               settings: {
                  infinite: true,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots: true,
                  arrows: false,
                  fade: true,
                  dotsClass: 'dots',
                  slidesToShow: 1,
               }
            },
         ]
      });
   }
   $('.gallery .left').on('click', function () {
      $('.gallery__slider').slick('slickPrev');
   });
   $('.gallery .right').on('click', function () {
      $('.gallery__slider').slick('slickNext');
   });

   $('.item__slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      fade: true,
      dotsClass: 'dots'
   });

   $('.first .left').on('click', function () {
      $('.first .item__slider').slick('slickPrev');
   });
   $('.first .right').on('click', function () {
      $('.first .item__slider').slick('slickNext');
   });

   $('.second .left').on('click', function () {
      $('.second .item__slider').slick('slickPrev');
   });
   $('.second .right').on('click', function () {
      $('.second .item__slider').slick('slickNext');
   });

   $('.man .left').on('click', function () {
      $('.man .item__slider').slick('slickPrev');
   });
   $('.man .right').on('click', function () {
      $('.man .item__slider').slick('slickNext');
   });

   $('.fourth .left').on('click', function () {
      $('.fourth .item__slider').slick('slickPrev');
   });
   $('.fourth .right').on('click', function () {
      $('.fourth .item__slider').slick('slickNext');
   });

   $('.testimonials__slider').slick({
      infinite: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      dots: false,
      arrows: false,
      centerMode: true,
      centerPadding: '0px',
      dotsClass: 'dots',
      responsive: [
         {
            breakpoint: 576,
            settings: {
               dots: true,
               slidesToShow: 1,
            }
         },
         {
            breakpoint: 991,
            settings: {
               slidesToShow: 1,
            }
         }
         ,
         {
            breakpoint: 1920,
            settings: {
               slidesToShow: 2,
            }
         }
         ,
         {
            breakpoint: 5000,
            settings: {
               slidesToShow: 2,
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

   $('.first .color').on('click', function () {
      $('.first .color').removeClass('active');
      $(this).addClass('active');
      var color = $(this).data('color');
      $(this).closest('.color-choice').find('.span').text(color);
      if ($('.color-white').hasClass('active')) {
         $('.first .item__slider').removeClass('active');
         $('.first .item__slider.white').addClass('active');
      } else {
         $('.first .item__slider').removeClass('active');
         $('.first .item__slider.black').addClass('active');
      }
   })

   $('.fourth .color').on('click', function () {
      $('.fourth .color').removeClass('active');
      $(this).addClass('active');
      var color = $(this).data('color');
      $(this).closest('.color-choice').find('.span').text(color);
      if ($('.color-pink').hasClass('active')) {
         $('.fourth .item__slider').removeClass('active');
         $('.fourth .item__slider.pink').addClass('active');
      } else {
         $('.fourth .item__slider').removeClass('active');
         $('.fourth .item__slider.bronze').addClass('active');
      }
   })

   $('.size').on('click', function () {
      $(this).closest('.size-choice').find('.size').removeClass('active');
      $(this).addClass('active');
      var text = $(this).data('size');
      $(this).closest('.size-choice').find('.span').text(text);
   })

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

   function browserSpecs() {

      var ua = navigator.userAgent, tem,
         M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      if (/trident/i.test(M[1])) {
         tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
         return { name: 'IE', version: (tem[1] || '') };
      }
      if (M[1] === 'Chrome') {
         tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
         if (tem != null) return { name: tem[1].replace('OPR', 'Opera'), version: tem[2] };
      }
      M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
      if ((tem = ua.match(/version\/(\d+)/i)) != null) {
         M.splice(1, 1, tem[1]);
      }

      return { name: M[0], version: M[1] };

   }
   if (ua.Mac()) {
      if (browserSpecs().name === 'Safari' && browserSpecs().version === '11') {
         $('.button').addClass('safari-11')
      }
   }

});