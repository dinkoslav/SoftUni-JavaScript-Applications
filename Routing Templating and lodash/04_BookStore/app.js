(function (){
    var books = [{"book":"The Grapes of Wrath","author":"John Steinbeck","price":"34,24","language":"French"},
    {"book":"The Great Gatsby","author":"F. Scott Fitzgerald","price":"39,26","language":"English"},
    {"book":"Nineteen Eighty-Four","author":"George Orwell","price":"15,39","language":"English"},
    {"book":"Ulysses","author":"James Joyce","price":"23,26","language":"German"},
    {"book":"Lolita","author":"Vladimir Nabokov","price":"14,19","language":"German"},
    {"book":"Catch-22","author":"Joseph Heller","price":"47,89","language":"German"},
    {"book":"The Catcher in the Rye","author":"J. D. Salinger","price":"25,16","language":"English"},
    {"book":"Beloved","author":"Toni Morrison","price":"48,61","language":"French"},
    {"book":"Of Mice and Men","author":"John Steinbeck","price":"29,81","language":"Bulgarian"},
    {"book":"Animal Farm","author":"George Orwell","price":"38,42","language":"English"},
    {"book":"Finnegans Wake","author":"James Joyce","price":"29,59","language":"English"},
    {"book":"The Grapes of Wrath","author":"John Steinbeck","price":"42,94","language":"English"}];

    var orderBooksByLanguage = _.sortBy(books, function(num) {
        return [num.language, num.author, num.price];
    });

    var authors = _.groupBy(books, function(b){
        return b.author;
    });

    var averagePriceByAuthor = _.map(authors, function(books, author) {
        var authorBooks = _.groupBy(books, function(b){
            return b.author == author;
        });

        var avg =  _.reduce(authorBooks.true, function(agvSum, book) {
                return agvSum + parseFloat(book.price);
            }, 0) / authorBooks.true.length;

        return {uniqueAuthor: author,  averagePrice: avg
    }});

    var filterEngAndGerBooks = _.filter(books, function(b){
        return b.language == "English" || b.language == "German" && b.price < 30;
    });

    var filteredEngAndGerBooks = _.groupBy(filterEngAndGerBooks, function(b){
        return b.author;
    });

    //console.log(orderBooksByLanguage);
    //console.log(averagePriceByAuthor);
    console.log(filteredEngAndGerBooks);
})();
