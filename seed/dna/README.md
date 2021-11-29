# dna folder

Contains DNA information about the project

* `dna/cells` contains cells' index
* `secrets.yaml` default secrets
* modes `_development` and `_production`
  * both modes have gitignored secrets overriding default ones in DNA root.

## runtime configuration modes in DNA

DNA folders prefixed with underscore like `_production` indicate different mode. 

For more details about modes see [organic-dna-cellmodes](https://github.com/node-organic/organic-dna-cellmodes) and its usage within [organic-dna-loader](https://github.com/node-organic/organic-dna-loader)

* Those modes can be activated via `CELL_MODE` env variable, eg. `CELL_MODE=_production node cell/index.js`
* Those modes can be combined via `+` character, eg `CELL_MODE=_development+_profiling`

## create dna mode

```
$ cd {{{project-name}}}
$ mkdir dna/_myMode
$ edit dna/_myMode/secrets.yaml
```

## create and use common dna branch

```
$ cd {{{project-name}}}/dna
$ echo "myProperty: 'Hello World'" > myBranch.yaml
```

within any dna:

```
cellBranch:
  cellProperty: "@myBranch.myProperty"
```

## add cell to dna cells index

```
$ cd {{{project-name}}}/dna/cells
$ echo "  - cells/myCell" >> index.yaml
```


## access DNA

```
const findRoot = require('organic-stem-skeleton-find-root')
const loadDna = require('organic-dna-repo-loader')

const repopath = await findRoot()
const dna = await loadDna({root: repopath, mode})
```

