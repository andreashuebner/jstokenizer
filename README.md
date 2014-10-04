##jsTokenizer - Simple JavaScript Tokenizer

jsTokenizer is a simple tokenizer written in JavaScript.

Example usuage: 

Make sure to include jsTokenizer.js or jsTokenizer.min.js. 

The following example is taken from the file tests/tests.js. 

```
/*Build our test string - simple sql string*/
var sqlString="";
sqlString +=" Select name, age, value from tbl_test where";
sqlString +="\n";
sqlString += " name = 'Andreas'";

```
```
/*Initialize new jsTokenizer object */
var myTokenizer=new jsTokenizer();
```
```
/*Add tokens, with following arguments:
First argument: Name of token
Second argument: Regular expression for the token
Third argument: Regular expression flags (e.g. "i" for ignore case)
Optional fourth argument: Callback function for token
*/
 myTokenizer.addToken("keyword","select|from","i",keyword); 
    myTokenizer.addToken("linebreak","\n","",linebreak);
    myTokenizer.addToken("equal","=","",equalsign);
    myTokenizer.addToken("whitespace","\\s","",whitespace);
    myTokenizer.addToken("other",".","",other); 
```
```
/*Define callback functions*/
function keyword(token) {
//every callback function will be called with token as first argument and myTokenizer as context
//myTokenizer has two attributes row and column, keeping track of current row and column.
//every token object has these attributes as well, so that we later know where a token was found

    
        var tokenlength=token.value.length;
        
        
        token.row = this.row; //assign current row to token
        token.column = this.column; //assign current column of jsTokenizer object
        
        this.column += tokenlength; //increase column of myTokenizer object
        return token; //return token. In case a token is irrelevant, you dont need to return the token
    
        
    }
    function equalsign(token) {
    
        var tokenlength=token.value.length;
        
        
        token.row = this.row; //assign current row of jsTokenizer object
        token.column = this.column; //assign current column of jsTokenizer object
        
        this.column += tokenlength; //increase column
        return token; //return token
    
        
    }
    
    function linebreak(token) {
        //just increase row by one and reset column, do not return anything as we are not interested in this token
        this.column = 0;
        this.row += 1;
    }
    function whitespace(token) {
        //just increase row by one and reset column, do not return anything
        this.column += 1 //just increase column counter, but dont return token, we are not interested in it
    }
     function other(token) {
        //just increase row by one and reset column, do not return anything
        this.column += 1 //for everything else, just increase column counter
        //you could alternatively throw error here if you want to make sure that no unknown token is allowed
    }
```
```
var arrayTokens=myTokenizer.returnTokens();
/*calling returnTokens() will return array with all tokens found. 
Every token returned will have the following attributes: 
row: row the token was found. Only populated if column attribute of jsTokenizer object changed in callback functions
column: column the token was found. Only populated if column attribute if jsTokenizer object chnanged in callback functions
name: name of token
value: value of token
regExpression: regExpression used for the token
*/

```



