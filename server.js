const express = require('express');
const app = express();
const quoteRouter = require('./getQuoteRouter')
let { quotes } = require('./data');
const { getRandomElement, generateId } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
})

// Mount the getRandomQuote router
app.use('/api/quotes', quoteRouter);