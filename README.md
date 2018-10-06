# stem skeleton v2.1

A concept over node-organic.com for rapid software development.

## concept

Concept domain is based on `stem cells` and `stack upgrades`.
Using stem cell implementations and stack upgrades forms an `organic stem skeleton` of a system.

### (stem) cells

Stem cell is system's inner application having a common dna across all cells.

Aid in cell development: 

* [organic-stem-cell](https://github.com/node-organic/organic-stem-cell)

### stack upgrade

Stack upgrade is scaffolding/bootstraping executable.

The difference with existing scaffolding solutions is that stack upgrades do additionally:

* optional check for existing(applied already) stack upgrades
* update of `package.json` with `stackUpgrades` map holding just applied stack upgrade

Aid in stack upgrade development:

* [organic-stack-upgrade](https://github.com/node-organic/organic-stack-upgrade) helper package

## usage/example

The following executed at the terminal will produce a monorepo with a single cell capable to respond at http requests:

```
$ mkdir ./test
$ cd ./test
$ npx node-organic/organic-stem-core
$ npx node-organic/organic-stem-server-express-http-api-cell-template
```

Of course using combination of stack upgrades will produce systems where development can be streamlined into different capabilities. In the above example developer could extend the system with more than one cell implementing http server by re-applying the stack upgrade `organic-stem-server-express-http-api-cell-template` with different input.

### more [stack upgrades](https://github.com/node-organic?utf8=%E2%9C%93&q=template)
