/* jshint -W117, -W030 */
(function() {
    'use strict';

    describe('Directive: news', function() {

        var baseMock,
            element,
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

        it('Opens the location.directive', function () {
            expect(element).to.be.ok();
            expect(vm).to.be.ok();
        });
    });
})();
