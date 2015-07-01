(function() {
    app.module('app.components.news')
        .directive('news', newsDirective);

    function newsDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/people/people.html',
            scope: {},
            controller: PeopleController,
            controllerAs: 'vm',
            bindToController: true
        }
    }

    function NewsController() {

    }
})();
