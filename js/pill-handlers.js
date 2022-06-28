for (let i = 0; i < pillList.children.length; i++) {
  const pill = pillList.children[i];
  pill.querySelector('.js-edit').onclick = () => editHandler(pills[i], pill);
  pill.querySelector('.js-delete').onclick = () => deleteHandler(pills[i].id, pill);
}

function editHandler(pillObj, pillElement) {
  console.log(pillObj);
  console.log(pillElement);
  modal.open();
}

function deleteHandler(id, pillElement) {
  fetch('/remove/:id', {method: 'DELETE'})
    .then(() => {
      pillList.removeChild(pillElement);
    });
}