(function() {
    'use strict';
    describe('Directive: flush [A]', function() {
        var $scope,
            $compile,
            $window,
            $document,
            tpl = '<footer flush style="height: 50px"></footer>',
            element;

        beforeEach(module('flush'));

        beforeEach(inject(function($rootScope, _$compile_, _$window_, _$document_) {
            $compile = _$compile_;
            $window = _$window_;
            $document = _$document_;
            $scope = $rootScope.$new();
        }));

        afterEach(function() {
            element.remove();
        });

        describe('<footer flush>', function() {
            it('should be flushed to the bottom of the viewport when the content is shorter than the viewport', function() {
                addElement();
                expectPosition();
            });
        });

        function addElement() {
            element = $compile(tpl)($scope);
            angular.element($document[0].body).append(element);
        }

        function expectPosition() {
            expect(element[0].offsetTop + element[0].offsetHeight).toBe($window.innerHeight);
        }
    });
})();
