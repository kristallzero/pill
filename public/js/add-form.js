"use strict";


inputsToShow[pillTakingInput.value]();

for (let i = 0; i < pillTakingVariants.length; i++) {
  pillTakingVariants[i].onclick = () => inputsToShow[pillTakingInput.value]();
}


const pillEatingOptionsStyles = {};
pillEatingHandler();

pillEatingVartiants.children[0].onclick = pillEatingHandler;

function pillEatingHandler() {
  if (form.eating.el[0].selected) {
    pillEatingOptionsStyles.height = pillEatingVartiants.style.height;
    pillEatingOptionsStyles.top = pillEatingVartiants.style.top;
    pillEatingVartiants.style.height = '';
    pillEatingVartiants.style.top = '';
    for (let i = 1; i < pillEatingVartiants.children.length; i++) {
      pillEatingVartiants.children[i].classList.add('hide');
      pillEatingVartiants.children[i].querySelector('input').checked = false;
      pillEatingVartiants.children[i].classList.remove('selected'); 
      form.eating.el[i].selected = false;
    }
    form.eating.input.value = pillEatingVartiants.children[0].textContent;
  } else if (pillEatingVartiants.children[1].classList.contains('hide')) {
    pillEatingVartiants.style.height = pillEatingOptionsStyles.height;
    pillEatingVartiants.style.top = pillEatingOptionsStyles.top;
    for (let i = 1; i < pillEatingVartiants.children.length; i++) {
      pillEatingVartiants.children[i].classList.remove('hide');
    }
  }
}

formBtn.onclick = addTaskHandler;