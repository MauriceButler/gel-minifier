var test = require('grape'),
    Gedi = require('gedi'),
    gedi = new Gedi(),
    gelMinifier = require('../');

function testTokeniser(expression){
    return gedi.gel.tokenise(expression);
}

test('gel-minifier Exists', function (t) {
    t.plan(2);
    t.ok(gelMinifier, 'gel-minifier Exists');
    t.equal(typeof gelMinifier, 'function');
});

test('boom', function (t) {
    t.plan(1);
    t.throws(function(){
        gelMinifier('(&& 1 2)');
    });
});

test('(&& 1 2)', function (t) {
    t.plan(1);
    var result = gelMinifier('(&& 1 2)', testTokeniser);
    t.equal(result, '(&& 1 2)');
});

test('(&& [/thing/stuff] "foo")', function (t) {
    t.plan(1);
    var result = gelMinifier('(&& [/thing/stuff] "foo")', testTokeniser);
    t.equal(result, '(&&[/thing/stuff]"foo")');
});

test('(&& [/thing/stuff] 2)', function (t) {
    t.plan(1);
    var result = gelMinifier('(&& 2 [/thing/stuff])', testTokeniser);
    t.equal(result, '(&& 2[/thing/stuff])');
});