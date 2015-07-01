(function() {
    angular.module('app.components.container')
        .directive('container', containerDirective);

    function containerDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/container/container.html',
            scope: {
                title: '@',
                color: '@'
            },
            controller: ContainerController,
            controllerAs: 'vm',
            bindToController: true
        }
    }

    function ContainerController() {
        var vm = this;

        vm.wColor = 'w' + vm.color;
        vm.showContent = true;
    }
})();
