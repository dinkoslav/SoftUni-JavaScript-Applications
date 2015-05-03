var app = app || {};

(function() {
    app.router = Sammy(function () {
        var selector = '#main';

        var controller = app.controller.load();

        this.get('#/', function() {
            if(!sessionStorage.sessionToken){
                controller.loadWelcome(selector);
            }
            else{
                app.router.setLocation('#/home');
            }
        });
        this.get('#/login', function() {
            if(!sessionStorage.sessionToken){
                controller.loadLogin(selector);
            }
            else{
                app.router.setLocation('#/home');
            }
        });
        this.get('#/register', function() {
            if(!sessionStorage.sessionToken){
                controller.loadRegister(selector);
            }
            else{
                app.router.setLocation('#/home');
            }
        });
        this.get('#/home', function() {
            if(sessionStorage.sessionToken){
                controller.loadHome(selector);
            }
            else{
                app.router.setLocation('#/');
            }
        });
        this.get('#/add-post', function() {
            if(sessionStorage.sessionToken){
                controller.loadAddPost(selector);
            }
            else{
                app.router.setLocation('#/');
            }
        });
        this.get('#/edit-profile', function() {
            if(sessionStorage.sessionToken){
                controller.loadEditProfile(selector);
            }
            else{
                app.router.setLocation('#/');
            }
        });
    });

    app.router.run('#/');
}());
