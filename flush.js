(function() {
    'use strict';
    angular
        .module('flush', [])
        .directive('flush', Flush);

    function Flush($window, $document) {
        function link($scope, $element, $attrs) {
            var originalStyle,
                flushed,
                prevScrollHeight,
                prevOffsetHeight,
                nextFrame = window.requestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function() {
                        $scope.$watch(getParentScrollHeight, flush);
                        $scope.$watch(getParentOffsetHeight, flush);
                        angular.element($window).on('resize', flush);
                        nextFrame = angular.noop;
                    };

            watchParentHeights();

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

            function watchParentHeights() {
                var scrollHeight = getParentScrollHeight(),
                    offsetHeight = getParentOffsetHeight();
                if (scrollHeight !== prevScrollHeight || offsetHeight !== prevOffsetHeight) {
                    flush();
                    prevScrollHeight = scrollHeight;
                    prevOffsetHeight = offsetHeight;
                }
                nextFrame(watchParentHeights);
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
                var parent = getPositionedParent(),
                    windowHeight = $window.innerHeight;
                if (typeof innerHeight === 'undefined') {
                    windowHeight = $document[0].documentElement.clientHeight; // IE8
                }
                return parent.nodeType !== 1 ? windowHeight : parent.offsetHeight;
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
