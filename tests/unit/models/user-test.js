import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

module('Unit | Model | user', function(hooks) {
  setupTest(hooks);

  let originalDateNow;

  hooks.beforeEach(function() {

    originalDateNow = Object.getOwnPropertyDescriptor(Date, 'now');
    Object.defineProperty(Date, 'now', {
      value: function() { 
        return new Date('1/1/2018');
      }
    });
  });

  hooks.afterEach(function() {
    Object.defineProperty(Date, 'now', originalDateNow);
  });

   

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = run(() => store.createRecord('user', {}));
    assert.ok(model);
  });

  test('it calculates user\'s personal info properly', function(assert) {
    //assert.expect(4);
    let store = this.owner.lookup('service:store');
    let model = run(() => store.createRecord('user', {
      firstName: 'Bob',
      lastName: 'Builder',
      dateOfBirth: '1/1/1975'

    }));    
    
    let model2 = run(() => store.createRecord('user', {
      firstName: 'Bob',
      lastName: 'Builder',
      dateOfBirth: '1/1/1975'
  
    }));

    assert.ok(model.get('isOverEighteen'), 'He is over 18');
    assert.equal(model.fullName, model2.fullName);
    assert.equal(model.get('fullName'), model2.get('fullName'), 'same full name');
    assert.equal(model.get('age'), 43, 'He is 43');

  });

  test('it calculates user\'s financial info properly', function(assert) {
    //assert.expect(4);
    let store = this.owner.lookup('service:store');
    let model = run(() => store.createRecord('user', {

      currentSavingsAmount: 10000,
      currentCheckingAmount: 90000000      
    }));    
    
    let model2 = run(() => store.createRecord('user', {

      currentSavingsAmount: 10000,
      currentCheckingAmount: 90000012      
    }));

    assert.equal(model.get('currentSavingsInCents'), 100);
    assert.equal(model.get('currentCheckingInCents'), 900000);
    model2.set('currentSavingsInCent', 45323);
    assert.equal(model2.get('currentSavingsInCent'), 45323);
    model.set('currentSavingsInCent', 23);
    assert.equal(model.get('currentSavingsInCent'), 23);
    

  });
});
