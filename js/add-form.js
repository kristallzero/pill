"use strict";

inputsToShow[pillTakingInput.value]();

for (let i = 0; i < pillTakingVariants.length; i++) {
  pillTakingVariants[i].onclick = () => inputsToShow[pillTakingInput.value]();
}

formBtn.onclick = addTaskHandler;