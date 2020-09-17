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

   $('.policy').fancybox({
      hideScrollbar: false,
   });

   $('[data-fancybox="gallery"]').fancybox({
      hideScrollbar: false,
      infobar: false,
      arrows: true,
   });

   $('#quantity').ddslick({
      width: "100%",
      heignt: "60px",
      background: "#FFFFFF",
      onSelected: function (selectedData) {
         //callback function: do something with selectedData;
      }
   });

   $('#color').ddslick({
      width: "100%",
      heignt: "60px",
      background: "#FFFFFF",
      onSelected: function (selectedData) {
         switch (selectedData.selectedData.value) {
            case "yellow":
               $('#image').attr("src", "img/colors/y.jpg");
               break;
            case "blue":
               $('#image').attr("src", "img/colors/b.jpg");
               break;
            case "green":
               $('#image').attr("src", "img/colors/g.jpg");
               break;
            case "red":
               $('#image').attr("src", "img/colors/r.jpg");
               break;
            case "orange":
               $('#image').attr("src", "img/colors/o.jpg");
               break;
            default:
               break;
         }
      }
   });

   window.addEventListener("resize", function () {
      if (window.innerWidth < 1281 && !$('.about__gallery').hasClass('slick-initialized')) {
         $('.about__gallery').slick({
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
            dotsClass: 'dots',
            arrows: false,
            responsive: [
               {
                  breakpoint: 2650,
                  settings: 'unslick',
               },
               {
                  breakpoint: 1281,
                  settings: {
                     slidesToShow: 3,
                     slidesToScroll: 1
                  },
               },
               {
                  breakpoint: 1025,
                  settings: {
                     slidesToShow: 2,
                     slidesToScroll: 1
                  },
               },
               {
                  breakpoint: 600,
                  settings: {
                     slidesToShow: 1,
                     slidesToScroll: 1
                  },
               },
            ]
         });
      }
   });

   if (window.innerWidth < 1281) {
      $('.about__gallery').slick({
         infinite: true,
         slidesToShow: 2,
         slidesToScroll: 1,
         dots: true,
         dotsClass: 'dots',
         arrows: false,
         responsive: [
            {
               breakpoint: 2650,
               settings: 'unslick',
            },
            {
               breakpoint: 1281,
               settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1
               },
            },
            {
               breakpoint: 1025,
               settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
               },
            },
            {
               breakpoint: 600,
               settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
               },
            },

         ]
      });
   }

   $('.about .left').on('click', function () {
      $('.about__gallery').slick('slickPrev');
   });
   $('.about .right').on('click', function () {
      $('.about__gallery').slick('slickNext');
   });

   window.addEventListener("resize", function () {
      if (window.innerWidth < 1025 && !$('.testimonials__slider').hasClass('slick-initialized')) {
         $('.testimonials__slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            dotsClass: 'dots',
            arrows: false,
            responsive: [
               {
                  breakpoint: 2650,
                  settings: 'unslick',
               },
               {
                  breakpoint: 1025,
                  settings: {
                     slidesToShow: 1,
                     slidesToScroll: 1
                  }
               }
            ]
         });
      }
   });

   if (window.innerWidth < 1025) {
      $('.testimonials__slider').slick({
         infinite: true,
         slidesToShow: 1,
         slidesToScroll: 1,
         dots: true,
         dotsClass: 'dots',
         arrows: false,
         responsive: [
            {
               breakpoint: 2650,
               settings: 'unslick',
            },
            {
               breakpoint: 1025,
               settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
               }
            }
         ]
      });
   }


   $('.testimonials .left').on('click', function () {
      $('.testimonials__slider').slick('slickPrev');
   });
   $('.testimonials .right').on('click', function () {
      $('.testimonials__slider').slick('slickNext');
   });

   // changeSale('.header, .footer, .item', '.new-price', '.old-price', '.sale');
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

   $('.testimonials .arrow.left').on('click', function () {
      $('.testimonials__slider').slick('slickPrev');
   });
   $('.testimonials .arrow.right').on('click', function () {
      $('.testimonials__slider').slick('slickNext');
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