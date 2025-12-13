document.addEventListener('DOMContentLoaded', function () {

  $('.block-19 .content-reviews').each(function () {
    const slider = $(this);
    slider.slick({
      autoplay: true,
      autoplaySpeed: 7000,
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      centerMode: true,
      prevArrow: '<button class="slick-arrow slick-arrow-prev"></button>',
      nextArrow: '<button class="slick-arrow slick-arrow-next"></button>',
      rows: 0
    });
  })

})