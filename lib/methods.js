Meteor.methods ({
  'friends.insert':function(friends){
    Friends.insert(friends);
  },
  'friends.remove':function(friends){
    Friends.remove(friends._id);
  },
  'friends.updateVehicle'(friendsId, newvalue) {
    Friends.update(friendsId, {
      $set: { havevehicle12345: newvalue }
    });
  },
  'friends.updateName'(friendsId, name){
    Friends.update(friendsId,{
      $set:{username : name}
    });
  },
  'friends.updateAge'(friendsId, age){
    Friends.update(friendsId,{
      $set:{age:age}
    });
  },
  'allusers.updateName'(personId,name){
    AllUsers.update(personId,{
      $set:{name:name}
    });
  },

'newuser.insert':function(newUser){
  AllUsers.insert(newUser);
},
'newuser.remove':function(newUser){
  AllUsers.remove(newUser._id);
}
})
