"use strict";

M.Sidenav.init(document.querySelectorAll('.sidenav'));
M.Modal.init(document.querySelectorAll('.modal'), { endingTop: '2%' });
M.FormSelect.init(document.querySelectorAll('select'));

const modal = M.Modal.getInstance(document.querySelector('.modal'));
const pillList = document.querySelector('.js-pill-list');

const formBtn = document.querySelector('#modalclick button');
const form = {
  title: document.getElementById('pill_title'),
  dosage: document.getElementById('pill_dosage'),
  taking: M.FormSelect.getInstance(document.getElementById('pill_taking')),
  time: document.getElementById('pill_time'),
  eating: M.FormSelect.getInstance(document.getElementById('pill_eating'))
};


const pillTaking = document.getElementById('pill-taking-block');
const pillTime = document.getElementById('pill-time-block');
const pillEating = document.getElementById('pill-eating-block');

const pillTakingInput = pillTaking.querySelector('input');
const pillTakingVariants = document.querySelector('#pill-taking-block ul').children;

const inputsToShow = {
  'До еды': function () {
    pillTime.classList.remove('hide');
    pillEating.classList.remove('hide');
  },
  'Во время еды': function () {
    pillTime.classList.add('hide');
    pillEating.classList.remove('hide');
  },
  'В любое время': function () {
    pillTime.classList.add('hide');
    pillEating.classList.add('hide');
  }
};
inputsToShow['После еды'] = inputsToShow['До еды'];

function addTaskHandler(e) {
  if (!checkForm(e)) return;

  const pill = {
    title: form.title.value,
    dosage: form.dosage.value,
    taking: Array.from(form.taking.el).find(el => el.selected).value,
    time: form.time.value,
    eating: form.eating.getSelectedValues()
  };
  // get id
  fetch('/add', { method: 'POST', body: JSON.stringify(pill), headers: { 'content-type': 'application/json' } })
    .then(() => {
      pill.id = Math.floor(Math.random() * 1000);
      createPill(pill);
      modal.close();
      clearForm();
    });
}

function updateTaskHandler(e, pillObj, pillElement) {
  if (!checkForm(e)) return;
  pillObj.title = form.title.value;
  pillObj.dosage = +form.dosage.value;
  pillObj.taking = Array.from(form.taking.el).find(el => el.selected).value;
  pillObj.time = form.time.value;
  pillObj.eating = form.eating.getSelectedValues();

  fetch(`edit?id=${pillObj.id}`, { method: 'PATCH', body: JSON.stringify(pillObj), headers: { 'content-type': 'application/json' } })
    .then(() => {
      updatePill(pillObj, pillElement);
      formBtn.onclick = addTaskHandler;
      modal.close();
      clearForm();
    });
}

function checkForm(e) {
  if (!(form.title.value && form.dosage.value > 0)) return false;
  if (!(pillTime.classList.contains('hide') || form.time.value)) return false;
  e.preventDefault();
  return true;
}

function clearForm() {
  form.title.value = '';
  form.dosage.value = '';
  form.taking.el.children[0].selected = true;
  form.taking.input.value = form.taking.el.children[0].textContent;
  form.time.value = '';
  form.eating.input.value = '';
  form.eating.el.children[0].selected = true;
  Array.from(form.eating.el).slice(1).forEach(el => el.selected = false);
  form.title.nextElementSibling.classList.remove('active');
  form.title.classList.remove('valid');
  form.dosage.nextElementSibling.classList.remove('active');
  form.dosage.classList.remove('valid');
  form.time.nextElementSibling.classList.remove('active');
  form.time.classList.remove('valid');
}