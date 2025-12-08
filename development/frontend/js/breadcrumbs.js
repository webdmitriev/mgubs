document.addEventListener('DOMContentLoaded', function () {
  const breadcrumbs = document.querySelector('.block-12');

  if (!breadcrumbs) return;
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


  window.addEventListener('scroll', function () {
    if (breadcrumbs) {
      const prevSectionTop = breadcrumbs.previousElementSibling.getBoundingClientRect().top;
      const prevSectionHeight = breadcrumbs.previousElementSibling.clientHeight;

      if ((prevSectionTop + prevSectionHeight) < -40) { breadcrumbs.classList.add('breadcrumbs-fixed-anim'); }
      else { breadcrumbs.classList.remove('breadcrumbs-fixed-anim'); }

      if ((prevSectionTop + prevSectionHeight) < -240) { breadcrumbs.classList.add('breadcrumbs-fixed'); }
      else { breadcrumbs.classList.remove('breadcrumbs-fixed'); }
    }
  });
});