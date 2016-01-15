var React = require('react')
var AppStore = require('../stores/AppStore')

/**
 * Retrieve the data from Store
 */
function getStoreState() {
  return {
    data: AppStore.getData()
  }
}

var Application = React.createClass({

  getInitialState() {
    return getStoreState()
  },

  componentDidMount() {
    AppStore.addListener(this._onChange)
  },

  componentWillUnmount() {
    AppStore.removeListener(this._onChange)
  },

  /**
   * @return {object}
   */
  render() {
    return (
      <div>
        <p className='welcome'> Hello world!</p>
        <article className='features'>
          <ul>
            <li>backend: node-organic w/ organic-express-routes </li>
            <li>asset pipeline: angel app build w/ webpack </li>
            <li>frontend: ReactJS w/ flux and jquery </li>
          </ul>
        </article>
      </div>
    )
  },
  /**
   * Event handler for 'change' events coming from the AppStore
   */
  _onChange() {
    this.setState(getStoreState())
  }

})

module.exports = Application
