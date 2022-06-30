"use strict";

function createPill(pill) {
  pills.push(pill);
  const pillElement = document.createElement('li')
  pillElement.classList.add('collection-item');

  pillElement.innerHTML =
    `<p>Название таблетки: <span class="js-pill-name">${pill.title}</span></p>
      <p>Дозировка: <span class="js-pill-dosage">${pill.dosage}</span>мг</p>
      <p>Прием: <span class="js-pill-taking">${getPillTaking(pill.taking, pill.time, pill.eating)}</span>
      </p>
      <div class="pill-btns">
        <i class="material-icons small js-edit waves-effect">edit</i>
        <i class="material-icons small js-delete waves-effect">delete</i>
      </div>`;
  pillList.appendChild(pillElement);
  pillElement.querySelector('.js-edit').onclick = () => editHandler(pill, pillElement);
  pillElement.querySelector('.js-delete').onclick = () => deleteHandler(pill.id, pillElement);
}

function getPillTaking(taking, time, eating) {
  if (taking === 'any') return 'В любое время';

  let result = '';
  if (taking === 'while_eating') {
    result += 'Во время ';
  } else if (taking === 'before') {
    if (time === 0) result += 'Сразу до ';
    else result += `За ${time} минут до `;
  } else {
    if (time === 0) result += 'Сразу после ';
    else result += `Через ${time} минут после `
  }
  if (eating.includes('any')) result += 'любого приема пищи';
  else {
    const eatingItems = [];
    if (eating.includes('breakfast')) eatingItems.push('завтрака');
    if (eating.includes('lunch')) eatingItems.push('обеда');
    if (eating.includes('dinner')) eatingItems.push('ужина');
    result += eatingItems.join(', ');
  }

  return result;
}

function updatePill(pill, pillElement) {
  pillElement.innerHTML =
    `<p>Название таблетки: <span class="js-pill-name">${pill.title}</span></p>
      <p>Дозировка: <span class="js-pill-dosage">${pill.dosage}</span> мг</p>
      <p>Прием: <span class="js-pill-taking">${getPillTaking(pill.taking, pill.time, pill.eating)}</span>
      </p>
      <div class="pill-btns">
        <i class="material-icons small js-edit waves-effect">edit</i>
        <i class="material-icons small js-delete waves-effect">delete</i>
      </div>`;
  pillElement.querySelector('.js-edit').onclick = () => editHandler(pill, pillElement);
  pillElement.querySelector('.js-delete').onclick = () => deleteHandler(pill.id, pillElement);

}