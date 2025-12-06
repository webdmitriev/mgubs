document.addEventListener('DOMContentLoaded', function () {
  const breadcrumbs = document.querySelector('.block-12');
  const breadcrumbsPrev = breadcrumbs.querySelector('.breadcrumbs-prev');
  const breadcrumbsNext = breadcrumbs.querySelector('.breadcrumbs-next');
  const breadcrumbsMain = breadcrumbs.querySelector('.breadcrumbs');
  const breadcrumbsMainItems = breadcrumbsMain.querySelectorAll('.breadcrumb');
  let breadcrumbsWidth = 0;
  for (let i = 0; i < breadcrumbsMainItems.length; i++) { const marginRigthElement = getComputedStyle(breadcrumbsMainItems[i]); breadcrumbsWidth += (breadcrumbsMainItems[i].offsetWidth + parseInt(marginRigthElement.marginRight)); }
  if (breadcrumbsWidth > (breadcrumbsMain.offsetWidth - 30)) { breadcrumbsMain.classList.add('breadcrumbs-width') }
  else { breadcrumbsPrev.style.display = 'none'; breadcrumbsNext.style.display = 'none'; }

  breadcrumbsPrev.addEventListener('click', function () { breadcrumbsMain.scrollBy({ left: -300, behavior: 'smooth' }); })
  breadcrumbsNext.addEventListener('click', function () { breadcrumbsMain.scrollBy({ left: 300, behavior: 'smooth' }); })

  window.addEventListener('scroll', function (ev) {
    let body = document.querySelector('body');
    if (breadcrumbs) {
      let distanceToTop = breadcrumbs.getBoundingClientRect().top;
      if (distanceToTop < (-400)) { breadcrumbs.classList.add('breadcrumbs-fixed'); }

      let distanceToTops = body.getBoundingClientRect().top;
      if (distanceToTops > (-500)) { breadcrumbs.classList.remove('breadcrumbs-fixed'); }
    }
  });
});