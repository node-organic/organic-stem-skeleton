# stem skeleton v3.0.0

A concept on top of node-organic for orchestration and development of cells.

It takes the [organic](https://github.com/node-organic/node-organic) concept further to the level of cells and their organized development within a monorepo.

## usage

```
$ npx node-organic/organic-stem-skeleton my-project
```

The end result is a scaffolded skeleton:

```
repoRoot
| - dna
| - cells
| - packages
| - package.json
| - lerna.json
```

## quick overview

The stem skeleton is:

- [x] a seed for monorepo boostrapping with nodejs flavor
- [x] using [organic-angel](https://github.com/node-organic/organic-angel) based scripts for repo management
- [x] opinionated DNA (configuration) management
- [x] opinionated cells and common packages management via dedicated angelscripts and [lerna](https://github.com/lerna/lerna)
- [x] enabling implementation of distributed systems based on [node-organic](https://github.com/node-organic/node-organic) 
- [x] foundation for tools supporting rapid development such as [organic-stem-devshell](https://github.com/node-organic/organic-stem-devshell)

## concept blocks

### Cells

Every application having one responsibility is a cell within the stem skeleton. There are different kinds of cells by their responsibility and implementation within a system.

Cells are placed under monorepo root `cells/` folder. For example cells of a web based platform usually have following kinds: `api`, `spa`, `cron`, `mobile`, `db` & etc.

#### More information

[cells README](./seed/cells/README.md)

### Packages

Packages can be re-used across the monorepo within cells and/or other packages.
Packages are stored within `packages/` folder.

#### More information

[packages README](./seed/packages/README.md)

### DNA

The configuration about the system and every cell kind is stored as DNA (yaml) files. Those files are parsed all together constructing a big inmemory object. This object can be iterated and bits of it can be used for configuration within the system.

The YAML files have a syntax 'sugar' buildin allowing:

- re-using values across different nodes of the object, thus keeping configuration without value duplicates
- consuming env variables

DNA YAML files are located within `dna` folders respectively at monorepo root folder (root DNA) and within every single cell (cell DNA).

There is [organic-dna-repo-loader](https://github.com/node-organic/organic-dna-repo-loader) implementation which is the package used out of the box for organic-stem-skeleton monorepo DNA loading.

#### More information 

[dna README](./seed/dna/README.md)