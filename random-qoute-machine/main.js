const endpoint = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
const quotes = [];

const fetchQuotes = () => {
  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      quotes.push(...data.quotes);
      showNewQuote();
    });
}

const button = document.querySelector(".new-quote-btn");
const tweetBtn = document.querySelector(".tweet-btn");
let randomQuote, prevQuote = "";

const getRandomQuote = quotes => quotes[Math.floor(Math.random() * quotes.length)];
const checkNewQuote = randomQuote => prevQuote.quote === randomQuote.quote ? showNewQuote() : prevQuote = randomQuote;
const showNewQuote = () => {
  const quoteText = document.querySelector(".quote-text");
  const quoteAuthor = document.querySelector(".quote-author");

  randomQuote = getRandomQuote(quotes);
  checkNewQuote(randomQuote);

  quoteText.textContent = randomQuote.quote;
  quoteAuthor.textContent = `- ${randomQuote.author}`;
};
const tweetQuote = () => {
  const encodedStr = encodeURIComponent(`${randomQuote.quote} ${randomQuote.author}`);

  window.open(`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodedStr}`);
}

window.onload = () => fetchQuotes();
button.addEventListener("click", showNewQuote);
tweetBtn.addEventListener("click", tweetQuote);