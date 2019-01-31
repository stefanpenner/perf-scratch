//
// $ node-set v8
//   ✓ node.current = v8.9.4
// $ node --allow-natives-syntax when-did-object-create-null-become-dict.js
// 0x13e935b8a821 <Object map = 0x13e921986669> <-- same map
// 0x13e935b8a8c9 <Object map = 0x13e921986669> <-- same map
//
//
// $ node-set v7
//   ✓ node.current = v7.9.0
// $ node --allow-natives-syntax when-did-object-create-null-become-dict.js
// 0x2b22adc29a91 <an Object with map 0x1c67fe8069d9>  <-- differing maps
// 0x2b22adc29ac9 <an Object with map 0x1c67fe82cf19>  <-- differing maps

%DebugPrint(Object.create(null));
const DICT = Object.create(null);
DICT.a = 5;
DICT.b = 'hi';
delete DICT.a;
%DebugPrint(DICT);
