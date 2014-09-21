
/**@constructur*/
var jsTokenizer=function() {

    this.tokens=[];
    this.tokensFound=[];
    _that=this;
    this.row=0;
    this.column=0;
    
};

jsTokenizer.prototype.toString=function() {
    console.log(this.tokens);
};


jsTokenizer._TokenFound=function(name,value,row,column) {
    this.name=name;
    this.value=value;
};

jsTokenizer._Token=function(name,regPattern,regFlags,callbackFunction,row,column) {

   
    this.name=name;
    this.value="";
    this.callbackFunction=callbackFunction;
    
    
    this.regExpression=new RegExp(regPattern,regFlags);
    
    if (typeof(row) !== "undefined") {
        this.row=row;
    }
    if (typeof(column) !== "undefined") {
        this.column = column;
    }
  
    
    
};



/**
/*Add new token
/*@param {string} name Name of new token to add
/*@param {string} regExpression Reg expression for new token
/*@param {string} regFlags Flags for regular expression
/*@param {function} [callbackFunction] Callback function to call when processing token
*/
jsTokenizer.prototype.addToken=function(name,regExpression,regFlags,callbackFunction) {

    if (typeof(callbackFunction) === "undefined") {
        callbackFunction = "";
    }    
    this._token=new jsTokenizer._Token(name,regExpression,regFlags,callbackFunction);
    this.tokens.push(this._token);
};

jsTokenizer.prototype.tokenizeText=function(textToTokenize) {
    //console.log("text to tokenize" + textToTokenize);
    var currentPosition=0;
    var currentRow=1;
    var currentText=textToTokenize;
    var originalText=textToTokenize;
   
    
    var lastPosition=textToTokenize.length;
    while (true) {
         console.log("current Text" + currentText);
         var tokenFound=false;
    
        for (var a=0;a<this.tokens.length;a++) {
            var currentToken=this.tokens[a];
           
           
            var myRe = currentToken.regExpression;
            
            var myArray = myRe.exec(currentText);
           
           
            console.log(myArray);
            
            if (myArray != null && myArray.length > 0 && myArray["index"] == 0) {
                console.log("current reg expression matching " + myRe);
                tokenFound=true;
                var foundText=myArray[0];
                var indexFound=myArray["index"];
                var foundLength=foundText.length;
                
                
                if (currentToken.callbackFunction != "") {
                     currentToken.value=foundText;
                     currentToken=currentToken.callbackFunction.call(_that,currentToken);
                     if (typeof(currentToken) != "undefined") {
                        var newToken=new jsTokenizer._Token(currentToken.name,currentToken.regExpression,currentToken.regFlags,"",currentToken.row,currentToken.column);
                        newToken.value=foundText;
                        _that.tokensFound.push(newToken);
                    }
                    
                    currentPosition += currentToken.value.length;
                    
                    
                } else {
                    currentToken.value=foundText;
                    
                    var newToken=new jsTokenizer._Token(currentToken.name,currentToken.regExpression,currentToken.regFlags,"",_that.row,_that.column);
                    newToken.value=foundText;
                    _that.tokensFound.push(newToken);
                     currentPosition += currentToken.value.length;
                    
                }               
               break;
                
                
                
                
            }
            
        }
        if (tokenFound === false) {
            currentPosition += 1;
        }
        currentText=originalText.substr(currentPosition);
        
        if (currentPosition >= lastPosition) {
            break;
        }
    }
    
    console.log(this.tokensFound);
    
    

    
};



