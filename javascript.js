let currentSize = 16;
const canvasContainer = document.querySelector('.canvas-container');
const clearBtn = document.querySelector('#clear-btn');
const changeSizeBtn = document.querySelector('#change-size-btn');

function randomNumber(upperLimit) {
    return Math.floor(Math.random() * upperLimit);
};

function changeColor(e) {
    let newColor = `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)})`;
    this.style.backgroundColor = newColor;
    this.removeEventListener('mouseover', changeColor);
};

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
        // newGridDiv.addEventListener('mouseover', changeColor());
    };
    canvasContainer.appendChild(newRow)
};

function addSketchListeners() {
    const allGridDivs = document.querySelectorAll('.grid-space');
    allGridDivs.forEach(item => {
        item.addEventListener('mouseover', changeColor);
    });
};

function clearGrid() {
    const allGridDivs = document.querySelectorAll('.grid-space');
    allGridDivs.forEach(item => {
        item.style.backgroundColor = '#fff';
        item.removeEventListener('mouseover', changeColor);
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

clearBtn.addEventListener('click', () => {
    clearGrid();
    addSketchListeners();
});
changeSizeBtn.addEventListener('click', changeSize);

// Initializing website on entry // 
createGrid(24);
addSketchListeners();
