# ng-flush
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![devDependency Status][david-image]][david-url]

A simple attribute directive that will flush an element to the bottom of its first positioned parent, if necessary.

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

To flush an element to the bottom:

```html
<footer flush></footer>
```

The directive will do nothing if the bottom edge of the flushed element is already below the bottom of its first positioned parent. The directive's approach is to set the following inline styles:

```
{
	position: 'absolute',
	bottom: 0
}
```

This means that the element will be flushed to the bottom of its first positioned parent, whether it is the window or otherwise.

The directive binds a listener to the browser's `resize` event, so the element will re-flush whenever the size of the viewport changes.

[david-image]: https://david-dm.org/hiebj/ng-flush/dev-status.svg
[david-url]: https://david-dm.org/hiebj/ng-flush#info=devDependencies
[downloads-image]: http://img.shields.io/npm/dm/ng-flush.svg
[npm-image]: http://img.shields.io/npm/v/ng-flush.svg
[npm-url]: https://npmjs.org/package/ng-flush
