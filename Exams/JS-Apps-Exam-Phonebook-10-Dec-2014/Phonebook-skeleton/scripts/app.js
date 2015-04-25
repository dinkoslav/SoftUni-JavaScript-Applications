var app = app || {};

(function() {
    app.router = Sammy(function () {
        var selector = '#wrapper';
        var baseUrl = 'https://api.parse.com/1/';
        var requester = app.requester.load(baseUrl);
        var model = app.model.load(baseUrl, requester);
        var controller = app.controller.load(model);

        this.get('#/', function() {
            controller.loadWelcome(selector);
        });
        this.get('#/home', function() {
            var user = {
                username: sessionStorage.getItem('username'),
                fullName: sessionStorage.getItem('fullname')
            };
            controller.loadHome(selector, user);
        });
        this.get('#/login', function() {
            controller.loadLogin(selector);
        });
        this.get('#/register', function() {
            controller.loadRegister(selector);
        });
        this.get('#/phonebook', function() {
            controller.loadPhonebook(selector);
        });
        this.get('#/add-phone', function() {
            controller.loadAddPhone(selector);
        });
        this.get('#/delete-phone', function() {
            controller.loadDeletePhone(selector);
        });
        this.get('#/edit-profile', function() {
            $(selector).html('EditProfile');
        });
    });

    app.router.run('#/');
}());
