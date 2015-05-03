var app = app || {};

app.editProfileView = (function() {
    function EditProfileView(selector, data) {
        $.get('templates/edit-profile.html', function(template) {
            var output = Mustache.render(template, data);
            $(selector).append(output);
            $('input[value=' + data.gender + ']').attr('checked', 'checked');
        });
    }

    return {
        load: function (selector, data) {
            new EditProfileView(selector, data);
        }
    }
}());
