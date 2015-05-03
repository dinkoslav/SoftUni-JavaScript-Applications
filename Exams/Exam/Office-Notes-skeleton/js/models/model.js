var app = app || {};

app.model = (function (){
    var Model = function(){
        this.baseUrl = 'https://api.parse.com/1/';
        this.requester = app.requester.load(this.baseUrl);
        this.user = app.user.load(this.baseUrl, this.requester);
        this.note = app.note.load(this.baseUrl, this.requester);
    };

    return {
        load: function () {
            return new Model();
        }
    }
})();
