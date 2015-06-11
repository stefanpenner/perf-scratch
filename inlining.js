function foo(o) {
  return 1+1
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
  asdfasdfa:;
}

var fast = { hi: 1 };
var slow = { hi: 1 };

delete slow.hi;

var count = 0;
(function bar() {
  while(count < 10000) {
    count++;
    foo(fast);
  }

  while(count < 20000) {
    count++;
    foo(slow);
  }



}());
