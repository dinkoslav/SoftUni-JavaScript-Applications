var app = app || {};

app.listAllMyNotesView = (function() {
    function ListAllMyNotesView(selector, data, page) {
        $.get('templates/myNoteTemplate.html', function(template) {
            var start = (page - 1) * 10;
            var end = (page * 10);
            var slicedData = $(data.results).slice(start, end);
            var newData = { "results": []};
            slicedData.each(function(note){
                newData.results.push({
                    objectId: slicedData[note].objectId,
                    author: slicedData[note].author,
                    title: slicedData[note].title,
                    text: slicedData[note].text,
                    deadline: slicedData[note].deadline

                });
            });
            var output = Mustache.render(template, newData);
            $(selector).html(output);
            $('#pagination').pagination({
                items: data.results.length,
                itemsOnPage: 10,
                cssStyle: 'light-theme',
                hrefTextPrefix: '#/myNotes/'
            }).pagination('selectPage', page);
        })
    }

    return {
        load: function (selector, data, page) {
            new ListAllMyNotesView(selector, data, page);
        }
    }
}());
