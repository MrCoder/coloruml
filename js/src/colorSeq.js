var seqApp = angular.module("sequence", ['ui']);

function SequenceController($scope) {
    console.log("initialize sequence controller");

//    $scope.invokeLineClass="invoke-line-internal";
    $scope.getEntities = function (value) {
        var messageParser = new MessageParser();
        var messages = messageParser.parse(value);
        var messageConverter = new MessageConverter();

        for (var i = 0; i < messages.length; i++) {
            messages[i].accept(messageConverter);
        }

        return messageConverter.entities;
    };
    // Provide initial pseudo code, as guide
    $scope.pseudoCode = "A.methodA(){\n  B.methodB()\n}";
    $scope.entities = $scope.getEntities($scope.pseudoCode);
}

// We use this directive, instead of using ng-change for textarea, to invert the control
seqApp.directive('seqDiagram', function () {
    // The following link function executes only ONCE
    return function (scope) {
        scope.$watch('pseudoCode', function (newValue) {
            scope.entities = scope.getEntities(newValue);
        });
    };

});

// Directive is just a function which executes when the compiler encounters it in the DOM.
// So this happens only once.
seqApp.directive('forInvoke', function () {
    // This is the link function to be returned;
    // The link function is responsible for registering DOM listeners as well as updating the DOM.
    // It is executed after the template has been cloned.
    return function (scope, element) {
        var invoke = scope.invoke;
        var to = invoke.to;
        var invokeTail = $(element).offset().left;

        function distanceToTarget(to) {
            // check target is ready
            var elementTo = $('#' + to);
            if (elementTo.length > 0)
            {
                return (elementTo.offset().left - invokeTail) + (elementTo.width()) / 2 - 6;
            }
            return 0;
        }

        scope.$watch(function () {
                return distanceToTarget(to);
            },
            function () {
                var distance = distanceToTarget(to);
                if (distance > 0){
                    var width = distance + 'px';
                    console.log('update invoke width:' + width);
                    invoke.style.width = width;
                } else {
                    var marginLeft = distance + 'px';
                    console.log('update invoke margin left:' + marginLeft);
                    invoke.style['margin-left'] = marginLeft;
                    invoke.style['width'] = distance * -1 + 'px';
                }
            }
        );
    }
});

