function Entity(name) {
    this.name = name;
    this.messageBoxes = [];
    this.currentMessageBox = 0;
    // add message box for 'CLIENT', other message boxes will be created after invoke is added in message_converter
    if ('CLIENT' === name){
        var messageBox2 = new MessageBox();
        messageBox2.getTop = function(){return 10};
        this.messageBoxes.push(messageBox2);
    }

    this.appendInvoke = function (to, name) {
        var messageBox = this.messageBoxes[this.currentMessageBox];
        this.constructor.prototype.drawInvoke = function(top){
            messageBox.appendInvoke(to, name, top - messageBox.getTop());
        }
    };

    // add message box for 'to' Entity
    this.addMessageBox = function(top){
        var messageBox = new MessageBox();
        messageBox.getTop = function(){return top;};
        messageBox.style['margin-top'] = top + 'px';
        this.messageBoxes.push(messageBox);
        this.drawInvoke(top);
    };

    this.closeMessageBox = function(height){
        if (undefined === this.messageBoxes[this.currentMessageBox]){
            this.messageBoxes.push(new MessageBox());
        }
        var messageBox = this.messageBoxes[this.currentMessageBox];
        messageBox.style.height = height + 'px';
        this.currentMessageBox++;
    }
}

function MessageBox() {
    return {
        // default height is 90% for CLIENT only
        'style': {height:'90%', 'top': top + 'px'}

    }
}

function Invoke(to, name, top) {

    return {
        'to': to,
        'name': name,
        'style': {width: '0px', 'margin-top': top + 'px'}
    }
}