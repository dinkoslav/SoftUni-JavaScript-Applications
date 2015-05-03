var app = app || {};

app.controller = (function() {
    var Controller = function(){
        this.model = app.model.load();
    };

    Controller.prototype.loadWelcome = function(selector){
        app.welcomeView.load(selector);
    };

    Controller.prototype.loadLogin = function(selector){
        app.loginView.load(selector);
        this.attachEventHandlers(selector);
    };

    Controller.prototype.loadRegister = function(selector){
        app.registerView.load(selector);
        this.attachEventHandlers(selector);
    };

    Controller.prototype.loadLogout = function(selector){
        sessionStorage.clear();
        Noty.success('Logout Success!');
        app.router.setLocation('#/');
    };

    Controller.prototype.loadAddNote = function(selector){
        app.addNoteView.load(selector);
        this.attachEventHandlers(selector);
    };

    Controller.prototype.loadHome = function(selector){
        var _this = this;
        this.model.user.getUserById()
            .then(function(data){
                sessionStorage.setItem('fullName', data.fullName);
                sessionStorage.setItem('username', data.username);
                app.homeView.load(selector, data);
            },function(error){
                Noty.error(error.statusText);
            });

        this.attachEventHandlers(selector);
    };

    Controller.prototype.loadMyNotes = function(selector, page){
        var author = sessionStorage.fullName;

        this.model.note.getAllMyNotes(author)
            .then(function(data){
                app.listAllMyNotesView.load(selector, data, page);
            },function(error){
                Noty.error(error.statusText);
            });

        this.attachEventHandlers(selector);
    };

    Controller.prototype.loadAllNotes = function(selector, page){
        var date = new Date();
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
        var dd  = date.getDate().toString();
        var dateNow = yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]);

        this.model.note.getAllNotes(dateNow)
            .then(function(data){
                app.officeView.load(selector, data, page);
            },function(error){
                Noty.error(error.statusText);
            });

        this.attachEventHandlers(selector);
    };

    Controller.prototype.loadEditNote = function(selector, noteId){
        this.model.note.getNoteById(noteId)
            .then(function(data){
                app.editNoteView.load(selector, data);
            },function(error){
                Noty.error(error.statusText);
            });

        this.attachEventHandlers(selector);
    };

    Controller.prototype.loadDeleteNote = function(selector, noteId){
        this.model.note.getNoteById(noteId)
            .then(function(data){
                app.deleteNoteView.load(selector, data);
            },function(error){
                Noty.error(error.statusText);
            });

        this.attachEventHandlers(selector);
    };

    Controller.prototype.attachEventHandlers = function(selector){
        $(selector).unbind();
        attachRegisterEventHandler.call(this, selector);
        attachLoginEventHandler.call(this, selector);
        attachAddNoteEventHandler.call(this, selector);
        attachDeleteNoteViewEventHandler.call(this, selector);
        attachEditNoteViewEventHandler.call(this, selector);
        attachEditNoteEventHandler.call(this, selector);
        attachDeleteNoteEventHandler.call(this, selector);
    };

    var attachRegisterEventHandler = function(selector){
        var _this = this;

        $(selector).on('click', '#register', function(){
            var username = $('#username').val();
            var password = $('#password').val();
            var fullName = $('#fullName').val();

            var data = {
                username: username,
                password: password,
                fullName: fullName
            };

            _this.model.user.register(data)
                .then(function(data){
                    sessionStorage.setItem('sessionToken', data.sessionToken);
                    sessionStorage.setItem('objectId', data.objectId);
                    app.router.setLocation('#/home/');
                    Noty.success("Registration Success!");
                },function(error){
                    Noty.error("Registration Failed!");
                })
        });
    };

    var attachLoginEventHandler = function(selector){
        var _this = this;

        $(selector).on('click', '#login', function(){
            var username = $('#username').val();
            var password = $('#password').val();

            var data = {
                username: username,
                password: password
            };

            _this.model.user.login(data)
                .then(function(data){
                    sessionStorage.setItem('sessionToken', data.sessionToken);
                    sessionStorage.setItem('objectId', data.objectId);
                    app.router.setLocation('#/home/');
                    Noty.success('Successfully Logged in!');
                },function(error){
                    Noty.error(error.statusText);
                });
        })
    };

    var attachAddNoteEventHandler = function(selector){
        var _this = this;

        $(selector).on('click', '#addNote', function(){
            var title = $('#title').val();
            var text = $('#text').val();
            var deadline = $('#deadline').val();
            var author = sessionStorage.fullName;
            var userId = sessionStorage.objectId;
            var data = {
                title: title,
                text: text,
                author: author,
                deadline: deadline,
                ACL : {}
            };

            data.ACL[userId] = {"write": true, "read": true};

            _this.model.note.addNote(data)
                .then(function(data){
                    app.router.setLocation('#/myNotes/1');
                    Noty.success("Adding a note Success!");
                },function(error){
                    Noty.error("Adding a note Failed!");
                })
        });
    };

    var attachDeleteNoteViewEventHandler = function(selector){
        var _this = this;

        $(selector).on('click', '.delete', function(){
            var noteId = $(this).parent().data('id');
            _this.model.note.getNoteById(noteId)
                .then(function(data){
                    app.router.setLocation('#/deleteNote/' + noteId);
                },function(error){
                    app.router.setLocation('#/myNotes/1');
                    Noty.error(error.statusText);
                })
        })
    };

    var attachDeleteNoteEventHandler = function(selector){
        var _this = this;

        $(selector).on('click', '#delete', function(){
            var noteId = $(this).parent().data('id');

            _this.model.note.deleteNote(noteId)
                .then(function(data){
                    app.router.setLocation('#/myNotes/1');
                    Noty.success("Delete Success!");
                },function(error){
                    app.router.setLocation('#/myNotes/1');
                    Noty.error("Delete Failed!");
                })
        })
    };

    var attachEditNoteEventHandler = function(selector){
        var _this = this;

        $(selector).on('click', '#edit', function(){
            var noteId = $(this).parent().data('id');
            var title = $('#title').val();
            var text = $('#text').val();
            var deadline = $('#deadline').val();
            var author = sessionStorage.fullName;
            var data = {
                title: title,
                text: text,
                author: author,
                deadline: deadline
            };

            _this.model.note.editNote(noteId, data)
                .then(function(data){
                    app.router.setLocation('#/myNotes/1');
                    Noty.success("Edit Note Success!");
                },function(error){
                    app.router.setLocation('#/myNotes/1');
                    Noty.error("Edit Note Failed!");
                })
        })
    };

    var attachEditNoteViewEventHandler = function(selector){
        var _this = this;

        $(selector).on('click', '.edit', function(){
            var noteId = $(this).parent().data('id');
            _this.model.note.getNoteById(noteId)
                .then(function(data){
                    app.router.setLocation('#/editNote/' + noteId);
                },function(error){
                    app.router.setLocation('#/myNotes/1');
                    Noty.error(error.statusText);
                })
        })
    };

    return {
        load: function () {
            return new Controller();
        }
    }
})();