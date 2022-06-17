// Selecting constant containers/buttons for repeated used throughout script //
const root = document.querySelector(':root');

const canvasContainer = document.querySelector('.canvas-container');

const toggleButtons = document.querySelectorAll('.color-toggle-button');


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
    let rootStyle = getComputedStyle(root);
    const colorMode = checkMode();

    // Pen mode
    if (colorMode === 'pen-mode-btn') {
        let newColor = rootStyle.getPropertyValue('--penColor');
        this.style.backgroundColor = newColor;

    // Plus shading mode ###DISABLED###
    } else if (colorMode === 'plus-shading-btn') {
        console.log('plus shading')
        // if (!this.dataset.shading) {
        //     this.setAttribute('data-shading', 1);
        // } else {
        //     let shadingLevel = parseInt(e.target.dataset.shading);
        //     shadingLevel++;
        //     this.setAttribute('data-shading'. shadingLevel)
        // };
        // if (this.style.backgroundColor === 'transparent') {
        //     this.style.backgroundColor = rootStyle.getPropertyValue('--bgColor');
        // };

    // Minus shading mode ###DISABLED###
    } else if (colorMode === 'minus-shading-btn') {
        console.log('minus shading');

    // Rainbow mode
    } else if (colorMode === 'rainbow-mode-btn') {
        newColor = `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)})`;
        this.style.backgroundColor = newColor;

    // Eraser mode
    } else if (colorMode === 'eraser-mode-btn') {
        this.style.backgroundColor = 'transparent';
    };
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
    let mode = '';
    toggleButtons.forEach(button => {
        if (button.classList.contains('active')) {
            mode = button.id;
        }
    });
    return mode;
};

// -----------------------***### Additional Canvas Button functionality ###***----------------------- //
const clearBtn = document.querySelector('#clear-btn');
const changeSizeBtn = document.querySelector('#change-size-btn');

clearBtn.addEventListener('click', () => {
    clearGrid();
    addSketchListeners();
});
changeSizeBtn.addEventListener('click', changeSize);


// Trace functions

const traceInput = document.querySelector('#image-input');
traceInput.addEventListener('change', addTraceBg);

const toggleTraceBtn = document.querySelector('#toggle-trace-button');
toggleTraceBtn.addEventListener('click', toggleTrace);

let currentTraceFile = `url(./NicePng_dinosaur-png_329937.png)`;
function addTraceBg (e) {
    const uploadedFile = e.target.files[0];
    if (checkFileType(e.target.files[0].name)) {
        currentTraceFile = `url(${URL.createObjectURL(uploadedFile)})`;
        canvasContainer.style.backgroundImage = currentTraceFile;
        console.log(toggleTraceBtn);
        toggleTraceBtn.classList.add('active');
    };
};

function checkFileType (fileName) {
    const fileSuffix = fileName.split('.')[1];
    if (fileSuffix === 'png' || fileSuffix === 'jpg' || fileSuffix === 'jpeg' || fileSuffix === 'svc') return true;
    alert('Please choose a jpg, svc or png file.');
};

function toggleTrace () {
    console.log('button is working')
    if (toggleTraceBtn.classList.contains('active')) {
        toggleTraceBtn.classList.remove('active');
        canvasContainer.style.backgroundImage = '';
    } else {
        canvasContainer.style.backgroundImage = currentTraceFile;
        toggleTraceBtn.classList.add('active');
    };
};

// -----------------------***### Initializing website on entry ###***----------------------- // 

createGrid(24); 
addSketchListeners();
backgroundColorStartup();
penColorStartup();
toggleButtonStartup();
