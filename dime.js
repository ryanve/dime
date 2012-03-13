/*!
 * dime       ultra-fast cross-browser micro-lib for calculating dimensions
 * @author    Ryan Van Etten (c) 2012
 * @link      http://github.com/ryanve/dime
 * @license   MIT
 * @version   1.1.0
 */

!(function (name, definition) {
    if (typeof module !== 'undefined') {
        // Node (nodejs.org)
        module.exports = definition();
    }
    else if (typeof define === 'function' && define.amd) {
        // AMD (github.com/amdjs/amdjs-api/wiki/AMD)
        // addyosmani.com/writing-modular-js/
        define(name, definition);
    }
    else {
        // Standalone:
        // this === window in the global scope
        this[name] = definition();
    }
}('dime', function() {// Immediately invoke the above func, passing 'dime' to the
                      // name param, and passing the entire callback below to the
                      // definition param. (Props to github.com/ded for this setup)

    var prop
      , win = window
      , screen = win.screen
      , doc = win.document
      , max = win.Math.max
      , html = doc.documentElement
      , screenW = screen.width
      , screenH = screen.height
      , screenMax = max(screenW, screenH)
      , screenMin = screenW + screenH - screenMax
      , queryEngine = false
    ;
    
    function dime(el) {
        
        // This function is setup in a way that makes
        // it so that  dime() instanceof dime === true
        // similiar to the jQuery function. See 31:00
        // in @link youtube.com/watch?v=0LKDImgRfrg
        
        // The next two lines are something like Object.create
        // See @link javascript.crockford.com/prototypal.html
        
        function object() {}
        object.prototype = dime.prototype;

        var instance = new object() // create instance
          , nodeType
          , isElemDocOrWin;
        
        // If an engine has been set and el is a string then query it:
        if (queryEngine && typeof 'el' === 'string') {
            instance.selector = el;
            el = queryEngine(el)[0];
            instance.length = el.length || 0;
        }

        // Check if el is a DOM element, document, or window:
        // developer.mozilla.org/en/nodeType
        nodeType = el ? el.nodeType : el;
        isElemDocOrWin = !!(nodeType === 1 || nodeType === 9 || el === win);

        // Put the element/doc/win (or false) in index 0:
        instance[0] = isElemDocOrWin ? el : false;
        
        // Make it work as an array-like object. Also this make it so we can 
        // check !!this.length to verify that the object has something in it:
        if (instance.selector) {
            instance.length = isElemDocOrWin ? 1 : 0;
        }
        
        return instance;
    }
    
    dime.prototype = {
        
        // There's lots of info about how these calculations
        // are computed @link responsejs.com/labs/dimensions/

        dime: true // Make it easy to check for dime instances.

      , length: 0  // Gets overwritten to 1 when dime(somethingReal) is called.

      , selector: null // Becomes a string only if a query engine is used.
      
        /**
         * dime.setQueryEngine()    Integrate a query engine into dime so that you 
         *                          can pass selector strings like dime('#example')
         *
         * @example   dime.setQueryEngine(qwery);        // dustindiaz.com/qwery
         * @example   dime.setQueryEngine(jQuery);       // jquery.com
         *
         */

      , setQueryEngine: function(e) {
              // Inspired by bonzo.setQueryEngine @link github.com/ded/bonzo
            if (!arguments.length && !queryEngine) {
                queryEngine = win.$;
            }
            else if (typeof e === 'function') {
                queryEngine = e;
            }
            return !!queryEngine;
        }

      , element: function() {
            // Get the element in index 0 or the docElem if index 0 is not an element. This is used
            // in methods that require an element (to make sure we're always dealing w/ an element).
            var el = this[0];
            return 1 === el.nodeType ? el : html;
        }

      , get: function(index) {
            index = index || 0;
            if ( index < 0 ) {
                index = this.length + index;
            }
            return dime(this[index]);
        }

      , is: function(method, min, max) {
            var type = typeof method
              , num = 'string' === type ? dime[method]() : 'function' === type ? method() : false;
            return 'number' === typeof num ? (num >= (min || 0) && (!max || num <= max)) : false;
        }

        // responsejs.com/labs/dimensions/#device
      , deviceW:   function() { 
            return screenW; 
        }
      , deviceH:   function() {
            return screenH; 
        }
      , deviceMax: function() { 
            return screenMax; 
        }
      , deviceMin: function() { 
            return screenMin; 
        }
          
        // responsejs.com/labs/dimensions/#viewport
      , viewportW: function() { 
            return html.clientWidth; 
        }
      , viewportH: function() { 
            return html.clientHeight; 
        }

        // responsejs.com/labs/dimensions/#document
      , documentW: function() {
            return max(html.offsetWidth, html.scrollWidth, doc.body.scrollWidth);
        }
      , documentH: function() {
            return max(html.offsetHeight, html.scrollHeight, doc.body.scrollHeight);
        }

      , scrollX: function() {
            // developer.mozilla.org/en/DOM/window.scrollX
            return win.pageXOffset || html.scrollLeft; 
        }
        
      , scrollY: function() {
            // developer.mozilla.org/en/DOM/window.scrollY
            return win.pageYOffset || html.scrollTop; 
        }
        
      , overflowX: function() {
            var difference = dime.documentW() - dime.viewportW();
            return 0 < difference ? difference : 0;
        }
            
      , overflowY: function() {
            var difference = dime.documentH() - dime.viewportH();
            return 0 < difference ? difference : 0;
        }

        /**
         * .rectangle()    Cross-browser safe version of getBoundingClientRect. The
         *                 top/bottom/left/right props are pretty widlely supported already.
         *                 The width/height props are patched for browsers that don't natively 
         *                 support them. Firefox returns coords as floats while other browsers
         *                 return them as integers. 
         *
         * @link developer.mozilla.org/en/DOM/element.getBoundingClientRect
         * @link quirksmode.org/dom/w3c_cssom.html
         * @return  object
         */
        
      , rectangle: function () {
            var el = this.element()
              , method = 'getBoundingClientRect'
              , r = el[method] ? el[method]() : {}
            ;
            // The native object is read-only so we 
            // have use a copy in order to modify it:
            return {
                top: r.top || 0
              , left: r.left || 0
              , bottom: r.bottom || 0
              , right: r.right || 0
              , width: r.width || (r.right - r.left)
              , height: r.height || (r.bottom - r.top)
            };
        }
          
        /**
         * .offset()       Get the coordinates of this.element() relative to the document.
         *                 This returns an object like that of api.jquery.com/offset/
         */
          
      , offset: function() {
              // Adapted from jQuery .offset()
            var r = this.rectangle()
              , x = dime.scrollX() - (html.clientLeft || 0)
              , y = dime.scrollY() - (html.clientTop || 0)
            ;
            return {
                top: r.top + y
              , left: r.left + x
              , bottom: r.bottom + y
              , right: r.right + x
              , width: r.width
              , height: r.height
            };
        }
      
    };//dime.prototype
    
    dime.prototype[0] = false;
    
    // So for instances of dime() include all the props/methods in
    // dime.prototype  The loop below also adds them directly onto
    // dime so that static props can be called like dime.viewportW()
    // rather than dime().viewportW() - The methods are defined so 
    // both ways both will work, but the static form is faster b/c
    // it requires one less function call.
    
    for (prop in dime.prototype) {
        if (dime.prototype.hasOwnProperty(prop)) {
            dime[prop] = dime.prototype[prop];
        }
    }
    
    return dime;

})); // End callback and closure.

// Recommended videos to watch related
// to the design patterns used in dime:
// youtube.com/watch?v=i_qE1iAmjFg // Paul Irish
// youtube.com/watch?v=0LKDImgRfrg // John Resig

/*jslint browser: true, es5: true, white: true, newcap: true, plusplus: true, regexp: true, maxerr: 50, indent: 4 */