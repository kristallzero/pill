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
