//1) How would you check if a number is an integer?
// To check if a number is a decimal or an integer, check to see if there is a remainder left when you divide by 1

function isInt(num) {
  return num % 1 === 0;
};

console.log(isInt(4)); //true
console.log(isInt(4.4)); //false
console.log(isInt(0.2)); //false

//-----------------------------

// //2) What will the following code output?
(function() {
  var a = b = 5;
})();

console.log(b); //5

/*

It looks like a and b are within the scope of the anonymous function. Variables declared within a function are not accessible outside of it.

The output will be 5 because var a = b = 5; is interpreted as:
  var a = b;
  b = 5;

b is in the global scope because it is not declared within the anonymous function with a var.

*/

//-----------------------------

//3) Write a function that would allow you to do this:

/*
  You can crate a closure to keep the value of 'a' even after the inner function is return. 
  The inner function that is being returned is created within an outer function, making it a 'closure', and it has access to the variables within the outer function, in this case variable 'a'.
*/

function multiply(a) {
  return function(b) {
    return a * b;
  };
};

console.log(multiply(5)(6)); 

//-----------------------------

//4) When would you use the bind function?

/*
  A good use of the bind function is when you have a particular function that you want to call with a specific 'this' value. You can then use 'bind' to pass a specific object to a function that uses a 'this' reference.
*/

function fullName() {
  return "Hello, this is " + this.first + " " + this.last;
}

console.log(fullName()); // Hello this is undefined undefined

//create a person object and pass its value to the fullName function
var person = {
  first: "Foo",
  last: "Bar"
};

console.log(fullName.bind(person)()); // Hello this is Foo Bar


//-----------------------------

// 5) What does "use strict" do?

/*
  The "use strict" literal is entered at the top of a JavaScript program or at the top of a function and it helps you write safer JavaScript code by throwing an error if a global variable is created by mistake. 
*/

//For example, the following program will throw an error:
function doSomething(val) {
  "use strict";
  x = val + 10;
};

//It will throw an error becasue x was not defined and it is being set to some value in the global scope, which isnt allowed with "use strict" 
function doSomething(val) {
  "use strict";
  var x = val + 10; // adding var will fix the error
};

//-----------------------------

// 6) What is the difference between = , == and === ?

/*
  =   -  assignment operator

          ex:
            var x = 1; //setting variable x to the value of 1

  ==  -  performs implcit type conversion to check if values are equal to each other.
         it will convert the values to true or false boolean values and then compare them.

        ex (bad implicit type conversions):
          "1" == 1           //true
          true == 1          //true
          [] == false        //true
          "" == false        //true
          undefined == null  //true

  ===  -  has no type conversions, just checks both values and compares

        ex:
          "1" == 1           //false
          true == 1          //false
          [] == false        //false
          "" == false        //false
          undefined == null  //false
*/

//-----------------------------

// 7) How would you add your own method to the Array object so the following code would work?

var arr = [1, 2, 3, 4, 5];
var avg = arr.average();
console.log(avg);

//Javascript is not class based, but it is a 'prototype-based' lanugage. This means that each object is linked to another object, its prototype, and it inherits its methods. We need to add a method to the global Array object, and we will do this by modifying the Array prototype.

Array.prototype.average = function(){
  //calculate sum
  var sum = this.reduce(function(prev, cur){
    return prev + cur;
  });
  return sum / this.length;
};

var arr = [1, 2, 3, 4, 5];
var avg = arr.average();
console.log(avg); //3

//Now every array that is created wil have the average method inherited along with every other Array method. But, you need to be careful with modifying the prototype of an object, because you can mistakenly overwrite a common method.

//-----------------------------

// 8) Explain what a callback function is and provide a simple example.

//A callback function is a function that is passed to another function as an argument and is executed after some operation has been completed. 
//Below is an example of a simple callback function that logs to the console 'after' some operations have been completed.

function modifyArray(arr, callback) {
  //do something to arr here
  arr.push(100);
  //then execute the callback function that was passed
  callback();
};

var arr = [1, 2, 3, 4, 5];

modifyArray(arr, function() {
  console.log("array has been modified", arr);
});

//-----------------------------

//9) What will the following code output?

0.1 + 0.2 === 3; //false

//This will return false because of 'floating point' errors in internally representing certain numbers. 0.1 + 0.2 does not nicely come out to 0.3 because the result is actually 0.30000000000000004 because the computer cannot internally represent the correct number.
//One solution to get around this problem is to round the results when doing arithmetic with decimals.

//-----------------------------

//10) How would you create a private variable in JavaScript

//To create a private variable in JavaScript that cannot be changed you need to create it as a local variable within a function. Even if the function is executed the variable cannot be accessed outside of the function:

//ex:
function func() {
  var priv = "secret code";
}
console.log(priv); //throws error

//To access the variable, a helper function would need to be created that returns the private variable.

function func() {
  var priv = "secret code";
  return function() {
    return priv;
  };
};

var getPriv = func();
console.log(getPriv); //secret code


