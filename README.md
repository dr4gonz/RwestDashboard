# Angular2 Client Dashboard for R/West
Carl Egbert - egbertcarl@gmail.com

Matt Reyes - mreyez@gmail.com

This is an Angular2 webapp with authentication, file storage, and data persistence via Firebase. It's currently connected to a free Firebase account, and could easily be moved to a new one.

### Instructions for setting up Firebase
* create a copy of ng2auth/src/keys_example.ts named 'keys.ts' in the same directory
* Sign in to firebase with your google account (https://firebase.google.com)
* Go to https://console.firebase.google.com and create a project
* click on 'add firebase to your web app'
* copy the appropriate values from the firebase config to your newly created keys.ts

### Instructions for seeding firebase with an admin user
* open ng2auth/src/app/app.routing.ts
* comment out the 'canActivate' line under the 'admin' route (line 24 at time of this writing)
* serve the project on localhost
* navigate to localhost:4200/#/admin in your browser
* create a user and assign it a role of 'Admin'
* uncomment 'canActivate'
* user your new admin user to create more admins or regular users as needed

### Instructions for serving via localhost

* If you don't already have nodejs/npm, install them
* If you don't already have angular-cli installed, run `$ npm install -g angular-cli` (you may need to do this with admin privileges)
* clone the repo
* navigate to InteractiveInterns/ng2auth/ in your shell
* `$ npm install`
* `$ ng s`
* navigate to http://localhost:4200 in your browser
* You will need a firebase user account with the 'admin' role for most functionality; either set this up in the firebase dev console (or talk to somebody who can), or have somebody who already has such an account add you via the application itself.

## Instructions for deployment

* If you don't already have nodejs/npm, install them
* If you don't already have angular-cli installed, run `$ npm install -g angular-cli` (you may need to do this with admin privileges)
* clone the repo
* navigate to InteractiveInterns/ng2auth/ in your shell
* `$ npm install`
* `$ ng build --prod`
* The static files needed for deployment are in the 'dist' folder. The 'out-tsc' folder contains the results of typescript transpilation and is not needed for deployment.
* '.map' files are also unecessary for deployment and should not be uploaded except for debugging purposes
* You will also need to copy mail.php (located in project root) to the deployment folder

### Instructions for adding components

* New components can be created with `$ ng g component < name-of-component >`
* Update app.routing.ts to include the component for a routed, 'main' component, and add it to the links component
* Update app.module to include the component as a directive for child components
* If you want a routed component to be only viewable by authenticated users, make sure the entry in app.routing.ts has the property `canActivate: [AuthGuard]`. If you want the component to only be viewable by those with admin privileges, use AuthGuardAdmin instead of AuthGuard.

### Adding commenting to a component
Add `<app-comment-list [parentKey]="<KEY>"></app-comment-list>` to the component template. Replace <KEY> with the key of the item that will have comments as children. In the case of an object stored in firebase, this will be `<object>.$key`. If you want to create a standalone list of comments, make up your own unique key to pass in.
