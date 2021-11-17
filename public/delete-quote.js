const submitButton = document.getElementById('submit-quote');
const deletedQuoteContainer = document.getElementById('deleted-quote');

submitButton.addEventListener('click', () => {
  const quoteId = document.getElementById('id').value;
  fetch(`/api/quotes/${quoteId}`, { method: 'DELETE' })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(({ quote }) => {
      console.log(quote)
      const deletedQuote = document.createElement('div');
      deletedQuote.innerHTML = `
    <h3>'Your quote was deleted!'</h3>
    <div class="quote-text">${quote.quote}</div>
    <div class="attribution">- ${quote.person}</div>
    <div class="quote-id"> Quote ID: ${quoteId}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
      deletedQuoteContainer.appendChild(deletedQuote);
    });
});