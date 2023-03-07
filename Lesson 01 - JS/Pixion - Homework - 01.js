// Write a function that takes array of any number of cards (poker cards, 52 unique cards) and returns the number of complete decks we can make using those cards.

function countCompleteDecks(initialDeck) {
  // go through all the cards in the initial deck and increment number of occurences for that card
  initialDeck.forEach((card) => {
    cardOccurenceMap.set(card, cardOccurenceMap.get(card) + 1);
  });

  // find the card that appeared the least amount of times in initial deck
  let numberOfDecks = -1;
  cardOccurenceMap.forEach((value, key, map) => {
    if (numberOfDecks === -1 || value < numberOfDecks) {
      numberOfDecks = value;
    }
  });

  // log the occurences for every card
  //   console.log(cardOccurenceMap);

  return numberOfDecks;
}

const cardOccurenceMap = new Map([]);

const initialDeck = [];
const symbols = ["srce", "pik", "tref", "karo"];

symbols.forEach((symbol) => {
  for (let number = 1; number <= 13; number++) {
    // create a card as an object
    const card = { symbol: symbol, number: number };

    // add between 5 and 105 such cards to initial deck
    let maxNumberOfSuchCards = Math.random() * 100 + 5;
    for (let i = 0; i < maxNumberOfSuchCards; i++) {
      initialDeck.push(card);
    }

    // set number of occurences for that card to 0
    cardOccurenceMap.set(card, 0);
  }
});

console.log(countCompleteDecks(initialDeck));
