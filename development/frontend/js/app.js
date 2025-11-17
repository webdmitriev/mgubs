document.addEventListener('DOMContentLoaded', function () {
  console.log('start');

  // ******
  // header
  $(".header").on("click", ".burger", function () {
    $(this).toggleClass("active")
  })

  console.log('Oleg!');
})
