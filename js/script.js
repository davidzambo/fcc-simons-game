let counter = document.getElementById('counter'),
    start = document.getElementById('start')
    strictLed = document.getElementsByClassName('led-button'),
    fields = document.getElementsByClassName('field'),
    sounds = {},
    sounds.f0 = new Audio('audio/simonSound1.mp3'),
    sounds.f1 = new Audio('audio/simonSound2.mp3'),
    sounds.f2 = new Audio('audio/simonSound3.mp3'),
    sounds.f3 = new Audio('audio/simonSound4.mp3'),
    moves = [],
    userMoves = [],
    gameIsOn = false,
    strict = false,
    stepCounter = 0;


window.addEventListener('keydown', function(event){
  if ((event.which === 32) || (event.which === 27)){
    document.getElementById('okay-button').click();
  }
}, false);


function reset(){
  document.getElementById('turnoff').checked = true;
  Array.prototype.map.call(fields, function(el){
    el.removeEventListener('mousedown', fieldPressed, false);
    el.removeEventListener('mouseup', fieldReleased, false);
  });
  gameIsOn = false;
  moves = [];
  stepCounter = 0;
  start.nextSibling.nextSibling.textContent = 'start';
}


function turnOff(){
  counter.textContent = '';
  start.removeEventListener('click', newGame, false);
  reset();
}


function turnOn(){
  counter.textContent = '--';
  start.addEventListener('click', newGame, false);
  Array.prototype.map.call(fields, function(el){
    el.addEventListener('mousedown', fieldPressed, false);
    el.addEventListener('mouseup', fieldReleased, false);
  });
  gameIsOn = true;
}


function toggleStrict(){
  strictLed[0].classList.toggle('pink');
  strictLed[0].classList.toggle('red');
  strict = !strict;
}


function fieldPressed(e){
  let id = e.target.id;
  let el = document.getElementById(id);
  let backgroundColor = window.getComputedStyle(el, null).getPropertyValue('background-color')
  let newBackgroundColor = 'rgba'+backgroundColor.slice(3, -1)+', 0.5)';
  el.style.backgroundColor = newBackgroundColor;
  sounds[id].currentTime = 0;
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
  return 'f'+(Math.round(Math.random() * 3));
}


function pressField(arr, id){
  if (id < arr.length){
    /*
      UNSET THE FIELD PRESS EVENT HANDLER
    */
    Array.prototype.map.call(fields, function(el){
      el.removeEventListener('mousedown', fieldPressed, false);
      el.removeEventListener('mouseup', fieldReleased, false);
      el.removeEventListener('click', getClick, false);
    });

    let last;
    (id > 0) ? last = arr[id-1] : last = arr[0];
    sounds[last].pause();
    sounds[last].currentTime = 0;
    let el = document.getElementById(arr[id]);
    let backgroundColor = window.getComputedStyle(el, null).getPropertyValue('background-color')
    let newBackgroundColor = 'rgba'+backgroundColor.slice(3, -1)+', 0.5)';
    //console.log('el: '+el+' id: '+arr[id]+' bgcol: '+backgroundColor+' new: '+newBackgroundColor);
    el.style.backgroundColor = newBackgroundColor;
    sounds[arr[id]].play();
    window.setTimeout(function(){
      el.style.backgroundColor = backgroundColor;
      pressField(arr, ++id);
    }, 800);
  } else {
    /*
      SET THE FIELD PRESS EVENT HANDLER AGAIN
    */
    Array.prototype.map.call(fields, function(el){
      el.addEventListener('mousedown', fieldPressed, false);
      el.addEventListener('mouseup', fieldReleased, false);
      el.addEventListener('click', getClick, false);
    });
  }
}


function getClick(e){
  if (gameIsOn){
    if (stepCounter < moves.length){
      if (e.target.id === moves[stepCounter]){
        // //console.log('good');
        stepCounter++;
        if (stepCounter === 21){
            showModal('Congratulation!', 'You finished Simon game! You\'re memory is amazing! Would you like to play again?');
            moves = [];
            stepCounter = 0;
            counter.textContent = '--';
            start.nextSibling.nextSibling.textContent = 'start';
        } else if (stepCounter === moves.length){
          stepCounter = 0;
          setTimeout(newStep, 800); // IF THE USER CLICKED ALL ELEMENTS IN THE PROPER ORDER, A
                                    // ADD A NEW STEP TO THE MOVES
        }
      } else {
        if (strict){
          showModal('Whooops, a little mistake!', 'You\'re in strict mode, so the game has been restarted now!');
          moves = [];
          stepCounter = 0;
          counter.textContent = '--';
        } else {
          showModal('Whooops, a little mistake!', 'Listen to the right order and try it again!');
        }
      }
    }
  } // DO NOTHING, IF GAME IS NOT ON
}

function newGame(){
  start.nextSibling.nextSibling.textContent = 'restart';
  moves = [];
  stepCounter = 0;
  newStep();
}


function newStep(){
  moves.push(generateNextMove());
  counter.textContent = nice(moves.length);
  pressField(moves, 0);
}


function showModal(title, message){
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-message').classList.remove('text-justify');
  document.getElementById('modal-message').textContent = message;
  document.getElementById('modal').style.display = 'block';
}


function hideModal(){
  if (moves.length > 0){
    stepCounter = 0;
    pressField(moves, 0);
  }
  if (strict){
    newStep();
  }
  return document.getElementById('modal').style.display = 'none';
}


function nice(num){
  if (num < 10){
    return '0'+num;
  } else {
    return num;
  }
}
