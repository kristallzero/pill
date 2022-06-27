document.addEventListener('DOMContentLoaded', () => {
  M.Sidenav.init(document.querySelectorAll('.sidenav'));
  M.Modal.init(document.querySelectorAll('.modal'), {endingTop: '2%'});
  M.FormSelect.init(document.querySelectorAll('select'));
});