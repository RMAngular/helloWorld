(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/',
                    templateUrl: 'app/features/dashboard/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    },
                    resolve: {
                        messageCount: messageCount,
                        people: people,
                        news: news
                    }
                }
            }
        ];

        messageCount.$inject = ['dataservice'];
        function messageCount(dataservice) {
            return dataservice.getMessageCount();
        }

        people.$inject = ['dataservice'];
        function people(dataservice) {
            return dataservice.getPeople();
        }

        news.$inject = ['dataservice'];
        function news() {
            return {
                title: 'helloWorld',
                description: 'Hot Towel Angular is a SPA template ' +
                'for Angular developers.'
            };
        }
    }
})();
