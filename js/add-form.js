"use strict";

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

inputsToShow[pillTakingInput.value]();

for (let i = 0; i < pillTakingVariants.length; i++) {
  pillTakingVariants[i].onclick = () => inputsToShow[pillTakingInput.value]();
}

formBtn.onclick = (e) => {
  if (!(form.title.value && form.dosage.value)) return;
  if (!(pillTime.classList.contains('hide') || form.time.value)) return;
  
  e.preventDefault();

  const pill = {
    title: form.title.value,
    dosage: form.dosage.value,
    taking: form.taking.getSelectedValues()[0],
    time: form.time.value,
    eating: form.eating.getSelectedValues()
  };
  fetch('/add', {method: 'POST', body: JSON.stringify(pill), headers: {'content-type': 'application/json'}})
    .then(() => {
      modal.close();
      createPill(pill);
    });
}