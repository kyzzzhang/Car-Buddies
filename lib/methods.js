Meteor.methods ({
  'friends.insert':function(friends){
    Friends.insert(friends);
  },
  'friends.remove':function(newlist){
    const personId=this.userId;
    AllUsers.update({userId:personId},{
      $set:{friend_list:newlist}
    });
  },

  'allusers.updateName'(personId,name){
    AllUsers.update(personId,{
      $set:{name:name}
    });
  },

'newuser.insert':function(newUser){
 const userId=Meteor.userId();
 if(AllUsers.findOne({userId:userId})){
    throw new Meteor.Error(123, "Profile already exists!!!");
  }else{
    AllUsers.insert(newUser);
  }
},

'user.addfriendlist':function(friend_list){
  if(!this.userId){
    throw new Meteor.Error(234,"No user logged in!!");
  }else{
    const currentUserId=this.userId;
    console.log(currentUserId);
     AllUsers.update({userId:currentUserId},{$addToSet:{friend_list:{$each:friend_list}}});
  }
},

'friend.search':function(userId){
  return AllUsers.find({userId:userId}).fetch()
},

'user.search': function(text){
  return AllUsers.find({name:text}).fetch()
},

'newuser.remove':function(newUser){
  AllUsers.remove(newUser._id);
}
})
