Project-Barbosa
===============
[Live Demo](http://project-barbosa.herokuapp.com/)

#Installation:

Note: You may need to sudo npm install commands that use the -g flag.

1. Clone the git repo `git@github.com:caseyvill/Project-Barbosa.git`
2. Install [Node.js](http://nodejs.org/)
3. Install all the modules necessary with `npm install`. This reads the [package.json](package.json) file and downloads everything necessary.
4. Install [nodemon](http://nodemon.io/) with `npm install -g nodemon`. This automatically reloads the node app when you save changes to a file.
5. Install [Ember-tools](https://github.com/rpflorence/ember-tools) with `npm install -g ember-tools` for building `application.js` (i.e. Make the Ember webpage appear).
6. Install [node-inspector](https://github.com/node-inspector/node-inspector) to help with debugging (optional). Cmd: `npm install -g node-inspector`

###Additional Installation For Windows 7/8:

1. Needs Python v2.7.x (and make sure directory is added to path) - http://www.python.org/download/releases/2.7.3/#download
2. Visual Studio C++ 2012 Express (Recommended) - http://go.microsoft.com/?linkid=9816758
3. Install Win32/64 OpenSSL (Non-Light Version) -http://slproweb.com/products/Win32OpenSSL.html
	-Must be installed to default directory location of C:\OpenSSL-Win32 (or 64)
	-When installing OpenSSL, you must tell it to put DLLs in  The Windows system directory  to avoid  The specified module could not be found.  errors.
	-Add C:\OpenSSL-Win32 (or 64) to the path.

# Running and Testing

##Run app
1. Start the Node Server (with nodemon) `npm start` or `nodemon app.js`
2. Start mongo `mongod`
3. Watch ember files for changing `ember build -w` (On your first time run `ember build`)
4. Go to the site that Node says it's running. Default: `localhost:3000`

##Run tests
Run the command `npm test` to run the mocha tests.

_Note_: "Pending" tests simply have a stub and need to be filled out. Normally working as intended, but still check the code.

## Tips
* Protip: Use `mocha --reporter landing` to have a fun looking reporter.
* Node-inspector can be used as a debugger, make sure to use the debug flag
'nodemon --debug app.js' Then in a new terminal run 'node-inspector' to start the debugger and open the link provided by the terminal to view the debugger. It should be a webpage with the Inspector from Chrome.

* If you're missing a package run `npm install` and it'll download them for you. Watch out for this when new branches are merged into master!

# Developer Workflow/How to Contribute
Assuming you have followed the instructions on installation and have run it once.

We are following a [Feature Branch Workflow](https://www.atlassian.com/git/workflows#!workflow-feature-branch)

1. Check for updates on master, as you always want to be up-to-date.
2. If you don't have something to work on, look at Trello and assign yourself to a task. If you only want to do part of what's on the card, split the card up and assign yourself to do the new card.
3. When working on a new feature, create a new branch named based on the feature it adds. eg: `ember-js`
4. Work on your feature, commit (locally) regularly! (Don't forget to add tests either)
**NOTE:** Make sure if you add an npm dependency to update this README and the package.json by running the command `npm install <name> --save`. More info [here](https://www.npmjs.org/doc/install.html)
5. When you're done working for the day, push your branch to Github. The Master branch will always be working, feature branches can break

###Finishing your feature
1. When your feature is 'done', push the branch to github. 
2. Go to the github website and make a pull request.
3. Ask someone to review your pull request.
4. Look on [Trello](https://trello.com/b/lJc23iGy/group-3-project-barbosa) to see if there is another task you can work on.

###Reviewing a pull request
* Download that branch
* Run the tests
* Run the app and play with it, confirming it works.
* Make comments on the pull request (can be done line-by-line) if you have suggestions, critiques, etc.
* Continue making commits, and conversing on the pull request 'til all parties are satisfied with the progress.
* Once everyone is happy, do the merge/accept the pull request.

#Design
## Libraries used:
* [Mocha](http://visionmedia.github.io/mocha/) for running automated tests.
* [Should.js](https://github.com/visionmedia/should.js) for nice assertions.
* [Supertest](https://github.com/visionmedia/supertest) for doing the request tests.
* [Ember-tools](https://github.com/rpflorence/ember-tools) for building `application.js` and for awesome [generators](https://github.com/rpflorence/ember-tools#generators).

##Architecture
####High-level Project Architecture

_Front-end:_ Ember.js (coming soon...), Bootstrap, Jade

_Server:_ express.js on node.js (running on [heroku](comp-4350.herokuapp.com))

_Database:_ MongoDB via the Mongoose Node Package

_iOS:_ XCode and as many CocoPods as possible (will be a seperate repo)

####High-level Data Architecture

_Users:_ name, email, password (salted + hashed)

_Trips:_ owner, title, description, start date, ratings, reviews, collaborators, itinerary items

_Itinerary Items:_ location, title, description, comments, date, time
