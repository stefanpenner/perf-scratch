print('---test---')

const pojo = { };
pojo.apple = 'asf'
pojo.apple = 1.1
pojo.apple = 'asf'
pojo.apple = 1
pojo.apple = 'asf'

print('----test---')
const cache = { };
%DebugPrint(cache);
cache.orange = 1.1
cache.orange = function() { }
delete cache.orange
cache.foo = 1;
print('----test---');
%DebugPrint(cache);
