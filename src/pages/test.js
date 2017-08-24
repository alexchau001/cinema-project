// 避免全局变量的污染。

(function() {
   var a = 100;
   function fn() {

   }
})()

// URL(input, base);

(function() {
    var time;
    function fn() {

        clearTimeout(time);

        time = setTimeout(function() {
            ajax();
        }, 1000);
        
    }
})()





// var arr = [1, 2, 3, 4, 10, 80, 99];

// // Math.max(10, 20, 30, 50);

// Math.max.apply(null, arr);

// call apply 的区别

// var a = {
//     fn: function(name, age) {
//         console.log(this, name, age);
//     }
// }
// a.fn('张三', 19);     // a 张三, 19

// a.fn.call(null, '李四', 20);        // {} 李四 20

// a.fn.apply(null, ['王五', 21])      // {} 王五 21

// var btns = document.getElementsByTagname('button');  // 3ge 

// var i;

// for (i = 0; i < btns.length; i++) {

//     // btns[i].index = i;
//     (function(i) {
//         btns[i].onClick = function() {
//             // alert(this.index);
//             alert(i);
//         }
//     })(i)
    
// }





// function fn() {
//     var a = 100;
//     return function() {
//         console.log(a);
//     }
// }


// var fn1 = fn();
// var a = 2000;
// fn1();


// js 全局作用域， 函数作用域

// var a = 100;

// function Fn1() {

//     var b = 200;

//     function Fn2() {
//         var c = 300;
//         console.log(a);
//         console.log(b);
//         console.log(c);
//     }
//     Fn2();
// }

// Fn1();
// fn();


// 作用域链
// 1. 自由变量       函数内部没有声明的变量，就是自由变量。
// 2. 作用域
// 3. 闭包



// es6 let const 块级作用域，  es6 之前，js里面是没有块级作用域的概念

// if (true) {
//     var a = 100;
// }
// console.log(a);


// function fn () {
//   console.log(asdfasf)
// }

// // this 在你的方法定义的时候，是不确定的，只有在调用的时候才能确定 this 是谁。

// var a = {
//     name: 'zhangsan',
//     fn: function() {
//         console.log(this.name);
//     }
// }

// // 对象的属性的方式调用， this 就指向这个对象
// a.fn();         // zhangsan

// // call apply bind
// a.fn.call({name: '李四'});        // 李四
// a.fn.apply({name: '王五'});       // 王五

// // 方法前面任何东西都没有的调用，调用的this 就指向 window
// var fn1 = a.fn;
// fn1();              // this  === window



// // // 变量提升
// // var a;  
// // console.log(a);     // undefined
// // a = 100;
// // console.log(a);     // 100


// // // 函数声明和函数表达式的区别



// // // var fn1;

// // // fn();                   // fn

// // // fn1();                  // fn1   undefined

// // // function fn() {
// // //     // 函数声明
// // //     console.log('fn');
// // // }

// // // fn1 = function() {
// // //     // 函数表达式
// // //     console.log('fn1');
// // // }

