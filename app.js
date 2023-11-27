const express = require('express');
const path = require('path');
const stocks = require('./stocks');

const app = express();
app.use(express.static(path.join(__dirname, 'static')));

// Handles event in an error occurs and send a useful error message to the client
function errorHandler(res, msg, status) {
  console.log(msg);
  res.status(status).json({
    message: msg,
  });
}

app.get('/stocks', async (req, res) => {
  try {
    const stockSymbols = await stocks.getStocks();
    res.status(200).json({ stockSymbols });
  } catch (error) {
    errorHandler(res, 'unable to provide stock data', 400);
  }
});

app.get('/stocks/:symbol', async (req, res) => {
  const {
    params: { symbol },
  } = req;

  try {
    const data = await stocks.getStockPoints(symbol, new Date());
    res.status(200).send(data);
  } catch (error) {
    errorHandler(res, `unable to provide stock data for '${symbol}'`, 500);
  }
});

app.listen(3000, () => console.log('Server is running!'));
