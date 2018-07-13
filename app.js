(function (document) { //IIFE, to prevent global variable collision

  //STILL NEED TO FIGURE OUT TO INPUT MULTIDIGIT NUMBERS
  //FIGURE OUT HOW TO ENTER DECIMELS
  //BUILD BASIC display
  //BUILD ANIMATIONS

  'use strict';

  /*
  * Variables / Selectors
  */

  const π = 3.1415;
  const e = 2.7182;

  //select DOM elements
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll("button.btn");
  // const regex_exp = /[\d]/;

  /*
  * Methods
  */

  function operate() {    
    //if there is an a power sign
    if(display.value.includes("^")) {
      let base = display.value.slice((display.value.indexOf("^") - 1),
      display.value.indexOf("^"));
      let exponent = display.value.slice((display.value.indexOf("^") + 1),
      (display.value.indexOf("^") + 2));
      let exp_value = eval("Math.pow(" + base + "," + exponent + ")");
      //console.log(display.value);
      display.value = display.value.replace(base + "^" + exponent, exp_value);
      //console.log(display.value);
    }
      //check if value behind the ^ is a digit or pi, e, or i
      //enable i
    try {
    //look for divide by 0 error
    if (display.value.includes("/0")) {
      throw new SyntaxError("CANNOT DIVIDE BY ZERO");
    }
    display.value = eval(display.value);
    }
    catch(err) {
      console.log(err);
      display.value = "Syntax Error";

    }
  }

  function clear() {
    display.value = "";
  }

  function backspace() {
    let display_array = display.value.split("").slice(0, -1);
    display.value = display_array.join("")
  }

  function sin() {
  display.value = Math.round((Math.cos(display.value) * 100)) / 100;
  }

  function cos() {
  display.value = Math.round((Math.cos(display.value) * 100)) / 100;
  }

  function tan() {
  display.value = Math.round((Math.cos(display.value) * 100)) / 100;
  }

  function log() {
  display.value = Math.round((Math.log(display.value) * 100)) / 100;
  }

  function ln() {
  display.value = Math.round((Math.ln(display.value) * 100)) / 100;
  }

  function exponent() {
  display.value += "^";
  }

  function squareRoot() {
  display.value = Math.round((Math.sqrt(display.value) * 100)) / 100;
  }

  /*
  * Events / APIs / Initialize
  */

  //add eventlisteners to all buttons in nodeList
  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      if (button.textContent != "=" &&
      button.textContent != "CE" &&
      button.textContent != "BACK" &&
      button.textContent != "√" &&
      button.textContent != "±"  &&
      button.textContent != "sin" &&
      button.textContent != "cos" &&
      button.textContent != "tan" &&
      button.textContent != "log" &&
      button.textContent != "ln" &&
      button.textContent != "x^" &&
      button.textContent != "RAD" &&
      button.textContent != "DEG") {
        display.value += button.textContent;
      }
      else if (button.textContent == "CE") {
        clear();
      }
      else if (button.textContent == "BACK") {
        backspace();
      }
      else if (button.textContent == "="){
        operate();
      }
      else if (button.textContent == "sin"){
        sin();
      }
      else if (button.textContent == "cos"){
        cos();
      }
      else if (button.textContent == "tan"){
        tan();
      }
      else if (button.textContent == "log"){
        log();
      }
      else if (button.textContent == "ln"){
        ln();
      }
      else if (button.textContent == "x^"){
        exponent();
      }
      else if (button.textContent == "√"){
        squareRoot();
      }
    })
  });



}(document));
