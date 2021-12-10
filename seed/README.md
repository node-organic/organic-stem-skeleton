# {{{project-name}}}

## setup

```
$ git clone ...
$ cd {{{project-name}}}
$ npm i && npm run dev-setup
```

## develop

```
$ cd {{{project-name}}}
$ npx devshell
```

### more development documentation

* [Cells](./cells/README.md)
* [Packages](./packages/README.md)
* [DNA](./dna/README.md)

### organic-stem-skeleton 3

[organic-stem-skeleton documentation](https://github.com/node-organic/organic-stem-skeleton)


### convert existing app to a cell

```
$ cd {{{project-name}}}
$ npx create-app cells/my-app
$ npx angel create cell my-app
done.
$ npx angel cell my-app -- npm start
```