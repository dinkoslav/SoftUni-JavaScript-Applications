(function (){
    var router = Sammy(function(){
        var selector = '#wrapper';
        var h2 = $('<h2>');
        this.get('#/', function() {
            $(selector).html();
        });
        this.get('#/Sam', function() {
            $(selector).html(h2.text('Hello, Sam'));
        });
        this.get('#/Pesho', function() {
            $(selector).html(h2.text('Hello, Pesho'));
        });
        this.get('#/Misho', function() {
            $(selector).html(h2.text('Hello, Misho'));
        })
        ;this.get('#/Minka', function() {
            $(selector).html(h2.text('Hello, Minka'));
        });

    })

    router.run('#/');
})();
