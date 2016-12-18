// grab our dom elements
let displayBox = document.querySelector('.current-exercise'),
  catalogBox = document.querySelector('.catalog-box');

// set default exercises if none exist in localStorage
if (!window.localStorage.getItem('exercises')) {
  let catalog = {
    ex01: { name: "Push Ups", reps: 10 },
    ex02: { name: "Sit Ups", reps: 30 },
    ex03: { name: "Lunges", reps: 30 },
    ex04: { name: "Squats", reps: 15 }
  }

  localStorage.setItem('exercises', JSON.stringify(catalog));
}

// set a variable for the localStorage 'exercises' item
let localCatalog = JSON.parse(localStorage.getItem('exercises'));

catalogBox.addEventListener('input', function (event) {
  // make a copy of the existing localStorage data
  let newCatalog = localCatalog;

  // grab the data-item names for elements being currently edited
  let focusedParentName = event.target.parentElement.getAttribute('data-item');
  let focusedChildName = event.target.getAttribute('data-item');

  // update relevant datum within the newCatalog with user input/changes
  newCatalog[focusedParentName][focusedChildName] = event.target.innerHTML;

  // push changes to localStorage
  localStorage.setItem('exercises', JSON.stringify(newCatalog));

}, false)

let output = {
  exercise: 0,
  reps: 0
};

function displayCatalog() {
  for (var item in localCatalog) {

    if (typeof localCatalog[item] !== 'function') {

      let exerciseSet = document.createElement('dl'),
        nameBox = document.createElement('dt'),
        repsBox = document.createElement('dd');

      exerciseSet.setAttribute('data-item', item);

      nameBox.contentEditable = true;
      repsBox.contentEditable = true;

      nameBox.setAttribute('data-item', 'name');
      repsBox.setAttribute('data-item', 'reps');

      nameBox.textContent = localCatalog[item].name;
      repsBox.textContent = localCatalog[item].reps;

      exerciseSet.appendChild(nameBox);
      exerciseSet.appendChild(repsBox);

      catalogBox.appendChild(exerciseSet);
    }
  };
};

function pickRandomExercise() {
  // make an array out of the localStorage object
  var keys = Object.keys(localCatalog);

  // generate a random number within the range of elements localCatalog
  var rand = Math.floor(Math.random() * keys.length);

  // set the object property based on above random number
  var prop = keys[rand];

  // output the property's name and reps
  output.exercise = localCatalog[prop].name;
  output.reps = localCatalog[prop].reps;
}

function displayExercise() {
  pickRandomExercise();
  displayBox.textContent = `${output.reps} × ${output.exercise}`;
};

// initialize the app
displayExercise();
displayCatalog();
