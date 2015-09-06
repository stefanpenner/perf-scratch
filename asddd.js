function acceptExpression(node, env, scope) {
  var ret = { value: null };

  // Primitive literals are unambiguously non-array representations of
  // themselves.
  if (typeof node !== 'object' || node === null) {
    ret.value = node;
  } else {
    ret.value = evaluateNode(node, env, scope);
  }

  return ret;
}

function evaluateNode(node, env, scope) {
  switch (node[0]) {
    // can be used by manualElement
    case 'value':   return 'hello';
  }

  return 'bro';
}

function loop(input, count) {
  for (var i =0; i < count; i++) {
    acceptExpression(input, {}, {});
  }
}

function foo() {
  loop(1, 100);
  loop([1,2,3], 100);
  %OptimizeFunctionOnNextCall(acceptExpression);
  loop([], 1);
  %OptimizeFunctionOnNextCall(acceptExpression);
  loop([1,2,3], 100);
}

foo();
