import React from "react"
import AppStore from "../stores/AppStore"

/**
 * Retrieve the data from Store
 */
function getStoreState() {
  return {
    data: AppStore.getData()
  };
}

var Application = React.createClass({

  getInitialState() {
    return getStoreState();
  },

  componentDidMount() {
    AppStore.addListener(this._onChange);
  },

  componentWillUnmount() {
    AppStore.removeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render() {
    return (
      <div>
        <p className="welcome"> Hello world!</p>
        <article className="features"> 
          <ul>
            <li>backend: node-organic w/ express routes and jade templates </li>
            <li>asset pipeline: angel app build w/ browserify </li>
            <li>frontend: ReactJS w/ flux and jquery </li>
          </ul>
        </article>
      </div>
    );
  },
  /**
   * Event handler for 'change' events coming from the AppStore
   */
  _onChange() {
    this.setState(getStoreState());
  }

});

export default Application;