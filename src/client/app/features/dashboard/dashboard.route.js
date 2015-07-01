(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    appRun.$inject = ['routerHelper', 'dataservice'];
    /* @ngInject */
    function appRun(routerHelper, dataservice) {
        routerHelper.configureStates(getStates(dataservice));
    }

    function getStates(dataservice) {
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
                        messageCount: function() {
                            return dataservice.getMessageCount();
                        },
                        people: function() {
                            return dataservice.getPeople();
                        },
                        news: function() {
                            return {
                                title: 'helloWorld',
                                description: 'Hot Towel Angular is a SPA template ' +
                                'for Angular developers.'
                            };
                        }
                    }
                }
            }
        ];
    }
})();
