"use strict";

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
    taking: {
      'До еды': 'before',
      'Во время еды': 'while_eating',
      'После еды': 'after',
      'В любое время': 'any'
    }[form.taking.input.value],
    time: form.time.value,
    eating: form.eating.getSelectedValues()
  };
  // get id
  fetch('/add', {method: 'POST', body: JSON.stringify(pill), headers: {'content-type': 'application/json'}})
    .then(() => {
      modal.close();
      pill.id = Math.floor(Math.random() * 1000);
      createPill(pill);
    });
}