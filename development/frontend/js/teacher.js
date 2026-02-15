document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const overlay = document.querySelector('.overlay');

  const popupTeacher = document.querySelector('.popup-teacher');
  const popupTeacherTitle = popupTeacher.querySelector('.popup-title');
  const popupTeacherDescr = popupTeacher.querySelector('.descr');
  const popupPopupClose = popupTeacher.querySelector('.popup-close');
  const teacher = document.querySelectorAll('.teacher-article');

  teacher?.forEach((el, idx) => {
    el.querySelector('.teacher-link')?.addEventListener('click', function (e) {
      popupTeacherTitle.innerHTML = e.currentTarget.parentElement.querySelector('.teacher-title').textContent;
      popupTeacherDescr.innerHTML = e.currentTarget.parentElement.querySelector('.teacher-description').innerHTML;

      popupTeacher.style.display = 'block';
      body.classList.add('overflow');
      overlay.classList.add('active');
    })
  })

  popupPopupClose?.addEventListener('click', () => {
    popupTeacher.style.display = 'none';
    body.classList.remove('overflow');
    overlay.classList.remove('active');
  })
})