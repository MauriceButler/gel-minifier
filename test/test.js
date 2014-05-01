var test = require('grape'),
    Gedi = require('gedi'),
    gedi = new Gedi(),
    gelMinifier = require('../')(function (expression){
        return gedi.gel.tokenise(expression);
    });

test('gel-minifier Exists', function (t) {
    t.plan(2);
    t.ok(gelMinifier, 'gel-minifier Exists');
    t.equal(typeof gelMinifier, 'function');
});

test('(&& 1 2)', function (t) {
    t.plan(1);
    var result = gelMinifier('(&& 1 2)');
    t.equal(result, '(&& 1 2)');
});

test('(&& [/thing/stuff] "foo")', function (t) {
    t.plan(1);
    var result = gelMinifier('(&& [/thing/stuff] "foo")');
    t.equal(result, '(&&[/thing/stuff]"foo")');
});

test('(&& [/thing/stuff] 2)', function (t) {
    t.plan(1);
    var result = gelMinifier('(&& 2 [/thing/stuff])');
    t.equal(result, '(&& 2[/thing/stuff])');
});