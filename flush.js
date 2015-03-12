(function() {
    'use strict';
    angular
        .module('flush', [])
        .directive('flush', Flush);

    function Flush($window) {
        function link($scope, $element, $attrs) {
            var originalStyle,
                flushed = false;
            
            flush();
            angular.element($window).on('resize', flush);

            function flush() {
                if (!flushed) {
                    originalStyle = css();
                }
                css(originalStyle);
                if ($element[0].offsetTop + $element[0].offsetHeight < parentHeight()) {
                    css({
                        position: 'absolute',
                        bottom: 0
                    });
                    flushed = true;
                } else {
                    flushed = false;
                }
            }

            function css(style) {
                if (style) {
                    for (var property in style) {
                        $element.css(property, style[property]);
                    }
                } else {
                    return {
                        position: $element.css('position'),
                        width: $element.css('width'),
                        bottom: $element.css('bottom')
                    };
                }
            }

            function parentHeight() {
                var parent = getPositionedParent();
                return parent.nodeType !== 1 ? $window.innerHeight : parent.offsetHeight;
            }

            function getPositionedParent() {
                var dom = $element[0].parentNode;
                while (dom.parentNode && !isPositioned(dom)) dom = dom.parentNode;
                return dom;
            }

            function isPositioned(dom) {
                var currentStyle = $window.getComputedStyle ? $window.getComputedStyle(dom) : dom.currentStyle;
                return currentStyle.position === 'relative' || currentStyle.position === 'absolute';
            }
        }

        return {
            restrict: 'A',
            link: link
        };
    }
})();
