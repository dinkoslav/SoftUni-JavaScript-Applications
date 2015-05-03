var app = app || {};

app.postsView = (function() {
    function PostsView(selector, data) {
        $.get('templates/post-page.html', function(template) {
            var output = Mustache.render(template, data);

            $(selector).append(output);
        })
    }

    return {
        load: function (selector, data) {
            new PostsView(selector, data);
        }
    }
}());

