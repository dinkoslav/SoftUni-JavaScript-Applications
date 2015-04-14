var app = app || {};

(function (){
    var url = 'https://api.parse.com/1/classes/Book';
    var ajaxRequester = app.ajaxRequester.get();

    var data = app.data.get(url, ajaxRequester);
    var controller = app.controller.get(data);

    controller.load('#books');
    controller.addEventHandlers('#wrapper');
})();
