document.addEventListener('DOMContentLoaded', function () {

  $('.block-17 .slider-items').each(function () {
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

    const sLightbox = $(this);
    sLightbox.slickLightbox({
      src: 'src',
      itemSelector: '.slider-item',
      navigateByKeyboard: true
    });
    console.log(sLightbox);
  })

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