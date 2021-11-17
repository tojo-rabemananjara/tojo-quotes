const submitButton = document.getElementById('submit-quote');
const updatedQuoteContainer = document.getElementById('updated-quote');

submitButton.addEventListener('click', () => {
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;
  const quoteId = document.getElementById('id').value;

  fetch(`/api/quotes/${quoteId}?quote=${quote}&person=${person}`, {method: 'PUT'})
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(({ quote }) => {
      const updatedQuote = document.createElement('div');
      updatedQuote.innerHTML = `
    <h3>Your quote was updated!</h3>
    <div class="quote-text">${quote.quote}</div>
    <div class="attribution">- ${quote.person}</div>
    <div class="quote-id"> Quote ID: ${quoteId}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
      updatedQuoteContainer.appendChild(updatedQuote);
    });
});    