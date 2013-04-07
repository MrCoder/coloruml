describe('Entity Factory Test', function(){
    it('should collect all entities from single message', function(){
        var message = SyncMessage('CLIENT', 'A', 'MethodA()');
        var entityFactory = EntityFactory();
        message.accept(entityFactory);
        expect(entityFactory.entities['CLIENT']).toBe(0);
        expect(entityFactory.entities['A']).toBe(0);
    });

    it('should collect all entities from nested message', function(){
        var message = SyncMessage('CLIENT', 'A', 'MethodA()');
        var subMessage = SyncMessage('A', 'B', 'MethodB()');
        message.subMessages.push(subMessage);
        var entityFactory = EntityFactory();
        message.accept(entityFactory);
        expect(entityFactory.entities['CLIENT']).toBe(0);
        expect(entityFactory.entities['A']).toBe(0);
        expect(entityFactory.entities['B']).toBe(0);
    });
});