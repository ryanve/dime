(function(root, name, make) {
    if (typeof module != 'undefined' && module['exports']) module['exports'] = make();
    else root[name] = make();
}(this, 'dime', function() {

    var effin = {}
      , xport = {'fn': effin}
      , peeks = associate(['position', 'visibility', 'display'], ['absolute', 'hidden', 'block'])
      , cap = associate(['width', 'height'], ['Width', 'Height'])
      , client = 'client'
      , offset = 'offset'
      , style = 'style';
    
    /**
     * @this {Object} source
     * @param {string|{length:number}} key or keys
     * @param {number|{length:number}} i or source
     * @param {{length:number}=} keys
     */
    function associate(key, i, keys) {
        if (null == keys) return each(key, associate, i);
        keys[key] = this[i];
    }
    
    /**
     * @param {{length:number}} stack
     * @param {Function} fn
     * @param {*=} scope
     */
    function each(stack, fn, scope) {
        for (var i = 0, l = stack.length; i < l;) fn.call(scope, stack[i], i++, stack);
        return stack;
    }
    
    /**
     * @param {Window} win
     * @param {string} dim
     * @return {number}
     */
    function measureWin(win, dim) {
        return win.document.documentElement[client + cap[dim]];
    }
    
    /**
     * @link http://ryanve.com/lab/dimensions/#document
     * @param {Node} doc
     * @param {string} dim
     * @return {number}
     */
    function measureDoc(doc, dim) {
        var scroll = 'scroll', docElem = doc.documentElement, body = doc.body;
        scroll += dim = cap[dim];
        return Math.max(docElem[offset + dim], docElem[scroll], body ? body[scroll] : 0);
    }
    
    /**
     * @param {Element} e
     * @param {string} dim
     * @return {number}
     */    
    function measureEl(e, dim) {
        // It is debatable whether client or offset dims are more useful here.
        // https://developer.mozilla.org/en-US/docs/Determining_the_dimensions_of_elements
        return peek(e, client + cap[dim]);
    }
    
    /**
     * hack to get dimensions of hidden elements
     * @param {Element} e
     * @param {Function|string} fn
     */
    function peek(e, fn) {
        var r, source, before, visible = e.offsetWidth || e.offsetHeight;
        if (visible) return result(e, fn);
        before = {};
        source = e[style];
        each(peeks, function(prop) {
            before[prop] = source[prop] || '';
            source[prop] = peeks[prop];
        });
        r = result(e, fn);
        each(peeks, function(prop) {
            if (source[prop] === peeks[prop]) source[prop] = before[prop];
        });
        return r;
    }
    
    /**
     * @param {{length:number}} els
     * @param {string} name
     * @param {string} value
     */
    function setStyle(els, name, value) {
        return each(els, function(e) {
            e[style][name] = value;
        });
    }
    
    /**
     * @param {{length:number}} els
     * @param {string} dim
     * @param {string|number} px
     */
    function setPx(els, dim, px) {
        px = typeof px == 'number' ? '' + px + 'px' : px;
        return setStyle(els, dim, px);
    }
    
    /**
     * @param {Object} o
     * @param {string|number|Function} k
     */
    function result(o, k) {
        return typeof(typeof k == 'function' ? k : k = o[k]) == 'function' ? k.call(o) : k;
    }

    /**
     * @param {{length:number}} stack
     * @param {string} dim
     * @return {number|undefined}
     */
    function getPx(stack, dim) {
        var use, o = stack[0];
        if (null == o) return;
        if (o == o.window) use = measureWin;
        else use = 1 === o.nodeType ? measureEl : 9 === o.nodeType ? measureDoc : result;
        return +use(o, dim) || 0;
    }
    
    each(cap, function(dim) {
        /**
         * @this {{length:number}}
         * @param {(number|string)=} px
         * @return {number|undefined|{length:number}}
         */
        effin[dim] = function(px) {
            return (void 0 === px ? getPx : setPx)(this, dim, px);
        };

        /**
         * @param {Window|Node|Object} o
         * @param {(number|string)=} px
         * @param {*=} guard for iterators
         * @return {number|undefined}
         */
        xport[dim] = function(o, px, guard) {
            if (void 0 === px || guard) return getPx([o], dim);
            setPx([o], dim, px);
        };
    });
    
    return xport;
}));