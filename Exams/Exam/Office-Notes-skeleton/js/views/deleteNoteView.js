var app = app || {};

app.deleteNoteView = (function() {
    function DeleteNoteView(selector, data) {
        $.get('templates/deleteNote.html', function(template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);
        })
    }

    return {
        load: function (selector, data) {
            new DeleteNoteView(selector, data);
        }
    }
}());
