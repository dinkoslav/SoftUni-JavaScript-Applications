Storage.prototype.setObject = function setObject(key, obj) {
    this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObject = function getObject(key) {
    return JSON.parse(this.getItem(key));
};

$(document).ready(function(){

    'use strict';

    var questions = [
        {
            question: 'Where is SoftUni located?',
            answers: [
                'Pleven',
                'Sofia',
                'Kurtovo Koinare',
                'Bacova Mahala'
            ],
            rightAnswer: 1
        },
        {
            question: 'How much is 1 + 1?',
            answers: [
                '11',
                '0',
                '2',
                'all above'
            ],
            rightAnswer: 2
        },
        {
            question: 'What is WWW?',
            answers: [
                'World Wide Web',
                'Internet',
                'World Worst Wife',
                'What We Want'
            ],
            rightAnswer: 0
        }
    ];
    var countdown = 300;
    var min = 5;
    var sec = 0;
    $('#wrapper').append('<p>');


    var clock = setInterval(function(){
        $('p').text('Time left: ' + min + ':' + (sec < 10 ? '0' + sec : sec));
        if(countdown == 0){
            checkAnswers();
        }

        countdown--;
        min = sec == 0 ? min - 1 : min;
        sec = sec == 0 ? 59 : sec - 1;
    }, 1000)

    var orderedList = $('<ol>');
    orderedList.append($('<h1>').text('Questions:'));
    orderedList.on('click', function(ev){
        var question = $(ev.target).attr('name'),
            answer = $(ev.target).attr('value');
        saveUserAnswers(question, answer);
    });


    for (var i = 0; i < questions.length; i++) {
        var list = $('<li>');
        list.append($('<h2>').text(questions[i].question));
        for (var answer in questions[i].answers)
        {
            var input = $('<input>');
            input.attr('type', 'radio')
                .attr('name', i)
                .attr('value', answer);
            list.append(input);
            list.append($('<span>').text(questions[i].answers[answer]));
            list.append('<br />');
        }

        orderedList.append(list);
    }

    var btn = $('<button>');
    btn.text('Submit');
    btn.on('click', function(){
        $('span').css('background', 'white');
        checkAnswers();
    });

    $('#wrapper').append(orderedList);
    $('#wrapper').append(btn);

    if(!localStorage.poll){
        var poll = {};
        for (var i = 0; i < questions.length; i++) {
            poll[i] = ' ';
        }

        localStorage.setObject('poll', poll);
    }
    else{
        loadUserAnswers();
    }


    function saveUserAnswers(question, answer){
        var answers = localStorage.getObject('poll');
        answers[question] = answer;
        localStorage.setObject('poll', answers);
    }

    function loadUserAnswers(){
        var answers = localStorage.getObject('poll');
        for (var q in answers) {
            var name = q;
            var value = answers[q];
            if(parseInt(value) || parseInt(value) == 0){
                $("[name='" + name + "'][value='" + value + "']").attr('checked', 'checked');
            }
        }
    }

    function checkAnswers(){
        clearInterval(clock);
        var answers = localStorage.getObject('poll');
        for (var q in answers) {
            var name = q;
            var value = answers[q];
            if(parseInt(value) || parseInt(value) == 0){
                if(value == questions[q]['rightAnswer']){
                    $("[name='" + name + "'][value='" + value + "']").next().css('background', 'green');
                }
                else{
                    $("[name='" + name + "'][value='" + value + "']").next().css('background', 'red');
                    $("[name='" + name + "'][value='" + questions[q]['rightAnswer'] + "']").next().css('background', 'green');
                }

            }
        }
    }
});
