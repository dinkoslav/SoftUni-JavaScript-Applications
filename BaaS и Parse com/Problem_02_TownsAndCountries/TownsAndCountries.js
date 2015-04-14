$(document).ready(function() {
    var PARSE_APP_ID = "eAHbzyP9RjvrA4MXmq9kVCyAKKS3rvWEBvvykDyy";
    var PARSE_REST_API_KEY = "FMNyI9M4wZyQwbZj9V9JJo9i3Y76Ilda9nXExREG";

    loadCountries();

    function loadCountries(){
        jQuery.ajax({
            method: "GET",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: "https://api.parse.com/1/classes/Country",
            success: countriesLoaded,
            error: ajaxError
        });
    };

    function countriesLoaded(data) {
        $('li').remove();
        $('#countryAddDiv').remove();
        for (var c in data.results) {
            var country = data.results[c];
            var countryItem = $('<li>');
            var countryLink = $("<a href='#'>").text(country.name);
            $(countryLink).data('country', country);
            var countryEdit = $('<button>').text('Edit');
            $(countryEdit).data('country', country);
            var countryRemove = $('<button>').text('Remove');
            $(countryRemove).data('country', country);

            countryItem.append(countryLink);
            countryItem.append(countryEdit);
            countryItem.append(countryRemove);

            countryLink.click(loadTowns);
            countryEdit.click(editCountry);
            countryRemove.click(removeCountry);

            countryItem.appendTo($("#countries"));
        }

        var countryAddDiv = $('<div>');
        countryAddDiv.attr('id', 'countryAddDiv');
        var countryAddText = $('<input>');
        countryAddText.attr('id', 'countryAddText');
        var countryAddBtn = $('<button>').text('AddCountry');
        $(countryAddBtn).data('country', country);
        countryAddBtn.click(addCountry);
        countryAddDiv.append(countryAddText);
        countryAddDiv.append(countryAddBtn);
        countryAddDiv.appendTo($("#countries"));
    }

    function editCountry() {
        var country = $(this).data('country');
        var textEdit = $('<input>');
        var submit = $('<button>').text('Submit');
        $(submit).data('country', country);
        submit.click(changeCountry);

        textEdit.attr('type', 'text');
        textEdit.attr('id', 'newCountryName');
        textEdit.attr('placeholder', country.name);

        $(this).parent().append(textEdit);
        $(this).parent().append(submit);
    }

    function removeCountry(){
        var country = $(this).data('country');

        $.ajax({
            method: "DELETE",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Country/' +
            country.objectId,
            contentType: "application/json",
            success: loadCountries,
            error: ajaxError
        });
    }

    function changeCountry() {
        var country = $(this).data('country');
        var newCountryName = $('#newCountryName').val();

        $.ajax({
            method: "PUT",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Country/' +
            country.objectId,
            data: JSON.stringify(
                {"name": newCountryName}
            ),
            contentType: "application/json",
            success: loadCountries,
            error: ajaxError
        });
    }

    function addCountry(){
        var newCountry = $('#countryAddText').val();

        $.ajax({
            method: "POST",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Country',
            data: JSON.stringify(
                {"name": newCountry}
            ),
            contentType: "application/json",
            success: loadCountries,
            error: ajaxError
        });
    }

    function loadTowns(){
        var country = $(this).data('country');
        var countryId = country.objectId;
        $("#towns").remove();
        $("#townAddDiv").remove();
        $(this).parent().append($('<ul id="towns">'));
        $.ajax({
            method: "GET",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Town?where={"country":{"__type":"Pointer","className":"Country","objectId":"' + countryId + '"}}',
            success: townsLoaded,
            error: ajaxError
        });
    }

    function townsLoaded(data){
        for (var t in data.results) {
            var town = data.results[t];
            var townItem = $('<li>');
            townItem.text(town.name);

            var townEdit = $('<button>').text('Edit');
            $(townEdit).data('town', data.results[t]);
            townEdit.click(editTown);
            townItem.append(townEdit);

            var townRemove = $('<button>').text('Remove');
            $(townRemove).data('town', data.results[t]);
            townRemove.click(removeTown);
            townItem.append(townRemove);

            townItem.appendTo('#towns');
        }

        var townAddDiv = $('<div>');
        townAddDiv.attr('id', 'townAddDiv');
        var townAddText = $('<input>');
        townAddText.attr('id', 'townAddText');
        var townAddBtn = $('<button>').text('AddTown');
        $(townAddBtn).data('towns', data);
        townAddBtn.click(addTown);
        townAddDiv.append(townAddText);
        townAddDiv.append(townAddBtn);
        townAddDiv.appendTo($("#towns"));
    }

    function editTown(){
        var town = $(this).data('town');
        var textEdit = $('<input>');
        var submit = $('<button>').text('Submit');
        $(submit).data('town', town);
        submit.click(changeTown);

        textEdit.attr('type', 'text');
        textEdit.attr('id', 'newTownName');
        textEdit.attr('placeholder', town.name);

        $(this).parent().append(textEdit);
        $(this).parent().append(submit);
    }

    function changeTown(){
        var town = $(this).data('town');
        var newTownName = $('#newTownName').val();

        $.ajax({
            method: "PUT",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Town/' +
            town.objectId,
            data: JSON.stringify(
                {"name": newTownName}
            ),
            contentType: "application/json",
            success: loadCountries,
            error: ajaxError
        });
    }

    function removeTown(){
        var town = $(this).data('town');

        $.ajax({
            method: "DELETE",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Town/' +
            town.objectId,
            contentType: "application/json",
            success: loadCountries,
            error: ajaxError
        });
    }

    function addTown(){
        var newTown = $('#townAddText').val();
        var country = $(this).data('towns');
        var countryId = country.results[0].country.objectId;

        $.ajax({
            method: "POST",
            headers: {
                "X-Parse-Application-Id": PARSE_APP_ID,
                "X-Parse-REST-API-Key": PARSE_REST_API_KEY
            },
            url: 'https://api.parse.com/1/classes/Town',
            data: JSON.stringify(
                {
                    "name": newTown,
                    "country": {"__type": "Pointer", "className": "Country", "objectId": countryId }
                }
            ),
            contentType: "application/json",
            success: loadCountries,
            error: ajaxError
        });
    }

    function ajaxError() {
        noty({
                text: 'Cannot load AJAX data.',
                type: 'error',
                layout: 'topCenter',
                timeout: 5000
            }
        );
    }
})