import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | users/show', function(hooks) {
  setupTest(hooks);

  test('it setups user model', function(assert) {
    let route = this.owner.lookup('route:users/show');
    let controller = {};
    let dummyModel = {
      firstName: 'foo',
      lastName: 'bar'    
    }
    route.setupController(controller, dummyModel);
    assert.deepEqual(controller.user, dummyModel, 'it setups users model correctly');
  });
});
