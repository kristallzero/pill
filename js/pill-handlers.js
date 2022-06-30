"use strict";


for (let i = 0; i < pillList.children.length; i++) {
  const pill = pillList.children[i];
  pill.querySelector('.js-edit').onclick = () => editHandler(pills[i], pill);
  pill.querySelector('.js-delete').onclick = () => deleteHandler(pills[i].id, pill);
}

function editHandler(pillObj, pillElement) {
  form.title.nextElementSibling.classList.add('active');
  form.title.classList.add('valid');
  form.title.value = pillObj.title;
  form.dosage.nextElementSibling.classList.add('active');
  form.dosage.classList.add('valid');
  form.dosage.value = pillObj.dosage;
  const takingOption = Array.from(form.taking.el).find(el => el.value === pillObj.taking);
  takingOption.selected = true;
  form.taking.input.value = takingOption.textContent;
  inputsToShow[takingOption.textContent]();
  form.time.nextElementSibling.classList.add('active');
  form.time.classList.add('valid');
  form.time.value = pillObj.time;
  form.eating.input.value = '';
  pillObj.eating.forEach(option => {
    const eatingOption = Array.from(form.eating.el).find(el => el.value === option);
    eatingOption.selected = true;
    if (form.eating.input.value !== '') form.eating.input.value += ', ';
    form.eating.input.value += eatingOption.textContent;
  });
  formBtn.onclick = (e) => updateTaskHandler(e, pillObj, pillElement);
  modal.open();
}

function deleteHandler(id, pillElement) {
  pillList.removeChild(pillElement);
}