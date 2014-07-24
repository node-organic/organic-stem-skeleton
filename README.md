# stem skeleton

Cell with predefined dna having the following abilities:

* expressjs server at port 1337 configured with
  * body-parser
  * cookie-parser
  * views at /context/pages
  * connect-mongo sessions
* autoload and mount api action handlers from /context/routes/api
* autoload and mount site action handlers from /context/routes/site
* autoload and mount static pages from /context/pages
* in development 
  * watch all javascripts and bundle them from /context/client to /public/js
  * watch all stylesheets and bundle them from /context/styles to /public/css
  * serve static files from /public and /build folders to /public url

## usage

- `git clone https://github.com/outbounder/organic-stem-skeleton.git ./mypetproject`
- `cd ./mypetproject`
- `rm -rf ./.git`
- `npm install`
- `node index.js`

### optional perks

#### use jade templates and backbone/jquery on the frontend

    $ node ./node_modules/.bin/angel stack add upgrades/jade-backbone

#### use ejs serverside templates and angularjs

    $ node ./node_modules/.bin/angel stack add upgrades/ejs-angular

### cleanup before initial commit

1. Delete the following files manually once not needed:

  * `context/pages/**/*.jade` if ejs-angular upgrade is used.
  * `upgrades` folder

2. Modify `dna` folder contents accordingly to your needs.
3. Modify `package.json` contents accordingly to your needs.
