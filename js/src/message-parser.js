function MessageParser() {

    var expressions = null;

    var parse = function (scriptContent) {
        scriptContent = scriptContent.split(";").join(";\n");
        scriptContent = scriptContent.split("{").join("\n{\n");

        scriptContent = scriptContent.split("}").join("\n}\n");
        expressions = scriptContent.split("\n");
        // TODO: 1. check if lookahead/lookbehind is possible;
        // TODO: 2. replace it with the 'Java version'
//        expressions = scriptContent.split(/(?<=[{}])|(?=[{}])|(\n)/g);

        var expressionParser = ExpressionParser();
        for (var i in expressions) {

            var expression = expressions[i].trim();
            if (expression === "") {
                expressionParser.parseUnknown();
            } else if (expression === "{") {
                expressionParser.enter();
            } else if (expression === "}") {
                expressionParser.exit();
            } else if (expression.startsWith("//")) {
                expressionParser.parseUnknown();
            } else if (expression.startsWith(":")) {
                expressionParser.parseUnknown();
            } else {
                expressionParser.parseInvoke(expression);
            }
        }
        return expressionParser.getResult();
    };

    return {
        'parse': parse
    }

}

