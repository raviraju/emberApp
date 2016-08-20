# Super-rentals
Sample Ember App using tutorial guide https://guides.emberjs.com/v2.7.0/tutorial/ember-cli/

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying
http://ravi-ember-app.surge.sh/

* rm -rf dist
* ember build --environment=development
* cd dist
* cp index.html 200.html
* surge ravi-ember-app.surge.sh/



