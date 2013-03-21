/*!
 * dime       cross-browser module for calculating dimensions
 * @author    Ryan Van Etten (c) 2012
 * @link      http://github.com/ryanve/dime
 * @license   MIT
 * @version   2.0.1
 */

/*jslint browser: true, devel: true, node: true, passfail: false, bitwise: true, continue: true
, debug: true, eqeq: true, es5: true, forin: true, newcap: true, nomen: true, plusplus: true
, regexp: true, undef: true, sloppy: true, stupid: true, sub: true, vars: true, white: true
, indent: 4, maxerr: 180 */
 
(function(root, name, definition) {// github.com/umdjs/umd
    if ( typeof module != 'undefined' && module.exports ) { 
        module.exports = definition(); // node|common|ender
    } else { root[name] = definition(); } // browser
}(this, 'dime', function() {

    var win = window
      , doc = document
      , docElem = doc.documentElement
      , screenW = screen.width
      , screenH = screen.height
      , screenMax = screenW > screenH ? screenW : screenH
      , screenMin = screenW + screenH - screenMax
      , capName = { 'width': 'Width', 'height': 'Height' }
      , effin = {};
    
   /**
    * @constructor  a very lo-fi one (it only grabs the 1st elem)
    * @param  {*=}  item
    */
    function Api(item) {
        this.length = 0;
        if (item = item.nodeType > 0 || item === win ? item : item && item[0]) {
            this[this.length++] = item;
        }
    }
    
    /**
     * @param  {*=}  item
     */
    function api(item) {
        return new Api(item);
    }

    // read @link github.com/ender-js/ender-js/pull/17
    api.prototype = api['fn'] = Api.prototype = effin;
    
    // responsejs.com/labs/dimensions/#device
    function deviceW() { 
        return screenW; 
    }
    function deviceH() {
        return screenH; 
    }
    
    // responsejs.com/labs/dimensions/#viewport
    function viewportW() {
        return docElem.clientWidth; 
    }
    function viewportH() {
        return docElem.clientHeight; 
    }

    /**
     * @param  {string}  name
     * @return {number}
     */    
    function vpGetter(name) {
        return docElem['client' + capName[name]];
    }
    
    /**
     * @return {Object}
     */
    function viewport(name) {
        return null == name ? {
            'width': docElem.clientWidth
          , 'height': docElem.clientHeight
        } : vpGetter(name);  
    }

    /**
     * @return {Object}
     */
    function device(name) {
        var ob = { 'width': screenW, 'height': screenH };
        return null == name ? ob : ob[name];
    }
	
	/**
     * @param  {string}  name
     * @return {number}
     */
    function docGetter(name) {
        var scroll, offset;
        name = capName[name];
        scroll = 'scroll' + name;
        offset = 'offset' + name;
        return Math.max(docElem[offset], docElem[scroll], doc.body[scroll]);
    }

    // responsejs.com/labs/dimensions/#document
    function documentW() {
        return docGetter('width');
    }
    function documentH() {
        return docGetter('height');
    }
    
    /**
     * read an element's dimensions (even if it is hidden)
     * @param  {Object}    el
     * @param  {Function}  fn
     * @param  {Object=}   scope
     */
    function peek(el, fn, scope) {
    
        if (!el) { return; }
        var oPos, oVis, oDis, ret
          , tPos, tVis, tDis
          , w = el.offsetWidth
          , h = el.offsetHeight
          , isHidden = !w && !h;

        if (isHidden) {
            // save orig styles and set temp styles:
            oPos = el.style.position || '';
            oVis = el.style.visibility || '';
            oDis = el.style.display || '';
            el.style.position = tPos = 'absolute';
            el.style.visibility = tVis = 'hidden';
            el.style.display = tDis = 'block';
        }

        ret = fn.call(scope || el, el);
        
        if (isHidden) {// put back the orig values, unless `fn` reset them:
            tPos === el.style.position && (el.style.position = oPos);
            tVis === el.style.visibility && (el.style.visibility = oVis);
            tDis === el.style.display && (el.style.display = oDis);
        }
        return ret;
    }
    
    /**
     * @param  {Array|Object}  els
     * @param  {string}        name
     * @param  {string}        value
     */
    function setStyle(els, name, value) {
        var i = 0, l = els.length;
        while (i < l) {
            els[i++]['style'][name] = value;
        }
        return els;
    }
    
    /**
     * Handler for the .width/.height methods
     * @param  {Array|Object}  els
     * @param  {string}        name
     * @param  {string|number} px
     */
    function setPx(els, name, px) {
        px = typeof px == 'number' ? '' + px + 'px' : px;
        return setStyle( els, name, px );
    }

    /**
     * Handler for the .width/.height methods
     * @param  {string}            name
     * @param  {Array|Object}      els
     * @return {number|undefined}
     */
	function getPx(els, name) {
		if (els[0]) {
            if (1 === els[0].nodeType) {
                return peek(els[0], function(e) { 
                    return e['offset' + capName[name]]; 
                });
            }
            if (els[0] === win) { 
                return vpGetter(name); 
            }
            if (els[0] === doc) { 
                return docGetter(name); 
            }
        }
    }
    
    /**
     * @param  {(number|string)=}  px
     */
    effin['width'] = function(px) {
        return (void 0 === px ? getPx : setPx)(this, 'width', px);
    };
    
    /**
     * @param  {(number|string)=}  px
     */
    effin['height'] = function(px) {
        return (void 0 === px ? getPx : setPx)(this, 'height', px);
    };
    
    api['viewportW'] = viewportW;
    api['viewportH'] = viewportH;
    api['deviceW'] = deviceW;
    api['deviceH'] = deviceH;
    api['viewport'] = viewport;
    api['device'] = device;
    return api;
}));