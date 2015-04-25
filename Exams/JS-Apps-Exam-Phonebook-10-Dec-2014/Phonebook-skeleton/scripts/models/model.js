var app = app || {};

app.model = (function() {
    function Model(baseUrl, requester) {
        this.user = app.user.load(baseUrl, requester);
        this.phone = app.phone.load(baseUrl, requester);
    }

    return {
        load: function (baseUrl, requester) {
            return new Model(baseUrl, requester);
        }
    }
}());
