[dime](https://github.com/ryanve/dime) is cross-browser module for calculating dimensions in JavaScript.

```
$ npm install dime
```

# methods

### static

Cheap simple methods are on the top-level:

```javascript
dime.device()    // get object containing width and height
dime.deviceW()   // get device width 
dime.deviceH()   // get device height
dime.viewport()  // get object containing current width and height
dime.viewportW() // get viewport width
dime.viewportH() // get viewport height
```

### chain 

jQuery-compatible-ish methods designed to be mixed into a jQuery-like lib:

```javascript
dime.fn.width() // get the width of the 1st elem in the set
dime.fn.width(value) // set the width of all elems in the set
dime.fn.height() // get the width of the 1st elem in the set
dime.fn.height(value) // set the width of all elems in the set
```

## related

- [Response](https://github.com/ryanve/response.js)
- [verge](https://github.com/ryanve/verge)

# license

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