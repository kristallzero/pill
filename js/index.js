M.Sidenav.init(document.querySelectorAll('.sidenav'));
M.Modal.init(document.querySelectorAll('.modal'), { endingTop: '2%' });
M.FormSelect.init(document.querySelectorAll('select'));

const modal = M.Modal.getInstance(document.querySelector('.modal'));
modal.open();