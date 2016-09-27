# client usage quicksheet

## structure

* `apps` - SPAs with entry points:
  * `.bundle.js`
  * `.bundle.css`
* `pages` - html templates for SPAs
* `common` - common `apps` code
  * `models` - models used accross the system
* `vendor` - libraries used for `apps` copied internally to the repo due needs of hacking their implementation

## apps

### app as cell

```
// some.index.bundle.js

require('cell')({
  root: '/dashboard',
  urls: {
    groupEdit: 'groups/:groupId/edit',
    accountEdit: 'groups/:groupId/accounts/:accountId'
  },
  protected: true,
  redirectNotAuthorized: 'login',
  requireTags: function () {
    require('./dashboard-view')
  }
})

```

### global utilities

#### window.plasma
  * `window.plasma.api` via `plasma/api`
  * `window.plasma.currentUser` via `plasma/user-session`
  * `window.plasma.router` via `plasma/router`

#### window.navigatePage

```
window.navigatePage('login')
```

### models

#### user control chemicals

```
var User = require('models/user')
var user = new User({})
user.login({email: "", password: ""}) // fires `login` chemical on success
user.register(data) // fires `register` chemical on success
user.logout() // fires `logout` chemical on success
```

### organelles

#### api

Reacts to `login`, `register` & `logout` aggregating `user.token`

```
var api = window.plasma.api // restful.js api instance
```

#### user-session

1. reads currentUser from local store
1. Reacts to `login`, `register` & `logout` setting `plasma.currentUser`

```
var currentUser = window.plasma.currentUser

if (currentUser.id) {
  // user authenticated
} else {
  // not logged in user
}
```

#### router

```
var Router = require('plasma/router')
var dna = {
  root: '/dashboard',
  urls: {
    groupsListing: 'groups',
    editGroup: 'groups/:groupId/edit'
  }
}
var router = new Router(plasma, dna)

router.url.groupsListing() // '/dashboard/groups'
router.url.editGroup(1) // '/dashboard/groups/1/edit'
router.url.editGroup() // '/dashboard/groups/:groupId/edit'

plasma.on('/dashboard/groups', function () {
  // fired when routed to groups listing
})
plasma.on('/dashboard/groups/:groupId/edit', function (c) {
  console.log('fired when routed to editGroup', c.params.groupId)
})

router.navigate('') // navigates to /dashboard
```

### component based development

#### structure

* `component-name`
  * `index.tag` - the component's entry point as html code.
  * `style.less` - the component's style.
  * `tag.js` - the component's javascript code.

### utils/common

#### scoped class

```
// style.less
:local(.class) {

}
```

```
<component1>
  <script>
    this.root.className = require('./style.less').class
  </script>
</component1>
```

#### bind-tag

```
<component1>
  <script>
    require('bind-tag')(this)
    this.bind('myNewVariable', object)

    console.log('myNewVariable is smart reference to object', this.myNewVariable === object)
    this.myNewVariable.property1 = true
    console.log('updating smart references updates the tag too', object.property1)
  </script>
  <span if={object.property1}>bind-tag is based on Proxy es6 support</span>
</component1>
```

#### form-tag

```
<component1>
  <script>
    require('form-tag')(this)
    this.validators.myCustomValidator = function (cb) {
      if (this.value.length < 6) {
        this.raise('%s is too short', this.field)
      }
      cb()
    }
    this.submit = function (e) {
      e.preventDefault()
      tag.validateAndSubmit(function () {
        // form valid
        var formData = tag.getFormData()
        var formSchema = tag.getFormSchema()

        return Promise.resolve({}) // automatically catch any errors and render them accordingly
      })
    }
  </script>
  <form name='form'>
    <span type='error' clearOnRevalidate name='base'></span>

    <input type='text' name='myInput1'
      validator='myCustomValidator' required
      onkeyup={revalidate('password')} />
    <span type='error' name='myInput1' />

    <input type='submit' onclick={submit} />
  </form>
</component1>
```

#### router-tag

```
// having initialized plasma/router with dna:
var dna = {
  root: '',
  urls: {
    slugRoute: 'some/url/path/:slug'
  }
}
```

```
<component1>
  <script>
    require('router-tag')(this)
    var tag = this
    tag.onRoute(tag.router.url.slugRoute(), function (params) {
      console.log(params.slug)
      if (params.slug === 1) {
        tag.navigate('some/url/path/2')
      }
    })
  </script>
  <a href='router.url.slugRoute(1)' onclick={navigate} />
</component1>
```
