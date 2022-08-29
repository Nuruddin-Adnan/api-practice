const getQuote = () => {
    fetch('https://api.kanye.rest/')
        .then(res => res.json())
        .then(data => showQuote(data))
}

const showQuote = quote => {
    const quoteDiv = document.getElementById('quote')
    quoteDiv.innerText = quote.quote
    console.log(quote);
}