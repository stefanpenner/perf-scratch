
function Desc() { }

var Meta = (function(){
  var a =1;

  function Meta() {
    //this.watching = {};
    //this.cache = {};
    //this.source = obj;
    //this.obj = obj;
  }

Meta.prototype = {
  descs: void 0
};
 //   descs: null
 //   //deps: null,
 //   //watching: null,
 //   //listeners: null,
 //   //cache: null,
 //   //source: null,
 //   //mixins: null,
 //   //bindings: null,
 //   //chains: null,
 //   //chainWatchers: null,
 //   //values: null,
 //   //proto: null
 // };

  return Meta;
}());


function Foo() {

}

function Bar() {

}


var hopeToCompile = (function(){
  var a = 0;
  return function(i){
    return 1 + i;
  }
})();

(function barrr(){
  var a;
  var count =0;

  for (var b=0; b < 1000; b++) {
    hopeToCompile(b);
    a = new Meta();
  }

  //delete a.cache;

 for (var b=0; b < 10; b++) {
   hopeToCompile(a);
 }

  ////for (var y=0; y < 10000; y++) {
  //  a = new Meta();
  //  delete  a.values;
  //  a.obj = Foo;
  //  a.chains = 'foo' + (count++ % 1);
  ////}

  //for( var x= 0; x< 10000; x++){
  //  hopeToCompile(a);
  //}

  //for (var i=0; i < 10000; i++) {
  //  a = new Meta();
  //  a.obj = Bar;
  //  a.chains = 'foo' + (count++ % 1);
  //}
}());
