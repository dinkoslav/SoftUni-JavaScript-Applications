var app = app || {};

app.post = (function() {
    function Post (baseUrl, requester) {
        this._baseUrl = baseUrl;
        this._requester = requester;
    }

    Post.prototype.getAllPosts = function getAllPosts(){
        return this._requester.get('classes/Post?include=createdBy');
    };

    Post.prototype.addPost = function addPost(data){
        return this._requester.post('classes/Post', data);
    }

    return {
        load: function(baseUrl, requester){
            return new Post(baseUrl, requester);
        }
    }
}());

