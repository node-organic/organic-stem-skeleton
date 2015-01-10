module.exports = Backbone.View.extend({
  template: require("./index.jade"),
  render: function(){
    this.$el.html(this.template({
      model: this.model,
      collection: this.collection
    }))
    return this
  }
})