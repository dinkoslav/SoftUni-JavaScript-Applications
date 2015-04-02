$(document).ready(function(){
    $('button').on('click', function(ev){
        var json = JSON.parse($('#json').val());

        json.forEach(function(d){
            var tr = $('<tr>');
            $('<td>').text(d.manufacturer).appendTo(tr);
            $('<td>').text(d.model).appendTo(tr);
            $('<td>').text(d.year).appendTo(tr);
            $('<td>').text(d.price).appendTo(tr);
            $('<td>').text(d.class).appendTo(tr);
            $('#table').append(tr);
        })
    });
});
