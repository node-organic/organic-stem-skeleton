# packages folder

Contains common packages and their related implementation code.

Packages can be managed via [angelscripts-monorepo-packages](https://github.com/node-organic/angelscripts-monorepo-packages) and/or via [lernajs](https://github.com/lerna/lerna)

Package are those blocks of a software system which can be re-used across the various cells. They aren't 'runnable' compared to cells.

## package requirements

* `repo/packages/package/package.json` - package json having:
  * `name: String`
  * `version: String`

## create a package

```
$ cd {{{project-name}}}
$ npx angel create package
? packageName: myPackage
done.
```

## use another monorepo package

```
$ cd {{{project-name}}}
$ npx lerna add myUtilityPackage --scope=myPackage
```