var app = app || {};

app.ajaxRequester = (function (){
    function AjaxRequester(){
    }

    AjaxRequester.prototype.makeRequest = function(method, headers, url, data, success, error){
        $.ajax({
            method: method,
            headers: headers,
            url: url,
            data: JSON.stringify(data),
            contentType: 'json/application',
            success: success,
            error: error
        })
    }

    AjaxRequester.prototype.getRequest = function(headers, url, success, error){
        this.makeRequest('GET', headers, url, null, success, error);
    }

    AjaxRequester.prototype.postRequest = function(headers, url, data, success, error){
        this.makeRequest('POST', headers, url, data, success, error);
    }

    AjaxRequester.prototype.putRequest = function(headers, url, data, success, error){
        this.makeRequest('PUT', headers, url, data, success, error);
    }

    AjaxRequester.prototype.deleteRequest = function(headers, url, success, error){
        this.makeRequest('DELETE', headers, url, null, success, error);
    }

    return {
        get: function(){
            return new AjaxRequester();
        }
    }
})();

