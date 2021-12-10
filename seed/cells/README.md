# /cells folder

Contains cells and their related implementation code.

Cells can be managed via [angelscripts-monorepo-cells](https://github.com/node-organic/angelscripts-monorepo-cells) and/or via [lernajs](https://github.com/lerna/lerna)

Cells are all those building blocks of a software system which a 'runnable'. They can be executed in different modes and horizontally scaled.

Cells kinds are apis, crons, webapps, mobileapps, desktopapps, shellscripts, k8s resources, databases & anything else which makes a building block of a software system.

## cell requirements

* `repo/cells/cell/dna/index.yaml` - Cell DNA having the following:
  * `cellKind: String`
  * `cwd: String`
  * `cellInfo: v1`
* `repo/dna/cells/index.yaml` - Root DNA having the cell's cwd part of:
  * `cellPaths: [String]`

### cell groups

A cell can be part of one or many groups. This is defined within cell's DNA at `cell/dna/index.yaml` as well as using native filesystem folder grouping.

## create a cell

```
$ cd {{{project-name}}}
$ npx angel create cell
? cell name: myCell
? cell group: 
? cell kind:
done.
$ cd cells/myCell
$ npm init
```

## use monorepo package within a cell

```
$ cd {{{project-name}}}
$ npx lerna add myModule --scope=myCell
```

## access Cell(s) DNA

```
const {getCell, getAllCells} = require('organic-dna-cells-info')

const myCell = getCell(dna.cells, 'myCell')
const allCells = getAllCells(dna.cells)
```

## organic cells

[organic-stem-cell](https://github.com/node-organic/organic-stem-cell) provides abstract opinionated nodejs or browser cells

## build cells with docker & docker-compose

* [angelscripts-stem-docker](https://github.com/node-organic/angelscripts-stem-docker#readme)

## kubernetes

* [angelscripts-stem-k8s](https://github.com/node-organic/angelscripts-stem-k8s#readme)

## release helpers

* [angelscripts-stem-cell-release](https://github.com/node-organic/angelscripts-stem-cell-releases#readme)