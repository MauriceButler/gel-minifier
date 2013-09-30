module.exports = function(data){

    var Gedi = require('gedi'),
        gedi = new Gedi(),
        tokens = gedi.gel.tokenise(data),
        thingsThatNeedSpaces = [
            'NumberToken',
            'NullToken',
            'UndefinedToken',
            'TrueToken',
            'FalseToken',
            'IdentifierToken'
        ],
        compiled = '',
        before;

    for (var i = 0; i < tokens.length; i++) {
      if(tokens[i].name !== 'DelimiterToken'){
        if(before && ~thingsThatNeedSpaces.indexOf(before.name) && ~thingsThatNeedSpaces.indexOf(tokens[i].name)){
            compiled += ' ';
        }
        compiled += tokens[i].original;
        before = tokens[i];
      }
    }

    return compiled;
};