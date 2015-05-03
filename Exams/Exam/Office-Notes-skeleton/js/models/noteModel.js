var app = app || {};

app.note = (function (){
    var Note = function(baseUrl, requester){
        this._baseUrl = baseUrl;
        this._requester = requester;
    };

    Note.prototype.getAllNotes = function(date){
        return this._requester.get('classes/Notes?where={"deadline":"' + date + '"}');
    };

    Note.prototype.getAllMyNotes = function(author){
        return this._requester.get('classes/Notes?where={"author":"' + author + '"}');
    };

    Note.prototype.editNote = function(id, data){
        return this._requester.put('classes/Notes/' + id, data);
    };

    Note.prototype.deleteNote = function(id, data){
        return this._requester.delete('classes/Notes/' + id);
    };

    Note.prototype.addNote = function(data){
        data.ACL['*'] = {"read": true};
        return this._requester.post('classes/Notes', data);
    };

    Note.prototype.getNoteById = function(id){
        return this._requester.get('classes/Notes/' + id);
    };

    return {
        load: function(baseUrl, requester){
            return new Note(baseUrl, requester);
        }
    }
})();


