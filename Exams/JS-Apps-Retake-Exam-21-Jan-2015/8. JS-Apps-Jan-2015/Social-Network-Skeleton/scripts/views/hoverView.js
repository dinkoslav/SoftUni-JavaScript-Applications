var app = app || {};

app.hoverView = (function() {
    function HoverView(selector, data, position) {
        $.get('templates/hover-box.html', function(template) {
            var output = Mustache.render(template, data);

            $(selector).append(output);
            $('.hover-box').css('position', 'absolute');
            $('.hover-box').css('left', position.x);
            $('.hover-box').css('top', position.y);
        })
    }

    return {
        load: function (selector, data, position) {
            new HoverView(selector, data, position);
        }
    }
}());



