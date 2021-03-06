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

  'allusers.updateName':function(personId,name){
    AllUsers.update(personId,{
      $set:{name:name}
    });
  },

  'allusers.updateCareer':function(personId,career){
    AllUsers.update(personId,{
      $set:{career:career}
    });
  },
 'allusers.updateVehicle':function(personId,vehicle){
   AllUsers.update(personId,{$set: {
       vehicle:vehicle
   }})
 },
 'allusers.updateGender':function(personId,gender){
   AllUsers.update(personId,{$set: {
       gender:gender
   }})
 },
 'allusers.updateOtherinfo':function(personId,otherinfo){
   AllUsers.update(personId,{$set:{
     otherinfo:otherinfo
   }})
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
},

'posts.insert':function(newpost){
  Posts.insert(newpost);
},
'forum.insert':function(post){
   Timeline.insert(post);
 },
 'forumpost.update':function(id,post){
   Timeline.update({_id:id},{$set:post});
 },
 'forum.remove':function(post){
   Timeline.remove(post);
 }
})
