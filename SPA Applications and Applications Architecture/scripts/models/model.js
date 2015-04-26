var app = app || {};

app.model = (function (){
    var Model = function(){
        this.baseUrl = 'https://api.parse.com/1/';
        this.requester = app.requester.load(this.baseUrl);
        this.book = app.book.load(this.baseUrl, this.requester);
    };

    return {
        load: function () {
            return new Model();
        }
    }
})();
