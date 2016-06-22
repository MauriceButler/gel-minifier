module.exports = function(tokeniser){
    if(!tokeniser){
        throw 'A tokeniser is required';
    }

    return function(data){

        var tokens = tokeniser(data),
            thingsThatNeedSpaces = [
                'NumberToken',
                'NullToken',
                'UndefinedToken',
                'TrueToken',
                'FalseToken',
                'IdentifierToken',
                'PartialToken',
                'FillToken'
            ],
            compiled = '',
            before;

        for (var i = 0; i < tokens.length; i++) {
          if(tokens[i].name !== 'DelimiterToken'){
            if(before && ~thingsThatNeedSpaces.indexOf(before.name) && ~thingsThatNeedSpaces.indexOf(tokens[i].name)){
                compiled += ' ';
            }
            if(tokens[i].name === "StringToken" || tokens[i].name === "String2Token"){
                compiled += tokens[i].original.replace(/\\n/g, '\n');
            }else{
                compiled += tokens[i].original;
            }
            before = tokens[i];
          }
        }

        return compiled;
    };
};
