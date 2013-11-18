# [dime](../../)
#### cross-browser JavaScript [module](https://npmjs.org/package/dime) to measure dimensions

```bash
$ npm install dime
```

## API ([3.0](../../releases))

### Static methods
#### Fast simple top-level methods

```js
dime.width(object) // get width
dime.height(object) // get height
dime.width(element, px) // set width
dime.height(element, px) // set height
```

#### Measurable objects

- `window`
- DOM node: `document` or element
- object with `.width`/`.height` properties or methods

```js
dime.width(screen) // => screen.width
dime.width({width:10, height:10}) // => 10
```

### Chain methods
#### jQueryish methods for compatible libs (such as [ender](https://github.com/ender-js))

```js
.width() // get the width of the 1st elem in the set
.width(value) // set the width of all elems in the set
.height() // get the width of the 1st elem in the set
.height(value) // set the width of all elems in the set
```

### Integrated usage

```js
$(window).width()
$(document).width()
$(element).width()
$(element).width(100)
```

### Standalone usage

```js
dime.fn.width.call(stack)
dime.fn.width.call(stack, px)
```

#### Standalone examples

It is only sensible to use these for *setting* dimensions&mdash;the [statics](#static-methods) are faster for gets.

```js
dime.fn.width.call([document]) // same as dime.width(document)
dime.fn.width.call(document.querySelectorAll('.example'), 100)
```

## [Version](../../releases) notes

#### 3.x is leaner than previous releases
- 2.x device methods were removed because the native [`screen`](http://ryanve.com/lab/dimensions/#device) provides these.
- 2.x viewport methods were removed in favor of `dime.width(window)` although those methods 
are available in [verge](#related-modules).
- In 3.x `dime` is a plain object&mdash;not a wrapper function.

## Related modules

- [verge](https://github.com/ryanve/verge): viewport utilities

## Resources

- [Lab: dimensions](http://ryanve.com/lab/dimensions/)

## License: [MIT](http://en.wikipedia.org/wiki/MIT_License)

Copyright (C) 2012 by [Ryan Van Etten](https://github.com/ryanve)