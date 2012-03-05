[dime](https://github.com/ryanve/dime) is an ultra-fast open-source cross-browser micro-library for calculating dimensions, using pure native JavaScript methods.

## API

### Properties

```javascript

dime.deviceW     // device width
dime.deviceH     // device height
dime.deviceMax   // calculated Math.max(dime.deviceW, dime.deviceH)
dime.deviceMin   // calculated Math.min(dime.deviceW, dime.deviceH)

```

### Methods

```javascript
dime.viewportW() // get viewport width
dime.viewportH() // get viewport height
dime.documentW() // get document width
dime.documentH() // get document height
dime.overflowX() // get # of horizontal pixels that doc overflows viewport (or 0 if no overflow)
dime.overflowY() // get # of vertical pixels that doc overflows viewport (or 0 if no overflow)
dime.scrollX()   // cross-broswer equiv to native window.scrollX
dime.scrollY()   // cross-broswer equiv to native window.scrollY

dime.is(propOrMeth, min [, max]) // boolean for testing ranges
dime.is('viewportW', 800) // equiv to (dime.viewportW() >= 800)
dime.is('deviceH', 480, 960) // equiv to (dime.deviceH() >= 480 && dime.deviceH() <= 960)
// ... works for any of the props/methods listed above

dime(elem) // wrapper for element-based methods (accepts native DOM elements, document, or window)
dime(elem).rectangle() // cross-browser getBoundingClientRect: .top/.bottom/.left/.right/.width/.height
dime(elem).offset() // coordinates relative to the document: .top/.bottom/.left/.right/.width/.height
dime(elem).get(index) // applicable when dime is paired w/ a query engine (index -1 gets the last elem)
dime(elem).element() // if elem (index 0) is a DOM element, get it. Otherwise get the documentElement.

```

### Extending

Devs can add a query engine such as [qwery](https://github.com/ded/qwery) to provide the ability to query selector strings like `dime('#example')`

```javascript

dime.setQueryEngine()       // set query engine to $
dime.setQueryEngine(qwery)  // set query engine to qwery
dime.setQueryEngine(jQuery) // set query engine to jQuery

```

### Instances

If you need to check whether an unknown object is an instance of `dime()` you can use either of these techniques:

```javascript

ukn instanceof dime // true if ukn is an instance of dime()
ukn && ukn.dime     // true if ukn is an instance of dime()

```
The result of calling the dime() function is an array-like object. It has a length property representing the number of elems. If you haven't added a query engine, then the length will be `1` and that element will be stored in index 0, unless you pass it something invalid then the length property will be `0` and index 0 will be `false`. If you've added an engine, the length will be the number of selected elements.

```javascript
var elem, dimeElem;
elem = document.getElementById("example");
dimeElem = dime(elem);
!!dimeElem.length;      // true if #example exists
1 === dimeElem.length;  // true if #example exists
elem === dimeElem[0];   // true if #example exists (otherwise false)
true === dimeElem.dime; // true if it exists *or* if it doesn't

```

### Projects

Much of [dime](https://github.com/ryanve/dime) is also built into [Response](https://github.com/ryanve/response.js) 0.3+


## License

### [dime](https://github.com/ryanve/dime) is available under the [MIT license](http://en.wikipedia.org/wiki/MIT_License)

Copyright (C) 2012 by [Ryan Van Etten](https://github.com/ryanve)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.