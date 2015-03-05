import Dispatcher from "../Dispatcher";
import EventEmitter from "eventemitter2";
import Polyfill from "babelify/polyfill";//required for Object.assign

var Store = Object.assign({

}, EventEmitter.EventEmitter2.prototype)


Dispatcher.register(payload => {
  var event = payload.event;
  try {
    if (payload.error !== undefined) {

    } else {
      switch(event) {

      }
    }
  }
})

export default Store;