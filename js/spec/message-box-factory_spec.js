describe("should generate message boxes from messages", function(){
    // No message box on Entity CLIENT
    it("should generate ONE message boxes from A.Method()", function(){
        var message = SyncMessage('CLIENT', 'A', 'MethodA()');
        var messageBoxFactory = MessageBoxFactory();
        message.accept(messageBoxFactory);
        var messageBoxes = messageBoxFactory.messageBoxes;
        expect(messageBoxes.length).toBe(1);
        expect(messageBoxes[0].style['top']).toBe('20px');
        expect(messageBoxes[0].style['height']).toBe('20px');
    });
});