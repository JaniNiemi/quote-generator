const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authortext = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

// Show loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide loading
function removeLoadingSpinner() {
    if (!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Fetch quote from api
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

    try {
         const response = await fetch(proxyUrl + url);
         const data = await response.json();

        //  If author of quote is blank, set author name to "Unknown"
         if(data.quoteAuthor === "") {
             authortext.innerText = "Unknown";
         } else {
             authortext.innerText = data.quoteAuthor;
         }
         
         //  Reduce font size if quote is long
         if(data.quoteText.length > 100) {
            quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote");
        }

        quoteText.innerText = data.quoteText;
        // Stop loader, show quote
        removeLoadingSpinner();
    } catch (error) {
        getQuote();
    }

}

// Take quote and author from page and tweet
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authortext.innerText;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// Get Quote on page load
getQuote();