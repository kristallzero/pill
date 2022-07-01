"use strict";

function createPill(pill) {
  pills.push(pill);
  const pillElement = document.createElement('li')
  pillElement.classList.add('collection-item');

  pillElement.innerHTML =
    `<p>Название таблетки: <span class="js-pill-name">${pill.title}</span></p>
      <p>Дозировка: <span class="js-pill-dosage">${pill.dosage}</span> мг</p>
      <p>Прием: <span class="js-pill-taking">${getPillTaking(pill.taking, pill.time, pill.eating)}</span>
      </p>
      <div class="pill-btns">
        <i class="material-icons small js-edit waves-effect">edit</i>
        <i class="material-icons small js-delete waves-effect">delete</i>
      </div>`;
  pillList.appendChild(pillElement);
  pillElement.querySelector('.js-edit').onclick = () => editHandler(pill, pillElement);
  pillElement.querySelector('.js-delete').onclick = () => deleteHandler(pill._id, pillElement);
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
  pillElement.querySelector('.js-delete').onclick = () => deleteHandler(pill._id, pillElement);

}