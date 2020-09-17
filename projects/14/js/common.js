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

   $('.testimonials__slider').slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      dotsClass: 'dots',
      appendDots: '.dots',
      responsive: [
         {
            breakpoint: 599,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }
      ]
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

   var scenesParallax = [];

   mQ("(max-width: 1023px)", function () {
      if (!scenesParallax.length) return
      scenesParallax.forEach(function (scene) {
         scene.disable();
         scene.element.removeAttribute('style');
      })
   }, function () {
      if (scenesParallax.length === 0) {
         $('.parallax').each(function (i) {
            scenesParallax[i] = new Parallax($(this).children('div').attr('data-depth', randomNum(10, 20)).end().get(0), {
               frictionX: 0.01,
               frictionY: 0.01,
               invertX: Math.random() >= 0.5,
               invertY: Math.random() >= 0.5
            });
         })
      } else {
         scenesParallax.forEach(function (scene) {
            scene.enable();
         })
      }
   });

   function randomNum(min, max) {
      var numLow = min, numHigh = max,
         adjustedHigh = (parseFloat(numHigh) - parseFloat(numLow)) + 1;
      return Math.floor(Math.random() * adjustedHigh) + parseFloat(numLow);
   }

   function mQ(mqStr, match, mismatch) {
      var mq = matchMedia(mqStr);
      mq.addListener(widthChange);
      widthChange(mq);
      function widthChange(mq) {
         if (mq.matches) {
            match();
         } else {
            mismatch();
         }
      }
   }

});