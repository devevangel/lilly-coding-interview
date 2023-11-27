const express = require('express');
const path = require('path');
const stocks = require('./stocks');

const app = express();
app.use(express.static(path.join(__dirname, 'static')));

app.get('/stocks', async (req, res) => {
  try {
    const stockSymbols = await stocks.getStocks();
    res.status(200).send({ stockSymbols });
  } catch (error) {
    console.log('unable to provide stock data');
    res.status(400).send('unable to provide stock data');
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
    console.log(`unable to provide stock data for '${symbol}'`);
    res.status(400).send(`unable to provide stock data for '${symbol}'`);
  }
});

app.listen(3000, () => console.log('Server is running!'));
