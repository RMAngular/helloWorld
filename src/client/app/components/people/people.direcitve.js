(function() {
    angular.module('app.components.people')
        .directive('people', peopleDirective);

    function peopleDirective () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/people/people.html',
            scope: {
                people: '='
            },
            controller: PeopleController,
            controllerAs: 'vm',
            bindToController: true
        }
    }

    PeopleController.$inject = [];

    function PeopleController() {
        var vm = this;

        vm.clickPerson = clickPerson;

        function clickPerson(person) {
            alert(JSON.stringify(person));
        }
    }
})();
