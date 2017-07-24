Template.layout.rendered = function() {
  // be sure to use this.$ so it is scoped to the template instead of to the window
  this.$('.ui.dropdown').dropdown({on: 'hover'});
  // other SUI modules initialization
};
