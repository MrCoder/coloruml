describe("MessageConverterTest", function() {
    /**
     * A.MethodA()
     */
    it("Should convert a simple method", function() {
        var messages = [SyncMessage('CLIENT', 'A', "MethodA()")];

        expect(messages.length).toBe(1);
        expect(messages[0].from).toBe("CLIENT");
        expect(messages[0].to).toBe("A");
        expect(messages[0].message).toBe("MethodA()");

        var heightCalculator = new HeightCalculator();
        messages[0].accept(heightCalculator);
        expect(heightCalculator.height).toBe(20);

        var messageConverter = new MessageConverter();
        messages[0].accept(messageConverter);

        var entities = messageConverter.entities;

        expect(entities.length).toBe(2);
        expect(entities[0].name).toBe("CLIENT");
        expect(entities[0].messageBoxes.length).toBe(1);
        expect(entities[0].messageBoxes[0].style.height).toBe("90%");
        expect(entities[0].messageBoxes[0].invokes.length).toBe(1);
        expect(entities[0].messageBoxes[0].invokes[0].name).toBe("MethodA()");
        expect(entities[0].messageBoxes[0].invokes[0].to).toBe("A");
        expect(entities[1].name).toBe("A");
        expect(entities[1].messageBoxes.length).toBe(1);
        expect(entities[1].messageBoxes[0].style.height).toBe("20px");
        expect(entities[1].messageBoxes[0].style['margin-top']).toBe("50px");
    });

});