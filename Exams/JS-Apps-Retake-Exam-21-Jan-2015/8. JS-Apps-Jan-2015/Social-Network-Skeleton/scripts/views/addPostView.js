var app = app || {};

app.addPostView = (function() {
    function AddPostView(selector) {
        $.get('templates/post-box.html', function(template) {
            var output = Mustache.render(template);
            $('#header').after(output);

        });
    }

    return {
        load: function (selector) {
            new AddPostView(selector);
        }
    }
}());


