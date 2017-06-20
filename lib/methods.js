Meteor.methods({
  'friends.insert':function(friends) {
    Friends.insert(friends);
  },
  'friends.remove':function(friends){
    console.log(this.userId);
    if(this.userId==friends.owner){
      Friends.remove(friends);
    }
  }
})
