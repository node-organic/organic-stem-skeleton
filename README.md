# stem skeleton

Cell with predefined dna to be developed as 'backend', 'frontend' or both

## usage


1. `$ git clone https://github.com/outbounder/organic-stem-skeleton.git ./mypetproject`
1. `$ cd ./mypetproject`
1. `$ rm -rf ./.git`
1. `$ npm install`
1. add any stack addons (run `$ angel stack list` for available options)
1. `$ angel stack configure`
1. `rm -rf ./upgrades`
1. `git init .`

___notice 1)___
`angel` is organic command line assistant.
Either install it locally via `npm install organic-angel -g` or run it via `node ./node_modules/.bin/angel`.

___notice 2)___
Running `$ angel help` will print all available commands to your disposal.

### stack addons

#### server

##### emails support

    $ angel stack use emails-support

##### mongoose models

    $ angel stack use mongoose

##### mongodb stored cookie based sessions

    $ angel stack use mongo-sessions

##### server rendered pages

###### ejs templates

    $ angel stack use ejs-pages

###### jade templates

    $ angel stack use jade-pages

#### devtools

Refer to [devtools](https://github.com/outbounder/organic-stem-devtools) or `$ angel stack list`

#### frontend SPAs

###### backbone + jade templates

    $ angel stack use jade-backbone

###### angular1

    $ angel stack use angular1

###### react + flux

    $ angel stack use react-flux
