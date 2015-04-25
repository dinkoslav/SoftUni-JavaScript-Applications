(function (){
    var students = [{"gender":"Male","firstName":"Joe","lastName":"Riley","age":22,"country":"Russia"},
        {"gender":"Female","firstName":"Lois","lastName":"Morgan","age":41,"country":"Bulgaria"},
        {"gender":"Male","firstName":"Roy","lastName":"Wood","age":33,"country":"Russia"},
        {"gender":"Female","firstName":"Diana","lastName":"Freeman","age":40,"country":"Argentina"},
        {"gender":"Female","firstName":"Bonnie","lastName":"Hunter","age":23,"country":"Bulgaria"},
        {"gender":"Male","firstName":"Joe","lastName":"Young","age":16,"country":"Bulgaria"},
        {"gender":"Female","firstName":"Kathryn","lastName":"Murray","age":22,"country":"Indonesia"},
        {"gender":"Male","firstName":"Dennis","lastName":"Woods","age":37,"country":"Bulgaria"},
        {"gender":"Male","firstName":"Billy","lastName":"Patterson","age":24,"country":"Bulgaria"},
        {"gender":"Male","firstName":"Willie","lastName":"Gray","age":42,"country":"China"},
        {"gender":"Male","firstName":"Justin","lastName":"Lawson","age":38,"country":"Bulgaria"},
        {"gender":"Male","firstName":"Ryan","lastName":"Foster","age":24,"country":"Indonesia"},
        {"gender":"Male","firstName":"Eugene","lastName":"Morris","age":37,"country":"Bulgaria"},
        {"gender":"Male","firstName":"Eugene","lastName":"Rivera","age":45,"country":"Philippines"},
        {"gender":"Female","firstName":"Kathleen","lastName":"Hunter","age":28,"country":"Bulgaria"}];

    var filterByAge = _.select(students, function(s){
        return s.age >= 18 && s.age <= 24;
    })

    var filterByName = _.select(students, function(s){
        return s.firstName < s.lastName;
    })

    var filterByCountry = _.select(students, function(s){
        return s.country == "Bulgaria";
    })

    var lastFive = _.slice(students, [start=students.length-5], [end=students.length]);

    var filterNonBg = _.select(students, function(s){
        return s.country != "Bulgaria";
    })
    var firstThreeNonBg = _.slice(filterNonBg, [start=0], [end=3]);

    //console.log(filterByAge);
    //console.log(filterByName);
    //console.log(filterByCountry);
    //console.log(lastFive);
    console.log(firstThreeNonBg);
})();
