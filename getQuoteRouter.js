//Use Express back end web application framework for Node.js
const express = require('express');
//Use express.Router() modular mountable route handlers.
const quoteRouter = express.Router();

const { quotes } = require('./data');
const { getRandomElement, generateId, getIndexById } = require('./utils');
const { response, query } = require('express');

//whatever the environment variable PORT is or 3000 if nothing is there
const PORT = process.env.PORT || 4001;

//get a random quote from the quotes data
quoteRouter.get('/random', (req, res) => {
  res.status(200).send({
    quote: getRandomElement(quotes)
  });
});

//get all quotes in quotes data
// if query contains a person attribute, return all quotes said by the same person
// otherwise return all quotes data
quoteRouter.get('/', (req, res) => {
  if (req.query.person !== undefined) {
    const quotesByPerson = quotes.filter(quote => quote.person === req.query.person);
    res.status(200).send({
      quotes: quotesByPerson
    });
  } else {
    res.status(200).send({
      quotes: quotes
    });
  }
});

//Add a new quote to the quotes data ensuring that a query includes nonempty saying + person
quoteRouter.post('/', (req, res) => {
  const newQuote = {
    quote: req.query.quote,
    person: req.query.person,
    id: generateId(quotes)
  };
  if (newQuote.quote && newQuote.person) {
    quotes.push(newQuote);
    res.status(200).send({ quote: newQuote });
  } else {
    console.log('A field was missing from quote text and or person')
    res.status(400).send();
  }
});

// Put route - update the data in the array (based on id provided)
quoteRouter.put('/:id', (req, res) => {
  // check if parameters are present in the request
  if (req.query.person && req.query.quote) {
    const quoteIndex = getIndexById(req.params.id, quotes);
    // check if there is a match using quote id provided as input
    if (quoteIndex !== -1) {
      const updatedQuote = {
        id: quotes[quoteIndex].id,
        quote: req.query.quote,
        person: req.query.person
      }
      quotes.splice(quoteIndex, 1, updatedQuote);
      res.status(200).send({ quote: req.query });
    } else {
      res.status(404).send(`Quote with id ${req.params.id} not found.`)
    }
  } else {
    res.status(400).send("One or more fields is missing.")
  }
})

//Delete a quote from quotes data
quoteRouter.delete('/:id', (req, res) => {
  const quoteIndex = getIndexById(req.params.id, quotes);
  if (quoteIndex !== -1) {
    quotes.splice(quoteIndex, 1);
    res.status(200).send({ quote: quotes[quoteIndex] });
  } else {
    res.status(404).send(`Quote with id ${req.params.id} not found.`)
  }
})


module.exports = quoteRouter;


