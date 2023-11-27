const loadingEl = document.querySelector('.spinner-container');

const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');

function drawLine(start, end, style) {
  ctx.beginPath();
  ctx.strokeStyle = style || 'black';
  ctx.moveTo(...start);
  ctx.lineTo(...end);
  ctx.stroke();
}

function drawTriangle(apex1, apex2, apex3) {
  ctx.beginPath();
  ctx.moveTo(...apex1);
  ctx.lineTo(...apex2);
  ctx.lineTo(...apex3);
  ctx.fill();
}

// Handles showing the loading animation
function showLoad() {
  loadingEl.classList.remove('hide');
  loadingEl.classList.add('load');
}
// Handles hiding the loading animation
function hideLoad() {
  loadingEl.classList.remove('load');
  loadingEl.classList.add('hide');
}

// Calls hide and show animation function based on state input
function setLoadingState(state) {
  switch (state) {
    case 'START':
      showLoad();
      break;
    case 'END':
      hideLoad();
      break;

    default:
      hideLoad();
      break;
  }
}

// Gets all avaliable stock data (returns an array)
async function loadAvailableStocks() {
  setLoadingState('START');
  const response = await fetch('/stocks');
  const data = response.json();
  return data;
}

// Gets data about specific stock symbol
async function getSymbolStockData(name) {
  const response = await fetch(`/stocks/${name}`);
  const result = await response.json();
  if (response.status === 200) {
    return result;
  } else {
    const { message } = result;
    console.log(`ERROR: ${message}`);
    return [];
  }
}

// Handles all server or API request function calls and returns data in a key value pair frmart
async function loadAllData() {
  let stockData = {};
  try {
    const { stockSymbols } = await loadAvailableStocks();
    if (stockSymbols) {
      for (const symbol of stockSymbols) {
        const result = await getSymbolStockData(symbol);
        stockData = {
          ...stockData,
          [symbol]: result,
        };
      }
    }

    setLoadingState('END');
  } catch (error) {
    setLoadingState('END');
    console.log('An error occured fetching stock data.', error);
  }

  return stockData;
}

// On page load
async function onPageLoad() {
  const data = await loadAllData();

  console.log(data);

  drawLine([50, 50], [50, 550]);
  drawTriangle([35, 50], [65, 50], [50, 35]);

  drawLine([50, 550], [950, 550]);
  drawTriangle([950, 535], [950, 565], [965, 550]);
}

window.addEventListener('load', onPageLoad);
