#gel-minifier

minifies gel expressions

#Install

    npm install gel-minifier

#Usage

    var gelMinifier = require('gel-minifier')(function(expression){
        // eg. return gel.tokenise(expression);
    });

    var minified = gelMinifier('(&& 1 2)');