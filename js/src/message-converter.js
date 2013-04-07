function MessageConverter() {
    var entities = [];
    var top = 10;

    var begin = function(message){
        top += 20;
        var entityFrom = getOrCreateEntity(message.from);
        entityFrom.appendInvoke(message.to, message.message, top);
        var entityTo = getOrCreateEntity(message.to);
        entityTo.addMessageBox(top + 20);
    };

    var getOrCreateEntity = function (entityName) {
        for (var i = 0; i < entities.length; i++) {
            if (entities[i].name === entityName) {
                return entities[i];
            }
        }
        var entity = new Entity(entityName);
        entities.push(entity);
        return entity;
    };

    var end = function(message){
        var entityTo = getOrCreateEntity(message.to);

        var heightCalculator = new HeightCalculator();
        message.accept(heightCalculator);

        entityTo.closeMessageBox(heightCalculator.height);
        top += 20;
    };

    return {
        'begin': begin,
        'end': end,
        'entities': entities
    }

}
