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

   $('.mfp').each(function () {
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

   $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
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

   $('.size').each(function () {
      $(this).ddslick({
         width: "100%",
         heignt: "60px",
      })
   })

   $('#color').ddslick({
      width: "100%",
      heignt: "60px",
      onSelected: function (selectedData) {
         switch (selectedData.selectedData.value) {
            case "pink":
               $('.item__wrap').removeClass("active");
               $('.item__wrap.pink').addClass("active");
               break;
            case "powder":
               $('.item__wrap').removeClass("active");
               $('.item__wrap.powder').addClass("active");
               break;
            default:
               break;
         }
      }
   });

   function changeSlideNumber(container) {
      $(container + ' .active-slide').text($(container + ' .slick-current .slide').data('number'));
      $(container + ' .next-slide').text($(container + ' .slick-current + .slick-slide .slide').data('number'));
      $(container + ' .after-next-slide').text($(container + ' .slick-current + .slick-slide + .slick-slide .slide').data('number'));
      $(container + ' .after-after-next-slide').text($(container + ' .slick-current + .slick-slide +  .slick-slide + .slick-slide .slide').data('number'));
   }

   if (window.innerWidth >= 768) {
      $('.gallery__slider').slick({
         infinite: true,
         slidesToShow: 3,
         slidesToScroll: 1,
         dots: false,
         arrows: false,
         centerMode: true,
         centerPadding: '0px',
         responsive: [
            {
               breakpoint: 768,
               settings: 'unslick',
            }
         ]
      });
   }

   window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) {
         $('.gallery__slider').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            responsive: [
               {
                  breakpoint: 768,
                  settings: 'unslick',
               }
            ]
         });
      }
   });


   $('.gallery .left').on('click', function () {
      $('.gallery__slider').slick('slickPrev');
      changeSlideNumber('.gallery')
   });
   $('.gallery .right').on('click', function () {
      $('.gallery__slider').slick('slickNext');
      changeSlideNumber('.gallery')
   });


   $('.item__slider').each(function () {
      $(this).slick({
         infinite: true,
         slidesToShow: 1,
         slidesToScroll: 1,
         dots: false,
         arrows: false,
         speed: 500,
         fade: true,
         cssEase: 'linear'
      });
   });
   $('.item .left').on('click', function () {
      $(this).closest('.item__wrap').find('.item__slider').slick('slickPrev');
      $(this).closest('.item__wrap').find('.item__navigation__number span')
         .text($(this).closest('.item__wrap').find('.slick-active a').data('number'));
   });
   $('.item .right').on('click', function () {
      $(this).closest('.item__wrap').find('.item__slider').slick('slickNext');
      $(this).closest('.item__wrap').find('.item__navigation__number span')
         .text($(this).closest('.item__wrap').find('.slick-active a').data('number'));
   });

   $('.testimonials__slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
   });
   $('.testimonials .left').on('click', function () {
      $('.testimonials__slider').slick('slickPrev');
      changeSlideNumber('.testimonials')
   });
   $('.testimonials .right').on('click', function () {
      $('.testimonials__slider').slick('slickNext');
      changeSlideNumber('.testimonials')
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

});