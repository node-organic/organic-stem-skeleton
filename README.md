# stem skeleton

Cell with predefined dna to be developed as 'backend', 'frontend' or both

## usage

- `$ git clone https://github.com/outbounder/organic-stem-skeleton.git ./mypetproject`
- `$ cd ./mypetproject`
- `$ rm -rf ./.git`
- `$ npm install`
- modify `dna` folder and `package.json`
- add any stack addons
- `rm -rf ./upgrades`
- `git init .`

### stack addons

#### release

    $ node ./node_modules/.bin/angel stack use upgrades/release
    $ node ./node_modules/.bin/angel release:setup

#### server

##### emails support

    $ node ./node_modules/.bin/angel stack use upgrades/server/emails-support

##### mongoose models

    $ node ./node_modules/.bin/angel stack use upgrades/server/mongoose

##### mongodb stored cookie based sessions

    $ node ./node_modules/.bin/angel stack use upgrades/server/mongo-sessions

#### client

##### server rendered pages

###### ejs templates

    $ node ./node_modules/.bin/angel stack use upgrades/client/ejs-pages

###### jade templates

    $ node ./node_modules/.bin/angel stack use upgrades/client/jade-pages

##### Assetpipelines

###### less

    $ node ./node_modules/.bin/angel stack use upgrades/client/assetpipeline-less

###### webpack

    $ node ./node_modules/.bin/angel stack use upgrades/client/assetpipeline-webpack

###### browserify

    $ node ./node_modules/.bin/angel stack use upgrades/client/assetpipeline-browserify

##### SPAs

###### backbone + jade templates

    $ node ./node_modules/.bin/angel stack use upgrades/client/apps/jade-backbone

###### angular1

    $ node ./node_modules/.bin/angel stack use upgrades/client/apps/angular1

###### react + flux + es6/7 client side

    $ node ./node_modules/.bin/angel stack use upgrades/client/apps/react-flux
