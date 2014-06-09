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