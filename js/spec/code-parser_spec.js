describe("MessageParserTest", function() {
    /**
     *MethodA()
     */
    it("Should parse a simple method of CLIENT", function() {
        var messageParser = MessageParser();
        var messages = messageParser.parse("Method()");

        expect(messages.length).toBe(1);
        expect(messages[0].from).toBe("CLIENT");
        expect(messages[0].to).toBe("CLIENT");
        expect(messages[0].message).toBe("Method()");
    });
    /**
     * A.MethodA()
     */
    it("Should parse a simple method of A", function() {
        var messageParser = MessageParser();
        var messages = messageParser.parse("A.Method()");

        expect(messages.length).toBe(1);
        expect(messages[0].from).toBe("CLIENT");
        expect(messages[0].to).toBe("A");
        expect(messages[0].message).toBe("Method()");
    });
    /**
     * A.MethodA(){MethodA1()}
     */
    it("Should parse nested method", function() {
        var messageParser = MessageParser();
        var messages = messageParser.parse("A.MethodA(){MethodA1()}");

        expect(messages.length).toBe(1);
        var methodA = messages[0];
        expect(methodA.from).toBe("CLIENT");
        expect(methodA.to).toBe("A");
        expect(methodA.message).toBe("MethodA()");
        expect(methodA.subMessages.length).toBe(1);

        var methodA1 = messages[0].subMessages[0];
        expect(methodA1.from).toBe("A");
        expect(methodA1.to).toBe("A");
    });

    /**
     * A.MethodA(){
     *     B.MethodB();
     * }
     */
    it("Parse a method with a nested method", function() {
        var messageParser = MessageParser();
        var messages = messageParser.parse("A.MethodA()\n{\nB.MethodB()\n}");

        expect(messages.length).toBe(1);
        expect(messages[0].from).toBe("CLIENT");
        expect(messages[0].to).toBe("A");
        expect(messages[0].message).toBe("MethodA()");
        expect(messages[0].subMessages.length).toBe(1);
        expect(messages[0].subMessages[0].from).toBe('A');
        expect(messages[0].subMessages[0].to).toBe('B');
        expect(messages[0].subMessages[0].message).toBe('MethodB()');
    });

    /**
     * A.MethodA(){
     *     B.MethodB(){
     *         A.MethodA1();
     *     }
     * }
     */
    it("Parse a method with bidirectional nest", function() {
        var messageParser = MessageParser();
        var messages = messageParser.parse("A.MethodA()\n{\nB.MethodB(){A.MethodA1()}}");

        expect(messages.length).toBe(1);
        var methodA = messages[0];
        expect(methodA.from).toBe("CLIENT");
        expect(methodA.to).toBe("A");
        expect(methodA.message).toBe("MethodA()");
        expect(methodA.subMessages.length).toBe(1);
        var methodB = methodA.subMessages[0];
        expect(methodB.from).toBe('A');
        expect(methodB.to).toBe('B');
        expect(methodB.message).toBe('MethodB()');
        expect(methodB.subMessages.length).toBe(1);
        var methodA1 = methodB.subMessages[0];
        expect(methodA1.from).toBe("B");
        expect(methodA1.to).toBe("A");
        expect(methodA1.message).toBe("MethodA1()");

    });

    /**
     * A.MethodA()
     * B.MethodB()
     */
    it("Parse two methods", function() {
        var messageParser = MessageParser();
        var messages = messageParser.parse("A.MethodA()\nB.MethodB()\n");

        expect(messages.length).toBe(2);
        expect(messages[0].from).toBe("CLIENT");
        expect(messages[0].to).toBe("A");
        expect(messages[0].message).toBe("MethodA()");
        expect(messages[0].subMessages.length).toBe(0);
        expect(messages[1].from).toBe("CLIENT");
        expect(messages[1].to).toBe("B");
        expect(messages[1].message).toBe("MethodB()");
        expect(messages[1].subMessages.length).toBe(0);
    });
});