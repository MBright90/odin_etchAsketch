// Selecting constant containers/buttons for repeated used throughout script //
const root = document.querySelector(':root');

const canvasContainer = document.querySelector('.canvas-container');
const clearBtn = document.querySelector('#clear-btn');
const changeSizeBtn = document.querySelector('#change-size-btn');
const toggleButtons = document.querySelectorAll('.toggle-button');


// Adds 'mouseover' event listeners when mouse button goes down, and removes them when mouse button goes up.
function addSketchListeners() {
    const allGridDivs = document.querySelectorAll('.grid-space');
    canvasContainer.addEventListener('click', () => {
        allGridDivs.forEach(item => {
            item.addEventListener('click', placeColor);
        })
    })
    canvasContainer.addEventListener('mousedown', () => {
        allGridDivs.forEach(item => {
            item.addEventListener('mouseover', placeColor);
        });
    });
    canvasContainer.addEventListener('mouseup', () => {
        allGridDivs.forEach(item => {
            item.removeEventListener('mouseover', placeColor);
        });
    });
};


// -----------------------***### Grid creation functions ###***----------------------- //
function createGrid(gridHeight) {
    for (let i = 0; i < gridHeight; ++i) {
        createRow(gridHeight);
    };
};

function createRow(rowWidth) {

    const newRow = document.createElement('div');
    newRow.classList.add('new-row')

    let gridDivSize = `${canvasContainer.clientHeight / rowWidth}px`

    for (let i = 0; i < rowWidth; ++i) {
        const newGridDiv = document.createElement('div');
        newGridDiv.classList.add('grid-space');
        newGridDiv.style.height = gridDivSize;
        newGridDiv.style.width = gridDivSize;
        newRow.appendChild(newGridDiv);
    };
    canvasContainer.appendChild(newRow)
};

// -----------------------***### General grid functions ###***----------------------- //
function clearGrid() {
    const allGridDivs = document.querySelectorAll('.grid-space');
    allGridDivs.forEach(item => {
        item.style.backgroundColor = 'transparent';
        item.removeEventListener('click', placeColor);
    });
};

function deleteGrid() {
    const allGridDivs = document.querySelectorAll('.grid-space');
    allGridDivs.forEach(item => {
        item.remove();
    });
};

function chooseSize() {
    let newSize = 0;
    choosingNumber = true;
    while (choosingNumber) {
        newSize = parseInt(prompt('How many squares wide (Max 64)?'));
        if (isNaN(newSize)) {
            alert('Please input a number.');
            continue;
        } else if (newSize < 1 || newSize > 64) {
            alert('Please choose a number between 1 and 64.');
            continue;
        } else {
            choosingNumber = false;
        }
    };
    return newSize;
};

function changeSize() {
    newSize = chooseSize();
    deleteGrid();
    createGrid(newSize);
    addSketchListeners();
};

// -----------------------***### Color controls functionality ###***----------------------- //

// Pen color selector
function penColorStartup() {
    const penColorSelector = document.querySelector('#pen-color-selector')
    penColorSelector.addEventListener('change', changePenColor);
};

function changePenColor(e) {
    root.style.setProperty('--penColor', `${e.target.value}`);
};

function placeColor(e) {
    let colorMode = checkMode();
    
    // Place IF statement regarding rainbow color activity
    // newColor = `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)})`;
    // this.style.backgroundColor = newColor;

    let rootStyle = getComputedStyle(root);
    let newColor = rootStyle.getPropertyValue('--penColor');
    this.style.backgroundColor = newColor;
};

// This function allows the placeColor function to generate a random color //
function randomNumber(upperLimit) {
    return Math.floor(Math.random() * upperLimit);
};

// Background selector
function backgroundColorStartup() {
    const backgroundColorSelector = document.querySelector('#background-color-selector');
    backgroundColorSelector.addEventListener('input', changeBackgroundColor);
};

function changeBackgroundColor(e) {
    root.style.setProperty('--bgColor', `${e.target.value}`);
};

// Button toggles
function toggleButtonStartup() {
    toggleButtons.forEach(button => {
        button.addEventListener('click', toggleButton);
    });
};

function toggleButton (e) {
    this.classList.add('active');
    toggleButtons.forEach(button => {
        if (button !== this) {
            button.classList.remove('active');
        };
    })
};

function checkMode() {
    toggleButtons.forEach(button => {
        if (button.classList.contains('active')) {
            console.log(button.id);
            return button.id;
        };
    });
};

// -----------------------***### Canvas Button functionality ###***----------------------- //
clearBtn.addEventListener('click', () => {
    clearGrid();
    addSketchListeners();
});
changeSizeBtn.addEventListener('click', changeSize);

// -----------------------***### Initializing website on entry ###***----------------------- // 
createGrid(24);
addSketchListeners();
backgroundColorStartup();
penColorStartup();
toggleButtonStartup();
