EntityFactory = function () {
    var entities = {};
    return {
        'begin': function(message){
            entities[message.from]=0;
            entities[message.to]=0;
        },
        'end': function(message){},
        'entities': entities
    }
};
