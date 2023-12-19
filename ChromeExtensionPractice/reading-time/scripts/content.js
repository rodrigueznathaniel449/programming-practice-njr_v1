const article = document.querySelector("article");

//document.querySelector may return null if no match
if (article) {
    const text = article.textContent;
    const wordMatchRegExp = /[^\s]+/g; //Regular Expression
    const words = text.matchAll(wordMatchRegExp);
    //matchAll returns an iterator, convert to array to get word cont
    const wordCount = [...words].length;
    const readingTime = Math.round(wordCount / 200);
    const badge = document.createElement("p");
    //Use the same styling as the publish information in an articles header
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = '⏱️ ${readingTime} min read';
    //suport for API reference docs
    const heading = article.querySelector("h1");
    //suport for article docs with date
    const date = article.querySelector("time")?.parentNode;
    (date ?? heading).insertAdjacentElement("afterend", badge);
}