(function (){
    var data = {
        "persons": [
        {
            "name": 'Garry Finch',
            "jobTitle": 'Front End',
            "website": 'http://website.com'
        },
        {
            "name": 'Misho Shamara',
            "jobTitle": 'Start End',
            "website": 'http://BigSha.com'
        },
        {
            "name": 'Karl May',
            "jobTitle": 'Vinetu',
            "website": 'dont have one'
        }
    ]};

    $.get('rows.html', function(template) {
        var output = Mustache.render(template, data);
        $('table').append(output);
    })
})();
