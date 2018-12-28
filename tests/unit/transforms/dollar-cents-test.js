import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('transform:dollar-cents', 'Unit | Transform | dollar cents', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let transform = this.owner.lookup('transform:dollar-cents');
    assert.ok(transform);
  });

  test('it deserializes correctly', function(assert) {
    let transform = this.owner.lookup('transform:dollar-cents');
    let value = transform.deserialize(1000);    
    assert.equal(value, 10);
  });

  test('it serializes correctly', function(assert) {
    let transform = this.owner.lookup('transform:dollar-cents');
    let value = transform.serialize(10.25)
    assert.equal(value, 1025);
  });
});
