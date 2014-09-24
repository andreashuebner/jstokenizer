QUnit.module( "jsTokenizer constructor" );

QUnit.test( "Initializing jsTokenizer without new should through error", function() {
     
       throws(
        function() {
            var myTokenizer=jsTokenizer();
        },
        function(error) {
            
            return error.message === "jsTokenizer construction function needs to be called with new";
        }
    );
     
    });
    
QUnit.test("After initializing jsTokenizer, variable is instance of jsTokenizer",function(assert) {

    var myTokenizer=new jsTokenizer();
    assert.ok(myTokenizer instanceof jsTokenizer,"Initializing myTokenizer with jsTokenizer construction function should result in jsTokenizer being instance of jsTokenizer");
    
});

QUnit.module( "jsTokenizer addToken function" );
QUnit.test( "Calling addToken function with non string as first parameter should throw error", function() {
     
       throws(
        function() {
            var myTokenizer= new jsTokenizer();
            myTokenizer.addToken(5,"\\d+","","");
        },
        function(error) {
            
            return error.message === "addToken function expects string as first parameter";
        }
    );
     
    });
    
    QUnit.test( "Calling addToken function with non valid regular Expression as second parameter should throw error", function() {
     
       throws(
        function() {
            var myTokenizer= new jsTokenizer();
            myTokenizer.addToken("identifier");
        },
        function(error) {
            
            return error.message === "addToken function expects valid regular expression as second parameter";
        }
    );
     
    });
    
    QUnit.test( "Calling addToken function with non valid regular Expression flags as third parameter or alternatively just empty string should throw error", function() {
     
       throws(
        function() {
            var myTokenizer= new jsTokenizer();
            myTokenizer.addToken("identifier","\\d+");
        },
        function(error) {
            
            return error.message === "addToken function expects valid regular Expression flags as third parameter (or alternatively just an empty string)";
        }
    );
     
    });
    
    QUnit.test( "Calling addToken function without either empty string as fourth parameter or valid callbackFunction should throw an error", function() {
     
       throws(
        function() {
            var myTokenizer= new jsTokenizer();
            myTokenizer.addToken("identifier","\\d+","",4);
        },
        function(error) {
            
            return error.message === "addToken function expects as fourth parameter (callback function) either empty string or valid callback function";
        }
    );
     
    });
    
    QUnit.module( "jsTokenizer parsing text" );
    
    function keyword(token) {
    
        var tokenlength=token.value.length;
        
        
        token.row = this.row; //assign current row of jsTokenizer object
        token.column = this.column; //assign current column of jsTokenizer object
        
        this.column += tokenlength; //increase column
        return token; //return token
    
        
    }
    function equalsign(token) {
    
        var tokenlength=token.value.length;
        
        
        token.row = this.row; //assign current row of jsTokenizer object
        token.column = this.column; //assign current column of jsTokenizer object
        
        this.column += tokenlength; //increase column
        return token; //return token
    
        
    }
    
    function linebreak(token) {
        //just increase row by one and reset column, do not return anything
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
    }
    QUnit.test("Parsing SQL string",function(assert) {
    //create test string for parsing
    var sqlString="";
    sqlString +=" Select name, age, value from tbl_test where";
    sqlString +="\n";
    sqlString += " name = 'Andreas'";
    
    
   
    

    var myTokenizer=new jsTokenizer();
    myTokenizer.addToken("keyword","select|from","i",keyword); //add reg expression for keyword token, ignoring case with callback function keyword
    myTokenizer.addToken("linebreak","\n","",linebreak);
    myTokenizer.addToken("equal","=","",equalsign);
    myTokenizer.addToken("whitespace","\\s","",whitespace);
    myTokenizer.addToken("other",".","",other); 
    myTokenizer.tokenizeText(sqlString);
    var arrayTokens=myTokenizer.returnTokens();
    
    //at row 0, column 1 we expect token with value "Select" and name "keyword"
    assert.ok(arrayTokens[0].name === "keyword","first token should have name attribute 'keywords'");
    assert.ok(arrayTokens[0].value === "Select","first token should have value attribute 'Select'");
    assert.ok(arrayTokens[0].row === 0,"first token should be found in row 0");
    assert.ok(arrayTokens[0].column === 1,"first token should be found in column 1");
    
    //at row 0, column 25 we expect token with value "from" and name "keyword"
    assert.ok(arrayTokens[1].name === "keyword","second token should have name attribute 'keywords'");
    assert.ok(arrayTokens[1].value === "from","second token should have value attribute 'Select'");
    assert.ok(arrayTokens[1].row === 0,"second token should be found in row 0");
    assert.ok(arrayTokens[1].column === 25,"second token should be found in column 25");
    
    //at row 1, column 6 we expect token with value "=" and name "equal"
    assert.ok(arrayTokens[2].name === "equal","third token should have name attribute 'keywords'");
    assert.ok(arrayTokens[2].value === "=","third token should have value attribute 'Select'");
    assert.ok(arrayTokens[2].row === 1,"third token should be found in row 0");
    assert.ok(arrayTokens[2].column === 6,"third token should be found in column 25");
    
    
    
    
    
    
});
    
    
    
    






