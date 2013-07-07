var seqApp = angular.module("sequence", ['ui']);


seqApp.service('entitiesService', function () {
    var entities = [];
    this.get = function () {
        return entities;
    };
    this.set = function(value) {
        entities = value;
    };

    function get(bindEntity) {
        return $.grep(entities,
            function (entity) {
                return entity.name == bindEntity;
            })[0];
    }

    this.getCenter = function (entityName) {
        var entity = get(entityName);
        if (entity === undefined) return 0;
        var element = entity.getElement();
        var left = $(element).offset().left;
        var width = $(element).width();
        return left + width / 2;
    };

    this.getDistance = function (from, to) {
        return this.getCenter(to) - this.getCenter(from);
    }
});

seqApp.service('messageBoxesService', function () {
    var messageBoxes = [];
    this.get = function () {
        return messageBoxes;
    };
    this.set = function(value) {
        messageBoxes = value;
    }
});
function SequenceController($scope, entitiesService, messageBoxesService) {
    console.log("initialize sequence controller");

    $scope.pseudoCode = "XiaoPeng=Employer.find('developer'){\n"+
        "  GitHub.page('mrcoder.github.com')\n"+
        "}\n"+
        "Employer.contact(XiaoPeng){\n"+
        "  // Preferred approach\n"+
        "  Telephone.call('0431580958')\n"+
        "  Email.send('eagle.xiao@gmail.com')\n" +
        "}\n"+
        "\n"+
        "Employer.interview(XiaoPeng){\n"+
        "  Telephone.call('eagle.xiao.cn'){\n"+
        "    XiaoPeng.queryDeliveryExperience(){\n"+
        "      queryJavaExperience()\n"+
        "      queryCSharpExperience()\n"+
        "      queryWebDevelopmentExperience()\n"+
        "    }\n"+
        "    XiaoPeng.queryAgileConsultancyExperience()\n"+
        "  }\n"+
        "}\n"+
        "\n"+
        "Employer.offer(XiaoPeng){\n"+
        "  Email.send(to:'eagle.xiao@gmail.com', with:OFFER)\n"+
        "}";
    $scope.getEntities = entitiesService.get;
    $scope.getMessageBoxes = messageBoxesService.get;

}


seqApp.directive('entity', function () {
    return function (scope, element) {
        // Bind div element to the entity model.
        scope.entity.getElement = function () {
            return element;
        };
    }
});

seqApp.directive('messageBox', function ($timeout, entitiesService) {
    return function (scope, element, attrs) {
        // when all process is finished, aka. dom rendered,
        // otherwise bind-entity attribute ({{messageBox.entityName}}) has not been evaluated.
        $timeout(function () {
            var from = attrs['fromEntity'];
            var to = attrs['toEntity'];
            if (from === to){
                scope.messageBox['isInternal'] = (from === to);
                // This line has no effect on the visible diagram, but if you want to highlight the message area, it helps
                $(element).width(40);
            } else {
                var distance = entitiesService.getDistance(from, to);
                scope.messageBox['left2right'] = (distance > 0);
                $(element).width(Math.abs(distance) + 12);
            }

            $(element).offset({
                'left':Math.min(entitiesService.getCenter(from), entitiesService.getCenter(to)) - 6
            });

        });
    }
});

seqApp.directive('messageBar', function ($timeout, entitiesService) {
    return function (scope, element, attrs) {
        $timeout(function () {
            var from = scope.messageBox.from;
            var to = scope.messageBox.entityName;
            var distance = entitiesService.getDistance(from, to);
            if (distance > 0) {
                $(element).css('float', 'right');
            } else {
                $(element).css('float', 'left');

            }
        });
    };
});

// Directive is just a function which executes when the compiler encounters it in the DOM.
// So this happens only once.
seqApp.directive('invoke', function ($timeout, entitiesService) {
    // This is the link function to be returned;
    // The link function is responsible for registering DOM listeners as well as updating the DOM.
    // It is executed after the template has been cloned.
    return function (scope, element, attrs) {
        // when all process is finished, aka. dom rendered.
        $timeout(function () {
            var from = attrs['fromEntity'];
            var to = attrs['toEntity'];

            var distance = entitiesService.getDistance(from, to);
            $(element).width(Math.abs(distance) - 10);
        });

    }
});

// We use this directive, instead of using ng-change for textarea, to invert the control
seqApp.directive('seqDiagram', function (entitiesService, messageBoxesService) {
    // The following link function executes only ONCE
    return function (scope) {
        scope.$watch('pseudoCode', function (newValue) {
            var messageParser = new MessageParser();
            var messages = messageParser.parse(newValue);

            var entityFactory = EntityFactory();
            var messageBoxFactory = MessageBoxFactory();
            for (var i = 0; i < messages.length; i++) {
                messages[i].accept(entityFactory);
                messages[i].accept(messageBoxFactory);
            }

            var tempEntities = [];
            for(var name in entityFactory.entities){
                if (entityFactory.entities.hasOwnProperty(name) && (typeof entityFactory.entities[name]) !== 'function')
                    tempEntities.push({'name':name, 'getCenter':function(){}});
            }
            entitiesService.set(
                tempEntities
            );

            messageBoxesService.set(
                messageBoxFactory.messageBoxes
            );
        });
    };

});

