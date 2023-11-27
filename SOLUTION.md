## About my solution

I ensured that the following mission objectives were completed.

- Make the spinner rotate using CSS3.
- Query the backend for list of available stocks.
- Query the backend for data about each stock.
- Hide the spinner after all data is loaded.
- Log to the console the result stock data in a structured way.
- Fix backend (app.js) to return a meaningful error message when stock data cannot be retrieved (now the request just hangs!).

### Aditional packages/utils used

- 'nodemon' npm package for allowing my code changes to be observed without restarting the Node server
- 'try-catch' surrounded error-prone code in a try-catch block to catch potential errors and show user-friendly responses.
- 'functions': Used custom functions to accomplish mission objectives.
- 'error handler': A custom function that sends meaningful error messages with the appropriate status code to the client.
