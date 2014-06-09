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

1. `git clone https://github.com/outbounder/organic-stem-skeleton.git ./mypetproject`
2. `cd ./mypetproject`
3. `npm install`
4. `node index.js`

## usage via organic-angel

### from zero to organic-angel step by step setup

1. create file ~/angel/dna/index.json with contents

        {
          "scripts": [
            "angelscripts",
            "angelscripts-generate"
          ]
        }

2. `npm install organic-angel -g`
3. `npm install angelscripts -g`
4. `npm install angelscripts-generate -g`

### per every stem based project

1. `angel generate mypetproject https://github.com/outbounder/organic-stem-skeleton.git`
2. `cd ./mypetproject`
3. `node index.js`