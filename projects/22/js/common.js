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
   if ($(window).width() <= '599') {
      // var path = $('body').data('path');
      $('.header__bg').attr('src', 'img/face-2.png');
   } else {
      $('.header__bg').attr('src', 'img/face-1.png');
   }
   window.addEventListener("resize", function () {
      if ($(window).width() <= '599') {
         // var path = $('body').data('path');
         $('.header__bg').attr('src', 'img/face-2.png');
      } else {
         $('.header__bg').attr('src', 'img/face-1.png');
      }
   })



   new WOW().init();

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

   $('.testimonials__slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
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