import Dispatcher from "../Dispatcher";
import EventEmitter from "eventemitter2";
import Polyfill from "babelify/polyfill";//required for Object.assign

var Store = Object.assign(Object.create({
  getData: function(){
    return {}
  }
}), EventEmitter.EventEmitter2.prototype)

export default Store;