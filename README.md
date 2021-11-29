# stem skeleton v3.0.0

A concept on top of node-organic for orchestration and development of cells.

It takes the [organic](https://github.com/node-organic/node-organic) concept further to the level of cells and their organized development within a monorepo.

## usage

```
$ npx node-organic/organic-stem-skeleton my-project
```

The end result is a scaffolded skeleton which helps in organic software development both on organizational and utility levels. It provides an integrated way for implementation of various kinds of cells. The skeleton brings good practices upfront and helps boostraping by introducing a base upon which dev support toolbets can be engaged.

## quick overview

The stem skeleton is:

* a seed for monorepo boostrapping with nodejs flavor
* using [organic-angel](https://github.com/node-organic/organic-angel) based scripts for repo management
* opinionated DNA (configuration) management
* opinionated cells and common packages management via dedicated angelscripts and [lerna](https://github.com/lerna/lerna)
* enabling implementation of distributed systems based on [node-organic](https://github.com/node-organic/node-organic) 
* foundation for tools supporting rapid development such as [organic-stem-devshell](https://github.com/node-organic/organic-stem-devshell)

## concept blocks

### Stem cells

Every application having one responsibility is a cell within the stem skeleton. There are different kinds of cells by their responsibility and implementation within a system.

tip: [organic-stem-cell](https://github.com/node-organic/organic-stem-cell) provides abstract opinionated nodejs or browser cells.

Cells are placed under monorepo root `cells/` folder. 

#### More information

[cells README](./seed/cells/README.md)

### Common packages

Common packages are those which can be re-used across the monorepo within cells.

Common packages are stored within `packages/` folder.

#### More information

[packages README](./seed/packages/README.md)

### DNA

The configuration about the system and every cell kind stored as DNA (yaml) files. Those files are parsed all together constructing a big inmemory object. This object can be iterated and bits of it can be used for configuration across the system.

The YAML files have a syntax 'sugar' buildin allowing:

- re-using values across different branches of the object, thus keeping configuration without value duplicates
- consuming env variables

DNA YAML files are located within `dna` folders respectively at monorepo root folder and within every single cell.

There is [organic-dna-repo-loader](https://github.com/node-organic/organic-dna-repo-loader) implementation which is the package used out of the box for organic-stem-skeleton monorepo DNA loading.

#### root DNA

Within monorepo root `dna` folder are located YAML files which contain system-wide configuration.

These 'global' configurations can be used via [dna branch referencing](https://github.com/node-organic/organic-dna-resolve) across cells ondemand.

#### cell DNA

Within every cell the `dna` folder contains YAML files for cell-level configuration.

#### More information 

[dna README](./seed/dna/README.md)