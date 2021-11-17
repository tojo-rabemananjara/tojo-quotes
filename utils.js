//get a random element from an array
const getRandomElement = arr => {
  //check if object is an array
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

//generate an ID on creation of quote
const generateId = arr => {
  let id = 0;

  //if there's at least one lement in the array that has id === id
  while (arr.some(quote => quote.id === id)) {
    id++;
  }
  return id;
}

//gets quotes index by quote id
const getIndexById = (id, arr) => {
  return arr.findIndex((quote) => {
    // return the index if the there is a match 
    return quote.id == id;
  });
};

module.exports = {
  getRandomElement,
  generateId,
  getIndexById
};