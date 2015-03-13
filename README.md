# ng-flush
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![devDependency Status][david-image]][david-url]

A simple attribute directive that will flush an element to the bottom of its [closest][closest-url] [positioned][positioned-url] parent (typically the `window`).

It is available through NPM:

```shell
npm install ng-flush
```

## Usage

Include `flush.min.js` in your build or directly with a `<script>` tag and require the module in your module definition:

```js
angular  
    .module('App', [  
        'flush',  
        ... // other dependencies  
    ]);
```

To flush an element to the bottom of its closest positioned parent:

```html
<footer flush></footer>
```

The directive's approach is to set the following inline styles if the element does not naturally reach the bottom:

```css
{
    position: 'absolute';  
    bottom: 0;
}
```

This means that the element will be flushed to the bottom of its closest positioned parent, regardless of whether it is the `window` or another element.

The directive will remove the flush styles if the bottom edge of the flushed element would naturally lie below the bottom edge of the parent, meaning that this is **not** a "sticky footer" (which could be done without JavaScript, using CSS). If the content of the parent is large enough to push the flushed element to the bottom its visible area, the flushed element will position itself naturally.

Typically this is best-used on an element which is the last visible child of its closest positioned parent. Otherwise, the children would appear to the user to change order when the flush is toggled - it would be below its siblings when flushed, and among its siblings when positioned naturally.

## Flush triggers

The directive binds a listener to the browser's `resize` event, so the element will be re-flushed whenever the size of the viewport changes. The directive also watches the `scrollHeight` of the closest positioned parent. If the scroll height changes, the element will be re-flushed.

> Note that the directive attempts to use `requestAnimationFrame` or its browser-specific variants (if they are available) to watch the scroll height. This is because using `$scope.$watch` to keep an eye on the scroll height is not fast enough to catch changes during animations, e.g. expansion and collapse of content within the parent. As a result, there is a slight visual delay when animations cause the parent to change size when `$scope.$watch` is used. However, since many browsers still do not implement `requestAnimationFrame` or an equivalent, the directive falls back gracefully and uses `$scope.$watch` instead when animation functions are not available.

[david-image]: https://david-dm.org/hiebj/ng-flush/dev-status.svg
[david-url]: https://david-dm.org/hiebj/ng-flush#info=devDependencies
[downloads-image]: http://img.shields.io/npm/dm/ng-flush.svg
[npm-image]: http://img.shields.io/npm/v/ng-flush.svg
[npm-url]: https://npmjs.org/package/ng-flush
[closest-url]: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
[positioned-url]: https://developer.mozilla.org/en-US/docs/Web/CSS/position
