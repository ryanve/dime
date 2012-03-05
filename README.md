[dime](https://github.com/ryanve/dime) is an ultra-fast cross-browser micro-library for calculating dimensions, using pure native JavaScript methods.

### Properties

```javascript

dime.deviceW     // device width  property
dime.deviceH     // device height property
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
dime(elem).rectangle() // cross-browser getBoundingClientRect (.top/.bottom/.left/.right/.width/.height)
dime(elem).offset() // get coordinates relative to the document (.top/.bottom/.left/.right/.width/.height)
dime(elem).get(index) // applicable when dime is paired with a query engine (index -1 gets the last elem)
dime(elem).element() // if elem (index 0) is a DOM element, get it. Otherwise get the documentElement.

```

### Extending

Devs can add a query engine such as [qwery](https://github.com/ded/qwery) to provide the ability query selector strings like `dime('#example')`

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
!!dime.length;          // true if #example exists
1 === dimeElem.length;  // true if #example exists
elem === dimeElem[0];   // true if #example exists (otherwise false)
true === dimeElem.dime; // true if it exists *or* if it doesn't

```


