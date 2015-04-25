var app = app || {};

app.controller = (function() {
    function Controller(model) {
        this._model = model;
    }

    Controller.prototype.loadWelcome = function loadWelcome(selector) {
        if(sessionStorage.getItem('sessionToken')){
            var user = {
                username: sessionStorage.getItem('username'),
                fullName: sessionStorage.getItem('fullname')
            };
            app.homeView.load(selector, user);
        }
        else{
            app.welcomeView.load(selector);
        }
    };

    Controller.prototype.loadPhonebook = function loadPhonebook(selector) {
        if(sessionStorage.getItem('sessionToken')){
            this._model.phone.getAllPhones()
                .then(function(data){
                    app.phonebookView.load(selector, data);
                }),
                function(error){
                    console.log(error.statusText);
                }
            this.attachLoggedEventHandlers(selector);
        }
        else{
            app.welcomeView.load(selector);
        }
    };

    Controller.prototype.loadAddPhone = function loadAddPhone(selector) {
        if(sessionStorage.getItem('sessionToken')){
            app.addPhoneView.load(selector);
            this.attachLoggedEventHandlers(selector);
        }
        else{
            app.welcomeView.load(selector);
        }
    };

    Controller.prototype.loadDeletePhone = function loadAddPhone(selector) {
        if(sessionStorage.getItem('sessionToken')){
            this.attachLoggedEventHandlers(selector);
        }
        else{
            app.welcomeView.load(selector);
        }
    };

    Controller.prototype.loadRegister = function loadRegister(selector) {
        if(sessionStorage.getItem('sessionToken')){
            var user = {
                username: sessionStorage.getItem('username'),
                fullName: sessionStorage.getItem('fullname')
            };
            app.homeView.load(selector, user);
        }
        else{
            app.registerView.load(selector);
            attachRegisterHandler.call(this, selector);
        }
    };

    Controller.prototype.loadLogin = function loadLogin(selector) {
        if(!sessionStorage.getItem('sessionToken')){
            var user = {
                username: sessionStorage.getItem('username'),
                fullName: sessionStorage.getItem('fullname')
            };
            app.loginView.load(selector);
            attachLoginHandler.call(this, selector);
        }
        else{
            app.homeView.load(selector);
        }
    };

    Controller.prototype.loadHome = function loadHome(selector, user) {
        if(sessionStorage.getItem('sessionToken')){
            var user = {
                username: sessionStorage.getItem('username'),
                fullName: sessionStorage.getItem('fullname')
            };
            app.homeView.load(selector, user);
            this.attachLoggedEventHandlers(selector);
        }
        else{
            app.welcomeView.load(selector);
        }
    };

    Controller.prototype.attachLoggedEventHandlers = function(selector){
        $(selector).unbind();
        attachLogoutHandler.call(this, selector);
        attachAddPhoneHandler.call(this, selector);
        attachDeletePhoneHandler.call(this, selector);
    }

    var attachRegisterHandler = function (selector) {
        var _this = this;
        $(selector).on('click', '#register', function () {
            var username = $('#username').val();
            var password = $('#password').val();
            var fullName = $('#fullName').val();

            newUser = {
                "username":username,
                "password":password,
                "fullName":fullName
            };
            _this._model.user.register(newUser)
                .then(function (data) {
                    sessionStorage.setItem('sessionToken', data.sessionToken);
                    return _this._model.user.getUserById(data.objectId);
                },
                function (error) {
                    console.log(error);
                })
                .then(function (data) {
                    sessionStorage.setItem('username', data.username);
                    sessionStorage.setItem('fullname', data.fullName);
                    sessionStorage.setItem('objectId', data.objectId);
                    _this.loadHome(selector, data);
                },
                function (error) {
                    console.log(error);
                });
        });
    };

    var attachLogoutHandler = function (selector) {
        var _this = this;
        if(sessionStorage.getItem('sessionToken')){
            $(selector).on('click', '#logout', function(){
                _this._model.user.logout()
                    .then(function(data){
                        sessionStorage.clear();
                        _this.loadLogin(selector);
                    },
                    function(error){
                        console.log(error.statusText);
                    });
            })
        }
        else{
            _this.loadLogin(selector);
        }
    };

    var attachLoginHandler = function (selector) {
        var _this = this;
        if(!sessionStorage.getItem('sessionToken')){
            $(selector).on('click', '#login', function(){
                var user = {
                    username: $('#username').val(),
                    password: $('#password').val()
                };
                _this._model.user.login(user)
                    .then(function (data) {
                        sessionStorage.setItem('username', data.username);
                        sessionStorage.setItem('fullname', data.fullName);
                        sessionStorage.setItem('objectId', data.objectId);
                        sessionStorage.setItem('sessionToken', data.sessionToken);
                        _this.loadHome(selector, data);
                    },
                    function (error) {
                        console.log(error);
                    });
            })
        }
        else{
            _this.loadHome(selector);
        }
    };

    var attachAddPhoneHandler = function (selector) {
        var _this = this;
        if(sessionStorage.getItem('sessionToken')){
            $(selector).on('click', '#add-phone', function(){
                var personName = $('#personName').val();
                var phoneNumber = $('#phoneNumber').val();
                var userId = sessionStorage.getItem('objectId');
                var acl = {};
                acl[userId] = {"write":true,"read":true};

                var newPhone = {
                    name: personName,
                    phoneNumber: phoneNumber,
                    ACL: acl
                }

                _this._model.phone.addPhone(newPhone)
                    .then(function(data){
                        _this.loadPhonebook(selector);
                    },
                    function(error){
                        console.log(error.statusText);
                    })
            })
        }
        else{
            _this.loadWelcome(selector);
        }
    };

    var attachDeletePhoneHandler = function (selector) {
        var _this = this;
        if(sessionStorage.getItem('sessionToken')){
            $(selector).on('click', '#delete-phone', function(ev){
                var name = $(ev.target).parent().parent().find(':first').text();
                var phoneNumber = $(ev.target).parent().parent().find('>td:nth-child(2)').text();
                console.log(ev.target.id);
                _this._model.phone.getAllPhones()
                    .then(function(data){
                        data.results.forEach(function(p){
                            if(p.name == name && p.phoneNumber == phoneNumber){
                                app.deletePhoneView.load(selector, p);
                                //_this._model.phone.deletePhone(p.objectId, name, phoneNumber);
                            }
                        })
                    }),
                    function(error){
                        console.log(error.statusText);
                    }
            })
        }
        else{
            _this.loadWelcome(selector);
        }
    };

    return {
        load: function (model) {
            return new Controller(model);
        }
    }
})();
