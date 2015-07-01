(function() {
    angular.module('app.components.people')
        .directive('people', peopleDirective);

    function peopleDirective () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/people/people.html',
            scope: {},
            controller: PeopleController,
            controllerAs: 'vm',
            bindToController: true
        }
    }

    PeopleController.$inject = ['$q', 'dataservice', 'logger'];

    function PeopleController($q, dataservice, logger) {
        var vm = this;

        vm.init = init;

        function init() {
            var promises = [getMessageCount(), getPeople()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        function getMessageCount() {
            return dataservice.getMessageCount().then(function (data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }

        function getPeople() {
            return dataservice.getPeople().then(function (data) {
                vm.people = data;
                return vm.people;
            });
        }
    }
})();
