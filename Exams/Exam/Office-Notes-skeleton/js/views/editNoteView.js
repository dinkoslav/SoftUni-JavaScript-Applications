var app = app || {};

app.editNoteView = (function() {
    function EditNoteView(selector, data) {
        $.get('templates/editNote.html', function(template) {
            var output = Mustache.render(template, data);
            $(selector).html(output);
        })
    }

    return {
        load: function (selector, data) {
            new EditNoteView(selector, data);
        }
    }
}());