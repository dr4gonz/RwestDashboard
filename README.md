# Angular2 Auth Mockup for R/West

This is an Angular2 webapp with authentication via Auth0. It's currently set up with Matt Reyes' trial account at Auth0; it can be moved to another account by registering for one at Auth0 and then changing the client ID and client secret in src/app/auth.service.ts.


### Instructions for serving via localhost

* If you don't already have nodejs/npm, install them
* If you don't already have angular-cli installed, run '$ npm install -g angular-cli' (you may need to do this with admin privileges)
* clone the repo
* navigate to InteractiveInterns/ng2auth/ in your shell
* $ npm install
* $ ng s
* navigate to http://localhost:4200 in your browser

### Instructions for adding components

* New components can be created with '$ ng g component < name-of-component >'
* Update app.routing.ts to include the component
* If you want this component to be only viewable by authenticated users, make sure the entry in app.routing.ts has the property 'canActivate: [AuthGuard]'
