const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const xBtn = document.getElementById('x');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []

function loading() {
    loader.hidden=false;
    quoteContainer.hidden = true;
}

function complete(){
    loader.hidden=true;
    quoteContainer.hidden = false;
}

function newQuote() {
    loading();
    // Pick a random quote from array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

     // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author){
        authorText.textContent = "Uknown"
    } else {
        authorText.textContent = quote.author 
    }

    // Check Quote length to determine styling
    if (quote.length > 120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote')
    }

    quoteText.textContent = quote.text;
    complete();

}

async function getQuote() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
        console.error('Error fetching quotes from API, using local quotes:', error);
        apiQuotes = localQuotes;
        newQuote();
    }
}
// Share Quote on X 
function shareToX() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(quote)} - ${encodeURIComponent(author)}`;
    window.open(xUrl, '_blank');
  }

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
xBtn.addEventListener('click', shareToX)

getQuote();

