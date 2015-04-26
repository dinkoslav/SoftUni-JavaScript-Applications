var app = app || {};

(function (){
    app.router = Sammy(function(){
        var selector = "#wrapper";
        var model = app.model.load();
        var controller = app.controller.load(model);

        this.get('#/', function() {
            controller.loadBooks(selector);
        });
        this.get('#/add-book', function() {
            controller.addBook(selector);
        });
        this.get('#/edit-book/:objectId', function() {
            var objectId = this.params['objectId'];
            controller.editBook(selector, objectId);
        });
    });

    app.router.run('#/');
})();
