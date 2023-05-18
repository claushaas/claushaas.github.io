let pixelBoard = {};

let sizeOfPixelBoard = 5;

const white = 'rgb(255, 255, 255)';

const generateRandomColorNumber = () => Math.floor(Math.random() * 256);

const generateRandomRGBString = () =>
  `rgb(${generateRandomColorNumber()},\
${generateRandomColorNumber()},\
${generateRandomColorNumber()})`;

const colorPalette = localStorage.getItem('colorPalette')
  && JSON.parse(localStorage.getItem('colorPalette'));

if (localStorage.getItem('boardSize')) {
  sizeOfPixelBoard = JSON.parse(localStorage.getItem('boardSize'));
}

if (!localStorage.getItem('pixelBoard')) {
  localStorage.setItem('pixelBoard', JSON.stringify(pixelBoard));
} else {
  pixelBoard = JSON.parse(localStorage.getItem('pixelBoard'));
}

const colorPaletteSection = document.createElement('section');

colorPaletteSection.id = 'color-palette';
document.body.appendChild(colorPaletteSection);

const cor1 = document.createElement('div');
cor1.classList.add('color', 'selected');
cor1.style.backgroundColor = 'rgb(0, 0, 0)';
colorPaletteSection.appendChild(cor1);

const cor2 = document.createElement('div');
cor2.classList.add('color');
cor2.style.backgroundColor = colorPalette && colorPalette.color2
  ? colorPalette.color2
  : generateRandomRGBString();
colorPaletteSection.appendChild(cor2);

const cor3 = document.createElement('div');
cor3.classList.add('color');
cor3.style.backgroundColor = colorPalette && colorPalette.color3
  ? colorPalette.color3
  : generateRandomRGBString();
colorPaletteSection.appendChild(cor3);

const cor4 = document.createElement('div');
cor4.classList.add('color');
cor4.style.backgroundColor = colorPalette && colorPalette.color4
  ? colorPalette.color4
  : generateRandomRGBString();
colorPaletteSection.appendChild(cor4);

const controlSection = document.createElement('section');
controlSection.id = 'control';
document.body.appendChild(controlSection)

const generateRandomColorsButton = document.createElement('button');
generateRandomColorsButton.id = 'button-random-color';
generateRandomColorsButton.innerText = 'Cores aleatórias';
controlSection.appendChild(generateRandomColorsButton);

generateRandomColorsButton.addEventListener('click', () => {
  const randomColor2 = generateRandomRGBString();
  const randomColor3 = generateRandomRGBString();
  const randomColor4 = generateRandomRGBString();

  localStorage.setItem('colorPalette', JSON.stringify({
    color2: randomColor2,
    color3: randomColor3,
    color4: randomColor4,
  }));

  cor2.style.backgroundColor = randomColor2;
  cor3.style.backgroundColor = randomColor3;
  cor4.style.backgroundColor = randomColor4;
});

const clearBoardButton = document.createElement('button');
clearBoardButton.id = 'clear-board';
clearBoardButton.innerText = 'Limpar';
controlSection.appendChild(clearBoardButton);

const boardSizeInput = document.createElement('input');
boardSizeInput.type = 'number';
boardSizeInput.min = '1';
boardSizeInput.id = 'board-size';
controlSection.appendChild(boardSizeInput);

const vqvButton = document.createElement('button');
vqvButton.id = 'generate-board';
vqvButton.innerText = 'VQV';
controlSection.appendChild(vqvButton);

const deleteBoard = () => {
  const rows = document.querySelectorAll('.row');
  for (let index = 0; index < rows.length; index += 1) {
    rows[index].parentElement.removeChild(rows[index]);
  }
};

const pixelBoardSection = document.createElement('section');
pixelBoardSection.id = 'pixel-board';
document.body.appendChild(pixelBoardSection);

const selectedColor = () => {
  const selectedColorBox = document.querySelector('.selected');
  const color = selectedColorBox.style.backgroundColor;
  return color;
};

const generateRow = () => {
  const row = document.createElement('div');
  row.classList.add('row');
  pixelBoardSection.appendChild(row);
  return row;
};

const generateCell = (rows, cells, row) => {
  const cell = document.createElement('div');
  cell.classList.add('pixel', cells);
  const designFromLocalStorage = JSON.parse(localStorage.getItem('pixelBoard'));
  cell.style.backgroundColor = designFromLocalStorage
  && designFromLocalStorage[`${rows}${cells}`]
    ? designFromLocalStorage[`${rows}${cells}`]
    : white;
  row.appendChild(cell);
  cell.addEventListener('click', () => {
    const color = selectedColor();
    cell.style.backgroundColor = color;
    pixelBoard[`${rows}${cells}`] = color;
    localStorage.setItem('pixelBoard', JSON.stringify(pixelBoard));
  });
};

const generateBoard = (size) => {
  let sizeOfTheBoard = size;
  if (sizeOfTheBoard < 5) sizeOfTheBoard = 5;
  if (sizeOfTheBoard > 50) sizeOfTheBoard = 50;
  for (let rows = 1; rows <= sizeOfTheBoard; rows += 1) {
    const row = generateRow();

    for (let cells = 1; cells <= sizeOfTheBoard; cells += 1) {
      generateCell(rows, cells, row);
    }
  }
};

generateBoard(sizeOfPixelBoard);

const turnBoardWhite = () => {
  const cells = document.querySelectorAll('.pixel');
  for (let index = 0; index < cells.length; index += 1) {
    cells[index].style.backgroundColor = white;
  }
};

vqvButton.addEventListener('click', () => {
  if (boardSizeInput.value === '') {
    alert('Board inválido!');
  } else {
    localStorage.setItem('boardSize', JSON.stringify(boardSizeInput.value));
    deleteBoard();
    generateBoard(boardSizeInput.value);
    turnBoardWhite();
    localStorage.setItem('pixelBoard', JSON.stringify({}));
  }
});

clearBoardButton.addEventListener('click', () => {
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = white;
    localStorage.setItem('pixelBoard', JSON.stringify({}));
  }
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('color')) {
    cor1.classList.remove('selected');
    cor2.classList.remove('selected');
    cor3.classList.remove('selected');
    cor4.classList.remove('selected');

    event.target.classList.add('selected');
  }
});
