let counter = document.getElementById('counter'),
    start = document.getElementById('start')
    strictLed = document.getElementsByClassName('led-button'),
    fields = document.getElementsByClassName('field'),
    sounds = {},
    sounds.f0 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    sounds.f1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    sounds.f2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    sounds.f3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
    moves = [],
    userMoves = [],
    gameIsOn = false,
    strict = false;

function reset(){
  document.getElementById('turnoff').checked = true;
  Array.prototype.map.call(fields, function(el){
    el.removeEventListener('mousedown', fieldPressed, false);
    el.removeEventListener('mouseup', fieldReleased, false);
  });
  gameIsOn = false;
  moves = [];
}

function turnOff(){
  counter.textContent = '';
  start.removeEventListener('click', newStep, false);
  reset();
}


function turnOn(){
  counter.textContent = '--';
  start.addEventListener('click', newStep, false);
  Array.prototype.map.call(fields, function(el){
    el.addEventListener('mousedown', fieldPressed, false);
    el.addEventListener('mouseup', fieldReleased, false);
  });
  gameIsOn = true;
}


function toggleStrict(){
  strictLed[0].classList.toggle('opacity');
}


function fieldPressed(e){
  let id = e.target.id;
  let el = document.getElementById(id);
  let backgroundColor = window.getComputedStyle(el, null).getPropertyValue('background-color')
  let newBackgroundColor = 'rgba'+backgroundColor.slice(3, -1)+', 0.7)';
  el.style.backgroundColor = newBackgroundColor;
  sounds[id].play();
}


function fieldReleased(e){
  let id = e.target.id;
  let el = document.getElementById(id);
  let backgroundColor = window.getComputedStyle(el, null).getPropertyValue('background-color')
  let oldBackgroundColor = 'rgb'+backgroundColor.slice(4, -6)+')';
  el.style.backgroundColor = oldBackgroundColor;
}


function generateNextMove(){
  return Math.round(Math.random() * 4);
}


function pressField(arr, id){
  let el = document.getElementById(id);
  let backgroundColor = window.getComputedStyle(el, null).getPropertyValue('background-color')
  let newBackgroundColor = 'rgba'+backgroundColor.slice(3, -1)+', 0.7)';
  el.style.backgroundColor = newBackgroundColor;
  window.setTimeout(function(){
    el.style.backgroundColor = backgroundColor;
  }, 500);
  sounds[id].play();
}


function getClick(e){
  if (gameIsOn){
    let id = e.target.id;
  } else {
    console.log('no no no');
  }
}


function newStep(){
  let nextMove = 'f'+generateNextMove();
  pressField(nextMove);
  moves.push(nextMove);
  counter.textContent = moves.length;

}
