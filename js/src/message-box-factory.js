function MessageBoxFactory() {
    var messageBoxes = [];
    var top = 60;

    return {
        'begin': function(message){
            top += 20;
            var messageBox = MessageBox();
            messageBox.entityName = message.to;
            messageBox.from = message.from;
            messageBox.name = message.message;
            messageBox.style['top'] = top + 'px';

            var heightCalculator = new HeightCalculator();
            message.accept(heightCalculator);

            messageBox.style['height'] = heightCalculator.height + 'px';
            messageBoxes.push(messageBox);
        },
        'end': function(message){
            top += 25;
        },
        'messageBoxes': messageBoxes
    }
}
