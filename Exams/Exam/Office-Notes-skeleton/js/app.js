var app = app || {};

(function (){
    app.router = Sammy(function(){
        var selector = "#container";
        var controller = app.controller.load();

        this.get('#/', function() {
            if(!sessionStorage.sessionToken){
                $('#menu').hide();
                controller.loadWelcome(selector);
            }
            else{
                app.router.setLocation('#/home');
            }
        });
        this.get('#/login/', function() {
            if(!sessionStorage.sessionToken){
                $('#menu').hide();
                controller.loadLogin(selector);
            }
            else{
                app.router.setLocation('#/home');
            }
        });
        this.get('#/register/', function() {
            if(!sessionStorage.sessionToken){
                $('#menu').hide();
                controller.loadRegister(selector);
            }
            else{
                app.router.setLocation('#/home');
            }
        });
        this.get('#/home/', function() {
            if(sessionStorage.sessionToken){
                $('#menu').show();
                controller.loadHome(selector);
            }
            else{
                app.router.setLocation('#/');
            }
        });
        this.get('#/office/:page', function() {
            var page = this.params['page'];
            if(sessionStorage.sessionToken){
                $('#menu').show();
                controller.loadAllNotes(selector, page);
            }
            else{
                app.router.setLocation('#/');
            }
        });
        this.get('#/logout/', function() {
            if(sessionStorage.sessionToken){
                $('#menu').show();
                controller.loadLogout(selector);
            }
            else{
                app.router.setLocation('#/');
            }
        });
        this.get('#/addNote/', function() {
            if(sessionStorage.sessionToken){
                $('#menu').show();
                controller.loadAddNote(selector);
            }
            else{
                app.router.setLocation('#/');
            }
        });
        this.get('#/myNotes/:page', function() {
            var page = this.params['page'];
            if(sessionStorage.sessionToken){
                $('#menu').show();
                controller.loadMyNotes(selector, page);
            }
            else{
                app.router.setLocation('#/');
            }
        });
        this.get('#/editNote/:noteId', function() {
            var noteId = this.params['noteId'];
            if(sessionStorage.sessionToken){
                $('#menu').show();
                controller.loadEditNote(selector, noteId);
            }
            else{
                app.router.setLocation('#/');
            }
        });
        this.get('#/deleteNote/:noteId', function() {
            var noteId = this.params['noteId'];
            if(sessionStorage.sessionToken){
                $('#menu').show();
                controller.loadDeleteNote(selector, noteId);
            }
            else{
                app.router.setLocation('#/');
            }
        });
    });

    app.router.run('#/');
})();
