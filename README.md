# Angular2 Auth Mockup for R/West

This is an Angular2 webapp with authentication, file storage, and data persistence via Firebase. It's currently connected to a free Firebase account, and could easily be moved to a new one.

### Instructions for serving via localhost

* If you don't already have nodejs/npm, install them
* If you don't already have angular-cli installed, run '$ npm install -g angular-cli' (you may need to do this with admin privileges)
* clone the repo
* navigate to InteractiveInterns/ng2auth/ in your shell
* $ npm install
* $ ng s
* navigate to http://localhost:4200 in your browser
* You will need a firebase user account with the 'admin' role for most functionality; either set this up in the firebase dev console (or talk to somebody who can), or have somebody who already has such an account add you via the application itself.

### Instructions for adding components

* New components can be created with '$ ng g component < name-of-component >'
* Update app.routing.ts to include the component for a routed, 'main' component, and add it to the links component
* Update app.module to include the component as a directive for child components
* If you want a routed component to be only viewable by authenticated users, make sure the entry in app.routing.ts has the property 'canActivate: [AuthGuard]'
