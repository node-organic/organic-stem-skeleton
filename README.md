# stem skeleton

Cell with predefined dna to be developed as 'backend', 'frontend' or both

## usage

- `git clone https://github.com/outbounder/organic-stem-skeleton.git ./mypetproject`
- `cd ./mypetproject`
- `rm -rf ./.git`
- `npm install`
- modify `dna` folder and `package.json`

### stack addons

#### server

##### emails support

    $ node ./node_modules/.bin/angel stack add upgrades/server/emails-support

##### mongoose models

    $ node ./node_modules/.bin/angel stack add upgrades/server/mongoose

##### mongodb stored cookie based sessions

    $ node ./node_modules/.bin/angel stack add upgrades/server/mongo-sessions

#### client

##### server rendered pages

###### ejs templates

    $ node ./node_modules/.bin/angel stack add upgrades/client/ejs-pages

###### jade templates

    $ node ./node_modules/.bin/angel stack add upgrades/client/jade-pages

##### Assetpipelines

###### less

    $ node ./node_modules/.bin/angel stack add upgrades/client/assetpipeline-less

###### webpack

    $ node ./node_modules/.bin/angel stack add upgrades/client/assetpipeline-webpack

###### react + flux + es6/7 client side

    $ node ./node_modules/.bin/angel stack add upgrades/client/apps/react-flux

##### SPAs

###### backbone + jade templates

    $ node ./node_modules/.bin/angel stack add upgrades/client/apps/jade-backbone

###### angular1

    $ node ./node_modules/.bin/angel stack add upgrades/client/apps/angular1

###### react + flux + es6/7 client side

    $ node ./node_modules/.bin/angel stack add upgrades/client/apps/react-flux
