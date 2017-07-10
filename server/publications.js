Meteor.publish("allusers",function(){
  return AllUsers.find();
}),
Meteor.publish("friends",function(){
  return Friends.find();
}),
Meteor.publish("posts",function(){
  return Posts.find();
})
