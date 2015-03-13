(function() {
    'use strict';
    angular
        .module('flush', [])
        .directive('flush', Flush);

    function Flush($window, $document) {
        function link($scope, $element, $attrs) {
            var originalStyle,
                flushed = false,
                prevScrollHeight = getParentScrollHeight(),
                nextFrame = window.requestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function() {
                        $scope.$watch(getParentScrollHeight, flush);
                        nextFrame = angular.noop;
                    };
            
            flush();
            watchParentScrollHeight();
            angular.element($window).on('resize', flush);

            function flush() {
                if (!flushed) {
                    originalStyle = css();
                } else {
                    css(originalStyle);
                    flushed = false;
                }
                if ($element[0].offsetTop + $element[0].offsetHeight < getParentOffsetHeight()) {
                    css({
                        position: 'absolute',
                        bottom: 0
                    });
                    flushed = true;
                }
            }

            function watchParentScrollHeight() {
                var scrollHeight = getParentScrollHeight();
                if (scrollHeight !== prevScrollHeight) {
                    flush();
                    prevScrollHeight = scrollHeight;
                }
                nextFrame(watchParentScrollHeight);
            }

            function css(style) {
                if (style) {
                    for (var property in style) {
                        $element.css(property, style[property]);
                    }
                } else {
                    return {
                        position: $element.css('position'),
                        bottom: $element.css('bottom')
                    };
                }
            }

            function getParentOffsetHeight() {
                var parent = getPositionedParent();
                return parent.nodeType !== 1 ? $window.innerHeight : parent.offsetHeight;
            }

            function getParentScrollHeight() {
                var parent = getPositionedParent();
                return parent.nodeType !== 1 ? $document[0].body.scrollHeight : parent.scrollHeight;
            }

            function getPositionedParent() {
                var dom = $element[0].parentNode;
                while (dom.parentNode && !isPositioned(dom)) dom = dom.parentNode;
                return dom;
            }

            function isPositioned(dom) {
                var currentStyle = $window.getComputedStyle ? $window.getComputedStyle(dom) : dom.currentStyle;
                return currentStyle.position !== 'static';
            }
        }

        return {
            restrict: 'A',
            link: link
        };
    }
})();
