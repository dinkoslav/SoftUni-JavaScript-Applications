$(document).ready(function(){
    $("#content > div:gt(0)").hide();

    var myTimer = setInterval(function(){
        changeNext()
    },  5000);


    function changeNext(){
        $('#content > div:first')
            .fadeOut(1000)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('#content');
    }

    function changePrevious(){
        $('#content > div:visible')
            .fadeOut(1000);
        $('#content > div:first').parent()
            .find(':hidden:last')
            .fadeIn(1000)
            .prependTo('#content');
    }

    $('button').on('click', function(ev){
        if($(ev.target).text() === 'Previous'){
            changePrevious();
            clearInterval(myTimer);
            myTimer = setInterval(function(){
                changeNext()
            },  5000);
        }
        else{
            changeNext();
            clearInterval(myTimer);
            myTimer = setInterval(function(){
                changeNext()
            },  5000);
        }
    });
});
