var app = app || {};

app.controller = (function() {
    function Controller() {
        this.model= app.model.load();
    }

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

    Controller.prototype.loadHome = function(selector){
        var _this = this;
        this.model.user.getUserById(sessionStorage.objectId)
            .then(function(data){
                Noty.success("yes");
                app.homeView.load(selector, data);
                return _this.model.post.getAllPosts();
            },function(error){
                console.log(error.statusText);
            })
            .then(function(data){
                app.postsView.load(selector, data);
            },function(error){
                console.log(error.statusText);
            });

        this.attachEventHandlers(selector);
    };

    Controller.prototype.loadAddPost = function(selector){
        app.addPostView.load(selector);
        this.attachEventHandlers(selector);
    };

    Controller.prototype.loadEditProfile = function(selector){
        this.model.user.getUserById(sessionStorage.objectId)
            .then(function(data){
                app.editProfileView.load(selector, data);
                $('.post').remove();
                $('#post-container').remove();
            },function(error){
                console.log(error.statusText);
            });

        this.attachEventHandlers(selector);
    };

    Controller.prototype.attachEventHandlers = function(selector){
        $(selector).unbind();
        attachUploadPictureEventHandler.call(this, selector);
        attachRegisterEventHandler.call(this, selector);
        attachLoginEventHandler.call(this, selector);
        attachHoverEventHandler.call(this, selector);
        attachLogoutEventHandler.call(this, selector);
        attachAddPostEventHandler.call(this, selector);
        attachEditProfileEventHandler.call(this, selector);
    };

    var attachUploadPictureEventHandler = function(selector){
        $(selector).on('click', '#upload-file-button', function() {
            $('#picture').click();
        });

        $(selector).on('change', '#picture', function() {
            var file = this.files[0],
                reader;

            if (file.type.match(/image\/.*/)) {
                reader = new FileReader();
                reader.onload = function() {
                    $('.picture-name').text(file.name);
                    $('.picture-preview').attr('src', reader.result);
                    $('#picture').attr('data-picture-data', reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                console.log('wrong file');
            }
        });
    };

    var attachRegisterEventHandler = function(selector){
        var _this = this;
        $(selector).on('click', '#register', function(){
            var username = $('#reg-username').val();
            var password = $('#reg-password').val();
            var name = $('#reg-name').val();
            var about = $('#reg-about').val();
            var gender = $('input[name=gender-radio]:checked').val();
            var picture = $('#picture').data('picture-data');

            var data = {
                username: username,
                password: password,
                name: name,
                about: about,
                gender: gender,
                picture: picture
            };

            _this.model.user.register(data)
                .then(function(data){
                    sessionStorage.setItem('objectId', data.objectId);
                    sessionStorage.setItem('sessionToken', data.sessionToken);
                    app.router.setLocation('#/home');
                },function(error){
                    console.log(error.statusText);
                })
        })
    };

    var attachLoginEventHandler = function(selector){
        var _this = this;
        $(selector).on('click', '#login', function(){
            var username = $('#login-username').val();
            var password = $('#login-password').val();

            var data = {
                username: username,
                password: password
            };

            _this.model.user.login(data)
                .then(function(data){
                    sessionStorage.setItem('objectId', data.objectId);
                    sessionStorage.setItem('sessionToken', data.sessionToken);
                    app.router.setLocation('#/home');
                },function(error){
                    console.log(error.statusText);
                })
        })
    };

    var attachHoverEventHandler = function(selector){
        var _this = this;
        $(selector).on('mouseenter', '#post-owner', function(ev){
            var objectId = $(this).data('user-id');
            var position = {
                x: ev.clientX + 'px',
                y:ev.clientY + 'px'
            };

            _this.model.user.getUserById(objectId)
                .then(function(data){
                    app.hoverView.load(selector, data, position);
                },function(error){
                    console.log(error.statusText);
                })
        });

        $(selector).on('mouseleave', '.hover-box', function(){
            $(".hover-box").remove();
        });

        $(selector).on('mouseleave', '#post-owner', function(){
            $(".hover-box").remove();
        });
    };

    var attachLogoutEventHandler = function(selector){
        var _this = this;
        $(selector).on('click', '#logout', function(){
            _this.model.user.logout()
                .then(function(data){
                    sessionStorage.clear();
                },function(error){
                    console.log(error.statusText);
                })
        })
    };

    var attachAddPostEventHandler = function(selector) {
        var _this = this;
        $(selector).on('click', '#add-post', function(){
            var content = $('#post-content').val();
            var data = {
                "content":content,
                "createdBy": {
                    "__type":"Pointer",
                    "className":"_User",
                    "objectId":sessionStorage.objectId
                }
            };

            _this.model.post.addPost(data)
                .then(function(data){
                    $("#post-container").slideUp( "slow", function() {
                        app.router.setLocation('#/home');
                        $("#post-container").remove();
                    })
                },function(error){
                    console.log(error.statusText);
                })


        })
    };

    var attachEditProfileEventHandler = function(selector){
        var _this = this;
        $(selector).on('click', '#edit-profile', function(){
            var username = $('#username').val();
            var password = $('#password').val();
            var name = $('#name').val();
            var about = $('#about').val();
            var gender = $('input[name=gender-radio]:checked').val();
            var picture = $('#picture').data('picture-data');

            var data = {
                username: username,
                password: password,
                name: name,
                about: about,
                gender: gender,
                picture: picture
            };

            _this.model.user.editProfile(data)
                .then(function(data){
                    _this.model.user.getUserById(sessionStorage.objectId)
                        .then(function(data){
                            sessionStorage.setItem('sessionToken', data.sessionToken);
                            app.router.setLocation('#/');
                        },function(error){
                            console.log(error.statusText);
                        })
                },function(error){
                    console.log(error.statusText);
                })
        })
    };

    return {
        load: function () {
            return new Controller();
        }
    }
})();
