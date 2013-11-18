(function(root, name) {
    var common = typeof module != 'undefined' && !!module.exports
      , aok = common ? require('../node_modules/aok') : root.aok
      , api = common ? require('../src') : root[name]
      , win = root.window
      , doc = typeof document != 'undefined' && document
      , docElem = doc.documentElement
      , effin = api.fn
      , jQuery = root['jQuery'] || false
      //, ender = root['ender'] || false
      , square = {width:1, height:1, id:'square'}
      , cases = [
            'visible', 'hidden', 'margin', 'border', 'padding'
          , 'box', '-padding', '-border', '-margin', 'scroll'
        ]
      , subjects = [square]
      //, slice = subjects.slice
      , precision = 1;

    common || aok.log(api);
    aok.log('precision: ' + precision);
    win && subjects.push(win);
    doc && subjects.push(doc, docElem) && every(cases, function(s) {
        s = doc.getElementById(s);
        s ? subjects.push(s) : aok.error('Required elements not found.');
        return true;
    });
    
    function every(stack, fn, scope) {
        var l = stack.length, i = 0;
        while (i < l) if (!fn.call(scope, stack[i], i++, stack)) return false;
        return true;
    }

    function diff(a, b) {
        if (a === b) return 0;
        if (a !== a) return b === b;
        if (void 0 !== b) return a-b;
    }
    
    function isPrecise(n) {
        return void 0 === n || n === +n && precision >= Math.abs(n);
    }
    
    // bugs.jquery.com/ticket/11004
    every(['width', 'height'], function(dim) {
        return every(subjects, function(s) {
            var $ = null == s ? false : s.nodeType || s == s.window ? jQuery : false
              , cap = dim.charAt(0).toUpperCase() + dim.slice(1);
            //s && 1 === s.nodeType && api[dim](s, 100);
            return aok(function() {
                var kind = s && typeof s.id === 'string' && s.id || aok.explain(s).slice(8, -1);
                this.id = [dim, kind].join('_');
                var a = api[dim](s);
                var b = effin[dim].call([s]);
                var c = $ && $(s)[dim]();
                this.remark = [a, b, c, s['client' + cap], s['offset' + cap], s['scroll' + cap]].join();
                if (diff(a, b)) return;
                if (c === false) return true;
                return isPrecise(diff(b, c));
            });
        });
    });
}(this, 'dime'));












