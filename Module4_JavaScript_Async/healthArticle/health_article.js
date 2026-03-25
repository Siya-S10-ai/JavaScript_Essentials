// Step 1: Defining object and variables for XMLHttpRequest
var xhr = new XMLHttpRequest();

var url = './health_article.json';

// Step 2: URL definition and request setup
// Now, we need to prepare a GET request to the specified URL,
// which we have saved in a variable named url in asynchronous
// mode within this file
xhr.open('GET', url, true);
/** The open method configures an XHR request with the
 * following parameters:
 * 'GET': Specifies the HTTP method used for the request 
 (in this case, a GET request).
 * URL: Represents the URL from where you will fetch the data.
 * True: Indicates if the request is asynchronous (true) or
 synchronous (false). In this case, it's set to true for
 asynchronous operation, allowing other scripts to run while
 the request is processed.*/


 // Step 3: Response type specification
// In this step, we need to inform the XMLHttpRequest object
// that the expected response from the server should be in
// JSON format.
xhr.responseType = 'json';


// Step 4: Handling the 'onload' event
xhr.onload = function() {
    var articles = xhr.response.articles;
    var articleDiv = document.getElementById('articles');
    /**var articles = xhr.response.articles;
      to retrieve the articles array from the JSON response.
    * Var articlesDiv = document.getElementById('articles');
      to retrieve the HTML element with the ID 'articles'
      where the fetched content will be displayed. */
}


// Step 5: Iterating through articles and constructing HTML
articles.forEach(function(article) {
    // Create HTML elements dynamically, for example,
    // <div>, <h2>, <p>, <h3>, <ul>, <li>
    // for each article's title, description, ways_to_achieve,
    // and benefits using createElement DOM method:
    var articleDiv = document.createElement('div');
    // Populate these HTML elements with corresponding content
    // from the fetched JSON data:
    articleDiv.classList.add('article');

    var title = document.createElement('h2');
    title.textContent = article.title;

    var description = document.createElement('p');
    description.textContent = article.description;

    var waysHeader = document.createElement('h3');
    waysHeader.textContent = 'Ways to Achieve:';

    var waysList = document.createElement('ul');
    article.ways_to_achieve.forEach(function(way) {
        var listItem = document.createElement('li');
        listItem.textContent = way;
        waysList.appendChild(listItem);
    });

    var benefitsHeader = document.createElement('h3');
    benefitsHeader.textContent = 'Benefits:';

    var benefitsList = document.createElement('ul');
    article.benefits.forEach(function(benefit) {
        var listItem = document.createElement('li');
        listItem.textContent = benefit;
        benefitsList.appendChild(listItem);
    });

    //Attach these elements to the articlesDiv to display
    // each article's details on the webpage as follows
    articleDiv.appendChild(title);
    articleDiv.appendChild(description);
    articleDiv.appendChild(waysHeader);
    articleDiv.appendChild(waysList);
    articleDiv.appendChild(benefitsHeader);
    articleDiv.appendChild(benefitsList);

    articleDiv.appendChild(articleDiv);
});

// We need to send the XMLHttpRequest to fetch tehe data from
// the specified URL
xhr.send(); 