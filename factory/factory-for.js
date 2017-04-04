

function containerFor(Ember) {
  let User = Ember.Object.extend();
  let registry = new Ember.Registry();

  registry.register('user:apple', User)
  return registry.container();
}

const assert = require('assert');

const newContainer = containerFor(require(process.env.HOME + '/src/emberjs/ember.js/dist/ember.debug'));
const oldContainer = containerFor(require(process.env.HOME + '/src/emberjs/ember.js-oldest/dist/ember.debug'));
const oldestContainer = containerFor(require(process.env.HOME + '/src/emberjs/ember.js-old/dist/ember.debug'));

assert.ok(newContainer.factoryFor('user:apple').create());
assert.ok(oldContainer.factoryFor('user:apple').create());
assert.ok(oldestContainer.factoryFor('user:apple').create());

require('do-you-even-bench')([
  { name: 'factoryFor (new)',    fn() { return newContainer.factoryFor('user:apple').create();    }},
  { name: 'factoryFor (old)',    fn() { return oldContainer.factoryFor('user:apple').create();    }},
  { name: 'factoryFor (oldest)', fn() { return oldestContainer.factoryFor('user:apple').create(); }},
]);
