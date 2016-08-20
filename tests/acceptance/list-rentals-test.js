import { test } from 'qunit';
import moduleForAcceptance from 'super-rentals/tests/helpers/module-for-acceptance';
import Ember from 'ember';

let StubMapsService = Ember.Service.extend({
  getMapElement() {
    return document.createElement('div');
  }
});

moduleForAcceptance('Acceptance | list rentals', {
  beforeEach() {
    this.application.register('service:stubMaps', StubMapsService);
    this.application.inject('component:location-map', 'maps', 'service:stubMaps');
  }
});

//moduleForAcceptance('Acceptance | list rentals');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('should list available rentals.', function (assert) {
    visit('/'); //The visit helper loads the route specified for the given URL.
  /*The andThen helper waits for all previously called test helpers to complete
  before executing the function you provide it. In this case, we need to wait
  for the page to load after visit, so that we can assert that the
  listings are displayed.
  */andThen(function () {
    //The test assumes that each rental element will have a class called listing
    assert.equal(find('.listing').length, 3, 'should see 3 listings');
  });
});
/*For the next two tests, we want to verify that clicking the about and contact
page links successfully load the proper URLs. We'll use the click helper to
simulate a user clicking these links. After the new screen loads, we just verify
that the new URL matches our expectation using the currentURL helper.
*/
test('should link to information about the company.', function (assert) {
  visit('/');
  click('a:contains("About")');
  andThen(function () {
    assert.equal(currentURL(), '/about', 'should navigate to about');
  });
});

test('should link to contact information', function (assert) {
  visit('/');
  click('a:contains("Contact")');
  andThen(function () {
    assert.equal(currentURL(), '/contact', 'should navigate to contact');
  });
});

/* we can call two asynchronous test helpers in a row without needing to use
andThen or a promise. This is because each asynchronous test helper is made
to wait until other test helpers are complete.
*/


/*test that we can filter the list down according to a city search criteria.
We anticipate having an input field in a container with a class of list-filter.
We will fill out "Seattle" as the search criteria in that field and send a
key up event to trigger our filtering action. Since we control our data,
we know that there is only one rental with a city of "Seattle",
so we assert that the number of listings is one and that its
location is "Seattle".*/
test('should filter the list of rentals by city.', function (assert) {
  visit('/');
  fillIn('.list-filter input', 'seattle');
  keyEvent('.list-filter input', 'keyup', 69);
  andThen(function () {
    assert.equal(find('.listing').length, 1, 'should show 1 listing');
    assert.equal(find('.listing .location:contains("Seattle")').length, 1, 'should contain 1 listing with location Seattle');
  });
});
