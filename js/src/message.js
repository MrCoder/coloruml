function SyncMessage(from, to, text) {
    var subMessages = [];

    var accept = function(visitor){
        visitor.begin(this);
        for(var i = 0; i < this.subMessages.length; i++){
            this.subMessages[i].accept(visitor);
        }
        visitor.end(this);

    };

    return {
        'from': from,
        'to': to,
        'message': text,
        'subMessages': subMessages,
        'accept': accept
    }
}

function HeightCalculator(){
    this.height = 0;
    this.begin = function(){
        this.height += 15;
    };

    this.end = function(message){
        this.height += 20 * message.subMessages.length;
        this.height += 10;
    };

}