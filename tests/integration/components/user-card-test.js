import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, getContext, render, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
//import Service from '@ember/service';
//import { get, set } from '@ember/object';
import stubbedService from '../../helpers/stub-service';

//this is helper funciton to short hand this.element.querySelector
function query(selector) {
  return getContext().element.querySelector(selector);
  //getContext() return this
}

function getElementText(selector) {
  return query(selector).textContent.trim();
}

module('Integration | Component | user-card', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    let dummyUser = {
      id:1,
      fullName: 'Billy Boy',
      email: 'abc@123.com',
      dateOfBirth: new Date('1/1/1971'), 
      currentSavingsInCents: 1000,
      currentCheckingInCents: 1000
      
    } 
    this.set('user', dummyUser);    
  });

  test('it toggle user information', async function(assert) {

    await render(hbs`{{user-card user=user}}`);
    assert.equal(this.element.querySelector('.md-subhead').textContent.trim(), 'Name: Billy Boy');
    await click('.md-button');
    assert.ok(this.element.querySelector('.user-content'), 'user information is shown after toggle');
    let userFields = this.element.querySelectorAll('h5');
    assert.equal(userFields[0].textContent.trim(), 'Email: abc@123.com');
    assert.ok(userFields.length > 0);

    // await click('.md-button');
    // assert.notOk(this.element.querySelector('.user-content'), 'user information is hidden after toggle');

    //assert.async();
    

    //assert.equal(this.element.textContent.trim(), '');

    //Template block usage:
    // await render(hbs`
    //   {{#user-card}}
    //     template block text
    //   {{/user-card}}
    // `);

    // assert.equal(this.element.textContent.trim(), 'template block text');
  });

  // test('it shows correct user information initially', async function(assert) {
  //   let dummyUser = {
  //     id:1,
  //     fullName: 'Billy Boy',
  //     email: 'abc@123.com',
  //     dateOfBirth: new Date('1/1/1971'), 
  //     currentSavingsInCents: 1000,
  //     currentCheckingInCents: 1000      
  //   };

  //   this.set('user', dummyUser);

  //   let stubbedService = Service.extend({
  //     setCurrentSelection(type, id) {
       
  //     },
    
  //     clearSelection() {
  
  //     },
    
  //     getCurrentSelection() {
  //       return 'user-1';
  //     }
  //   });

  //   this.owner.register('service:card-selector', stubbedService);

  //   await render(hbs`{{user-card user=user}}`);

  //   assert.ok(this.element.querySelector('.user-content'), 'user information is shown');
  

  //   //assert.async();

  // });

  test('it shows correct user information initially using helper/stub-service', async function(assert) {
   
     stubbedService('card-selector', {
      setCurrentSelection(type, id) {
        this._type = type;
        this._id = id;       
      },
    
      clearSelection() {
  
      },
    
      getCurrentSelection() {
        return 'user-1';
      }
    });

    //this.owner.register('service:card-selector', stubbedService);

    await render(hbs`{{user-card user=user}}`);
    assert.equal(this.get('user').id, 1);

    assert.ok(this.element.querySelector('.user-content'), 'user information is shown');
  

    //assert.async();

  });

  test('it does not show correct user information initially using helper/stub-service', 
        async function(assert) {
   
    stubbedService('card-selector', {
     setCurrentSelection(type, id) {
      this._type = type;
      this._id = id;
     },
   
     clearSelection() {
 
     },
   
     getCurrentSelection() {
       return 'user-2';
     }
   });

   //this.owner.register('service:card-selector', stubbedService);

   await render(hbs`{{user-card user=user}}`);

   assert.notOk(this.element.querySelector('.user-content'), 'user information is shown');
 

   //assert.async();

 });
 
 test('it saves on enter with user note', async function(assert) {
   assert.expect(); //this howto test funciton is called.

    //here set up the saveUser function, do not care what is it, just test it is called when hit enter
    this.set('saveUser', function(user){
      assert.deepEqual(user, this.get('user'), 'user is sent');
      assert.equal(user.notes, 'here the notes', 'notes is sent');
    });

    stubbedService('card-selector', {
      setCurrentSelection(type='user', id=1) {
        assert.notOk(true, 'setCurrentSelection should not be called');
        this._type = type;
        this._id = id;
      },
    
      clearSelection() {
        assert.ok(true, 'clearSelection is called');
      },
    
      getCurrentSelection() {
        return 'user-1';
        //return `${this._type}-${this._id}`;
      }
    });

    await render(hbs`{{user-card user=user saveUser=(action saveUser)}}`);
    await fillIn('input[name="notes"]', 'here the notes');
    await triggerKeyEvent('input[name="notes"]', 'keydown', 13);

    //here is jquery that is equivelent to above
    //$('input[name="notes"]').val('here the notes').trigger('change');
    //this is the vanila javascript how to enter value and test
    // this.element.querySelector('input[name="notes"]').value = 'here the notes';
    // this.element.querySelector('input[name="notes"]').dispatchEvent(new Event('change'));
    
    //assert.async(); //this will make the interactive test


 });

 test('user number is shown if present', async function(assert){
   this.set('index', 0);
   this.set('user.isOverEighteen', true);

   await render(hbs`{{user-card user=user index=index}}`);
   assert.ok(query('.md-headline'));
   //assert.equal(this.element.querySelector('.md-headline').textContent.trim(), 'User number 1');
   assert.equal(getElementText('.md-headline'), 'User number 1');

   await click('.md-button');
   assert.ok(this.element.querySelector('.age-alert'));


 });
});
