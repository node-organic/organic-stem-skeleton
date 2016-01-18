// import Dispatcher from '../Dispatcher'
import EventEmitter from 'eventemitter2'

var Store = Object.assign(Object.create({
  getData: function () {
    return {}
  }
}), EventEmitter.prototype)

module.exports = Store
