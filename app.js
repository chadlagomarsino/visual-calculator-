(function (document) { //IIFE, to prevent global variable collision

  //STILL NEED TO FIGURE OUT TO INPUT MULTIDIGIT NUMBERS
  //FIGURE OUT HOW TO ENTER DECIMELS
  //BUILD BASIC display
  //BUILD ANIMATIONS

  'use strict';

  /*
  * Variables / Selectors
  */
  const equations = []; //array of equation objects

  const numBtns = document.getElementsByClassName("btn-num");
  const btn_clear = document.getElementById("btn-clear");
  const btn_plus = document.getElementById("btn-plus");
  const btn_minus = document.getElementById("btn-minus");
  const btn_multiply = document.getElementById("btn-multiply");
  const btn_divide = document.getElementById("btn-divide");
  const btn_equal = document.getElementById("btn-equal");
  const btn_exponent = document.getElementById("btn-exponent");
  const btn_root = document.getElementById("btn-root");
  const btn_decimal = document.getElementById("btn-decimal")
  const btn_leftP = document.getElementById("btn-leftP")
  const btn_rightP = document.getElementById("btn-rightP")

  /*
  * Methods
  */

  //symbols for math operations
  const sym = {
    plus: "+",
    minus: "-",
    multiply: "*",
    divide: "/",
    exponent: "^",
    root: "root",
    decimal: ".",
    leftP: "(",
    rightP: ")",

  }

  function createEquation() {
    const self = {
      symbols: [],
      add(a, b) {
        let x = a + b;
        return x;
      },
      subtract(a, b) {
        let x = a - b;
        return x;
      },
      multiply(a, b) {
        let x = Math.round((a * b) * 100) / 100;
        return x;
      },
      divide(a, b) {
        let x = Math.round((a / b) * 100) / 100;
        return x;
      },
      exponent(a, b) {
        for (let i = 1; i < b; i++) {
          a = a * a;
        }
        return a
      },
      root(a, b) {
        for (let i = 1; i < b; i++) {
          a = a / b;
        }
        return a
      },
      symbolScanLeft(i) {
        for (let j = 1; j <= i; j++) {
          if (self.symbols[i-j] != null && self.symbols[i-j] != undefined) {
            let a = self.symbols[i-j];
            self.symbols[i-j] = null;
            return a;
          }
        }
      },
      symbolScanRight(i) {
        for (let j = 1; j <= (self.symbols.length - i); j++) {
          if (self.symbols[i+j] != null && self.symbols[i+j] != undefined) {
            let b = self.symbols[i+j];
            self.symbols[i+j] = null;
            return b;s
          }
        }
      },
      operate() {
        //run through array looking for "(" AND ")"
        //for(let i = 0; i < self.symbols.length; i++) {
          //if(self.symbols[i] == "(") {
            //for(let i = 0; i < self.symbols.length; i++) {
              //if((self.symbols[i] == ")")) {

              //}
            //}

          //}
        //run through array looking for all ^ and root
        for(let i = 0; i < self.symbols.length; i++) {
          if(self.symbols[i] == "^" || self.symbols[i] == "root" ) {
            let a = self.symbolScanLeft(i);
            let b = self.symbolScanRight(i);
            if(self.symbols[i] == "^") {
              let x = self.exponent(a, b);
              self.symbols[i] = x;
            }
            if(self.symbols[i] == "root") {
              let x = self.root(a, b);
              self.symbols[i] = x;
            }
            //console.log(equations);
          }
        }
        //run through array looking for all * or /
        for(let i = 0; i < self.symbols.length; i++) {
          if(self.symbols[i] == "*" || self.symbols[i] == "/" ) {
            let a = self.symbolScanLeft(i);
            let b = self.symbolScanRight(i);
            if(self.symbols[i] == "*") {
              let x = self.multiply(a, b);
              self.symbols[i] = x;
            }
            if(self.symbols[i] == "/") {
              let x = self.divide(a, b);
              self.symbols[i] = x;
            }
            //console.log(equations);
          }
        }
        //run through array looking for all + or -
        for(let i = 0; i < self.symbols.length; i++) {
          if(self.symbols[i] == "+" || self.symbols[i] == "-" ) {
            let a = self.symbolScanLeft(i);
            let b = self.symbolScanRight(i);
            if(self.symbols[i] == "+") {
              let x = self.add(a, b);
              self.symbols[i] = x;
            }
            if(self.symbols[i] == "-") {
              let x = self.subtract(a, b);
              self.symbols[i] = x;
            }
            //console.log(equations);
          }
        }
        //fetch solution and reset array
        for(let i = 0; i <self.symbols.length; i++) {
          if(self.symbols[i] != null) {
            let answer = self.symbols[i];
            console.log(answer);
            //clear array
            self.symbols.length = 0;
            //insert answer, to allow further operations
            self.symbols.push(answer);

          }
        }
      }
    }
    return self;
  }

  function generateEquation(e) {
    const newEquation = createEquation();
    equations.push(newEquation);
    //Remove eventlistener for previous equation
    btn_equal.removeEventListener('click', equations[equations.length-2].operate);
    //Replace eventlistener for current equation
    btn_equal.addEventListener('click', equations[equations.length-1].operate);
  }

  //check if previous array entry is a number
  function numChecker() {
    if((typeof equations[equations.length-1].symbols.slice(-1)[0]) === (typeof 1)) {
       return true;
     }
  }

  //on button press push to array
  function pushNum(i) {
    //test if next array entry is a multidigit number
    if (numChecker()) {
      //concatinate multidigit number
      let multiNum = `${equations[equations.length-1].symbols.slice(-1)[0]}${i}`;
      //convert from string to number
      multiNum = parseInt(multiNum);
      //remove last array entry
      equations[equations.length-1].symbols.pop();
      //replace with multiNum
      equations[equations.length-1].symbols.push(multiNum);
      //console.log(equations);
    }
    //this is only a single digit number
    else {
    equations[equations.length-1].symbols.push(i);
    //console.log(equations);
    }
  }

  function pushDecimal(sym) {
    equations[equations.length-1].symbols.push(sym.decimal);
    //console.log(equations);
  }

  function pushLeftP(sym) {
    equations[equations.length-1].symbols.push(sym.leftP);
    console.log(equations);
  }

  function pushRightP(sym) {
    equations[equations.length-1].symbols.push(sym.rightP);
    console.log(equations);
  }

  function pushPlus(sym) {
    //prevent user from inputting more than one symbol in a row
    if (numChecker()) {
      equations[equations.length-1].symbols.push(sym.plus);
    }
    //console.log(equations);
  }

  function pushMinus(sym) {
    if (numChecker()) {
      equations[equations.length-1].symbols.push(sym.minus);
    }
    //console.log(equations);
  }

  function pushMultiply(sym) {
    if (numChecker()) {
      equations[equations.length-1].symbols.push(sym.multiply);
    }
    //console.log(equations);
  }

  function pushDivide(sym) {
    if (numChecker()) {
      equations[equations.length-1].symbols.push(sym.divide);
    }
    //console.log(equations);
  }

  function pushExponent(sym) {
    if (numChecker()) {
      equations[equations.length-1].symbols.push(sym.exponent);
    }
    //console.log(equations);
  }

  function pushRoot(sym) {
    if (numChecker()) {
      equations[equations.length-1].symbols.push(sym.root);
    }
    //console.log(equations);
  }

  /*
  * Events / APIs / Initialize
  */

  equations[0] = createEquation();

  //New Equation on Object on Clear. Update
  btn_clear.addEventListener('click', generateEquation);

  //Push number on num button press
  for (let i = 0; i < 10; i++) {
    numBtns[i].addEventListener('click', pushNum.bind(null, i));
  }

  //Push decimal on symbol button press
  btn_decimal.addEventListener('click', pushDecimal.bind(null, sym));

  //Push math symbol on symbol button press
  btn_plus.addEventListener('click', pushPlus.bind(null, sym));
  btn_minus.addEventListener('click', pushMinus.bind(null, sym));
  btn_multiply.addEventListener('click', pushMultiply.bind(null, sym));
  btn_divide.addEventListener('click', pushDivide.bind(null, sym));
  btn_exponent.addEventListener('click', pushExponent.bind(null, sym));
  btn_root.addEventListener('click', pushRoot.bind(null, sym));

  btn_leftP.addEventListener('click', pushLeftP.bind(null, sym));
  btn_rightP.addEventListener('click', pushRightP.bind(null, sym));
  //Operate equation of equal button press
  btn_equal.addEventListener('click', equations[equations.length-1].operate);

  //Retrive answer on ANS button press

}(document));
