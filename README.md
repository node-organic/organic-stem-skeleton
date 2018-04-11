# stem skeleton v1.0.0

A concept for organic software development and an awesome registry of stem skeleton stack upgrades

## concept

Rapid Organic software development happens usually based on code reuse. Although reusing organelles and DNA across different cells is simple, adding more complex features to a system requires an abstraction which we define as `stack upgrades` and `(stem) cells`.

### stack upgrades

Every Stack upgrade in nodejs ecosystem represent:

* an source code repository
* an package in npm
* an executable nodejs program

To aid in development of stack upgrades we provide [organic-stack-upgrade package](https://github.com/node-organic/organic-stack-upgrade) which simplifies common tasks related to scaffolding/code generation/user input.

The `organic-stack-upgrade` library is limited variation similar to [yeoman](http://yeoman.io/), [hygen](http://www.hygen.io/) and other scaffolding/code generators. Its usage within `stack upgrades` is optional and depends on the requirements which the stack upgrade in question needs to fulfill.

### (stem) cells

A large organic based system is composed from different cells which are analogue to micro-services with the important note that frontend single page apps are also cells on their own within the system.

In that sense a generic cell (known in nature as stem cells) implementation is provided as [organic-stem-cell](https://github.com/node-organic/organic-stem-cell) suitable to be used on the server (nodejs) and in the browser.

Using that implementation and `stack upgrades` gives the ability to form an `organic stem skeleton` of a system. Also using `stack upgrades` during actual system development adds support to upgrade(mutate) system's tech stack towards meeting ever changing requirements.

A system's stem skeleton consists of the following abstract parts:

* system's own cells source code
* system's own cells dna
* system's dna

Thereafter the system's skeleton can be used to deploy a live system in production.

## awesome stack upgrades

* https://github.com/node-organic/organic-stack-template
* https://github.com/node-organic/organic-stem-core-template
* https://github.com/node-organic/organic-stem-server-express-http-api-cell-template 
* https://github.com/node-organic/organic-stem-mongodb-storage