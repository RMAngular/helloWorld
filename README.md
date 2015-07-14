This demo takes the AngularJS Hot Towel project written by John Papa and refactors it into reusable components while following best practices (https://github.com/johnpapa/angular-styleguide).  At the end of this demo you will have and good understanding of how to take a view/controller based application and refactor it into reusable web components.  You will understand best practices as recommended by the Google AngularJS team and you will have a working example to refer back to.

##Master (step 1) 
Create baseline using hot towel angular generator project: https://github.com/johnpapa/generator-hottowel

Follow the Prerequisite and Quick Start instructions to get the hot towel project up and running.  Once the project has been created, run the project with gulp serve-dev

### What’s great about this project
- Great gulp file for serving and building the project
- nodemon picks up file changes and immediately refreshes
- modularized file structure where folder contains all necessary code
- Browser Sync
- Bower and app files are auto added to index.html
- Build process makes releasing code simple

###What’s not so great
- Views/Controllers architecture
- No reusable components
- No tests
- Need more folder structure to organize code
- Doesn’t use router resolve to get data

## Step 2 - Create our first directive
Create new folders to organize code into:

- src/client/app/components
- src/client/app/components/people
- src/client/app/features

###Refactor People grid into directive component
- IIFE
- Isolated scope
- Components vs Directives
- controllerAs and bindToController syntax
- $inject
- named functions and public vs private functions

#### Files to create

src/client/app/components
- components.module.js

- src/client/app/components/people
people.directive.js
people.directive.spec.js
people.html
people.module.js

#### components.module.js
Defines the components module and allows us to enable and disable components as desired
```
(function() {
    'use strict';

    angular.module('app.components.people', []);
})();
```

#### people.directive.js
Defines the element base directive for the people grid
```
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
```

#### people.html
HTML removed from `dashboard.html` and placed into this file
```
<div class="widget wviolet" ng-init="vm.init()">
    <div ht-widget-header title="People"
         allow-collapse="true"></div>
    <div class="widget-content text-center text-info">
        <table class="table table-condensed table-striped">
            <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Location</th>
            </tr>
            </thead>
            <tbody>
            <tr ng-repeat="p in vm.people">
                <td>{{p.firstName}}</td>
                <td>{{p.lastName}}</td>
                <td>{{p.age}}</td>
                <td>{{p.location}}</td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="widget-foot">
        <div class="clearfix"></div>
    </div>
</div>
```

##### Minor changes
- modified gulp to not track WebStorm specific files
- add app.components.people module as a dependency to app.components
- replaced person HTML with `<person></person>` directive tag
- removed people data code from dashboard.controller.js

##Step 3 - Create News Directive

### Create new folder and file to organize code into:

- src/client/app/components/news

news.directive.js
news.directive.spec.js
news.html
news.module.js


#### news.directive.js
```
(function() {
    angular.module('app.components.news')
        .directive('news', newsDirective);

    function newsDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/news/news.html',
            scope: {},
            controller: NewsController,
            controllerAs: 'vm',
            bindToController: true
        }
    }

    function NewsController() {
        var vm = this;

        vm.news = {
            title: 'helloWorld',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
    }
})();
```

#### news.html
```
<div class="widget wgreen">
    <div ht-widget-header title="{{vm.news.title}}"
         allow-collapse="true"></div>
    <div class="widget-content text-center text-info">
        <small>{{vm.news.description}}</small>
    </div>
    <div class="widget-foot">
        <div class="clearfix"></div>
    </div>
</div>
```

#### news.module.js
```
(function() {
    'use strict';

    angular.module('app.components.news', []);
})();
```

##### minor changes
- add app.components.news module as a dependency to app.components
- replaced news HTML with `<news></news>` directive tag
- removed news data code from dashboard.controller.js

## Step 4 - Handle a Click Event to Show/Hide Data

Our directives display data.  Let’s add a click event to show and hide the data.

### Add view model showPeople variable to people directive

`vm.showPeople = true;`

### Modify html to show/hide people grid
```
<div class="widget wviolet" ng-init="vm.init()">
    <div ht-widget-header title="People"
         allow-collapse="true" ng-click="vm.showPeople = !vm.showPeople"></div>
    <div class="widget-content text-center text-info" ng-show="vm.showPeople">
        <table class="table table-condensed table-striped">
...
```

##Step 5 - Decompose Directives into Smaller Components

### Create new folder and file to organize code into:

- src/client/app/components/container

container.directive.js
container.directive.spec.js
container.html
container.module.js


#### container.directive.js
```
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
```

#### container.html
```
<div class="widget" ng-class="vm.wColor">
    <div ht-widget-header title="{{vm.title}}"
         allow-collapse="true" ng-click="vm.showContent = !vm.showContent"></div>
    <div class="widget-content text-center text-info" ng-show="vm.showContent">
        <people></people>
    </div>
    <div class="widget-foot">
        <div class="clearfix"></div>
    </div>
</div>
```

#### container.module.js
```
(function() {
    'use strict';

    angular.module('app.components.container', []);
})();
```

##### minor changes
- add app.components.container module as a dependency to app.components
- replaced news HTML with `<container></container>` directive tag
- removed container HTML from people.html

#### Bad Point
This directive only works the people directive.  The news directive needs the same exact container directive.

## Step 6 - Decomposition Done Right - Transclusion

Our container directive should work with any directive and shouldn’t be limited to just working with the people directive.  

#### - Add Transclude property to the container directive
```
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
        bindToController: true,
        transclude: true
    }
}
```

#### Replace people directive with ng-transclude directive in our HTML
```
<div class="widget" ng-class="vm.wColor">
    <div ht-widget-header title="{{vm.title}}"
         allow-collapse="true" ng-click="vm.showContent = !vm.showContent"></div>
    <div class="widget-content text-center text-info" ng-show="vm.showContent">
        <ng-transclude></ng-transclude>
    </div>
    <div class="widget-foot">
        <div class="clearfix"></div>
    </div>
</div>
```

#### Remove container HTML from news.html
```
<small>{{vm.news.description}}</small>
```

#### Modify dashboard.html to use container directive with transcluded people and news directives.
```
<section id="dashboard-view" class="mainbar">
    <section class="matter">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <ul class="today-datas">
                        <li class="blightblue">
                            <div class="pull-left"><i class="fa fa-plane"></i></div>
                            <div class="datas-text pull-right">
                                <span class="bold">May 18 - 19, 2015</span> Castle Resort, Neverland
                            </div>
                            <div class="clearfix"></div>
                        </li>

                        <li class="borange">
                            <div class="pull-left"><i class="fa fa-envelope"></i></div>
                            <div class="datas-text pull-right">
                                <span class="bold">{{vm.messageCount}}</span> Messages
                            </div>
                            <div class="clearfix"></div>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <container title="People" color="violet">
                        <people></people>
                    </container>
                </div>
                <div class="col-md-6">
                    <container title="News" color="red">
                        <news></news>
                    </container>
                </div>
            </div>
        </div>
    </section>
</section>
```

## Step 7 - Resolve our data

Let the route load the data and decorate the directive with the data

#### dashboard.route.js
```
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
                                description: 'Hot Towel Angular is a SPA template for Angular developers.'
                            };
                        }
                    }
                }
            }
        ];
    }
})();
```

#### Inject the resolved data into dashboard.controller.js
```
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
```

#### Decorate the directives with the controllers view model data in dashboard.html
```
<div class="row">
    <div class="col-md-6">
        <container title="People" color="violet">
            <people people="vm.people"></people>
        </container>
    </div>
    <div class="col-md-6">
        <container title="News" color="red">
            <news news="vm.news"></news>
        </container>
    </div>
</div>
```

#### Pass people data to people.directive.js using isolated scope
```
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
```

#### Modify people.html to handle when user clicks on a person row
```
<table class="table table-condensed table-striped">
    <thead>
    <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Location</th>
    </tr>
    </thead>
    <tbody>
    <tr ng-repeat="p in vm.people" ng-click="vm.clickPerson(p)">
        <td>{{p.firstName}}</td>
        <td>{{p.lastName}}</td>
        <td>{{p.age}}</td>
        <td>{{p.location}}</td>
    </tr>
    </tbody>
</table>
```

#### Pass news data to news.directive.js
```
(function() {
    angular.module('app.components.news')
        .directive('news', newsDirective);

    function newsDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/news/news.html',
            scope: {
                news: '='
            },
            controller: NewsController,
            controllerAs: 'vm',
            bindToController: true
        }
    }

    function NewsController() {
        var vm = this;
    }
})();
```

## Step 8 - How do we test our code???

#### Test people directive
```
/* jshint -W117, -W030 */
(function() {
    'use strict';

    describe('Directive: people', function() {

        var element,
            vm;

        beforeEach(function() {
            bard.appModule('app.components.people');
            bard.inject(
                '$compile',
                '$q',
                '$rootScope',
                '$state',
                '$templateCache'
            );
        });

        beforeEach(function() {
            var html = angular.element('<people></people>');
            $rootScope = $rootScope.$new();
            $templateCache.put('app/components/people/people.html', '');
            element = $compile(html)($rootScope);

            $rootScope.$digest(element);

            vm = element.controller('people');
        });

        bard.verifyNoOutstandingHttpRequests();

        it('Opens the people directive', function () {
            expect(element).to.be.ok();
            expect(vm).to.be.ok();
        });
    });
})();
```

#### Test the news directive
```
/* jshint -W117, -W030 */
(function() {
    'use strict';

    describe('Directive: news', function() {

        var element,
            vm;

        beforeEach(function() {
            bard.appModule('app.components.news');
            bard.inject(
                '$compile',
                '$q',
                '$rootScope',
                '$state',
                '$templateCache'
            );
        });

        beforeEach(function() {
            var html = angular.element('<news></news>');
            $rootScope = $rootScope.$new();
            $templateCache.put('app/components/news/news.html', '');
            element = $compile(html)($rootScope);

            $rootScope.$digest(element);

            vm = element.controller('news');
        });

        bard.verifyNoOutstandingHttpRequests();

        it('Opens the news directive', function () {
            expect(element).to.be.ok();
            expect(vm).to.be.ok();
        });
    });
})();
```

#### Test the container directive
```
/* jshint -W117, -W030 */
(function() {
    'use strict';

    describe('Directive: container', function() {

        var element,
            vm;

        beforeEach(function() {
            bard.appModule('app.components.container');
            bard.inject(
                '$compile',
                '$q',
                '$rootScope',
                '$state',
                '$templateCache'
            );
        });

        beforeEach(function() {
            var html = angular.element('<container></container>');
            $rootScope = $rootScope.$new();
            $templateCache.put('app/components/container/container.html', '');
            element = $compile(html)($rootScope);

            $rootScope.$digest(element);

            vm = element.controller('container');
        });

        bard.verifyNoOutstandingHttpRequests();

        it('Opens the container directive', function () {
            expect(element).to.be.ok();
            expect(vm).to.be.ok();
        });
    });
})();
```


## Step 9 - Additional things to consider

#### Refactor dashboard.router.js
```
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
```
