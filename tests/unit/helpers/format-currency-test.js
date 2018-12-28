import { formatCurrency } from 'lets-write-some-tests/helpers/format-currency';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | format-currency', function(hooks) {
  setupTest(hooks);


  test('it format 2 digits', function(assert) {
    let result = formatCurrency([42]);
    assert.equal(result, '$42.00', 'it format currency properly');
  });

  test('it format many digits', function(assert) {
    let result = formatCurrency([42000,42]);
    assert.equal(result, '$42,000.00', 'it format currency properly');
  });
});
