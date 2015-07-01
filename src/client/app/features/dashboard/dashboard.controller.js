(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['logger', 'messageCount', 'people', 'news']
    /* @ngInject */
    function DashboardController(logger, messageCount, people, news) {
        var vm = this;

        vm.messageCount = messageCount;
        vm.people = people;
        vm.news = news;

        function init() {
            logger.info('Activated Dashboard View');
        }

        vm.title = 'Dashboard';
    }
})();
