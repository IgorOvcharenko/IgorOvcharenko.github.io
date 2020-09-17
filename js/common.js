$(document).ready(function () {

   new WOW().init();

   $(document).on('click', function (e) {

      if ($(e.target).is('.navbar__menu__link')) {
         $('.sidebar').addClass('active')
         return;
      } else if (!$('.sidebar').is(e.target)
         && $('.sidebar').has(e.target).length === 0
         || $(e.target).is('.sidebar__link')
         || $(e.target).is('.close')) {
         $('.sidebar').removeClass('active')
      }
   })

   var slider = $('.slider');

   slider.slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      responsive: [
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 2,
            }
         },
         {
            breakpoint: 576,
            settings: {
               slidesToShow: 1,
            }
         },
      ]
   });
   $('.left').on('click', function () {
      slider.slick('slickPrev');
   });
   $('.right').on('click', function () {
      slider.slick('slickNext');
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

});