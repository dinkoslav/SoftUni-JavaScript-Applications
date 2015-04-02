$(document).ready(function(){
    $('button').on('click', function(ev){
        var tag = $('#new-tag').val();
        var content = $('#content').val();
        var newElement = $("<" + tag + ">").text(content);

        if($(ev.target).text() === 'Add before'){
            $(ev.target).parent().find('p:first').before(newElement);
        }
        else{
            $(ev.target).parent().find('p:first').after(newElement);
        }
    });
});
