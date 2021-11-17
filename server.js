//Use Express back end web application framework for Node.js
const express = require('express');
const app = express();
//Import file that actually handles get,post,put,delete requests at endpoint
const quoteRouter = require('./getQuoteRouter')

let { quotes } = require('./data');
const { getRandomElement, generateId } = require('./utils');

const PORT = process.env.PORT || 4001;

// Allow express to serve static files
// - express looks up the files relative to the static director
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
})

// Mount the getRandomQuote router
app.use('/api/quotes', quoteRouter);