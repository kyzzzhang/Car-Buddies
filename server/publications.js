Meteor.publish("allusers",function(){
  return AllUsers.find();
}),
Meteor.publish("friends",function(){
  return Friends.find();
}),
Meteor.publish("timeline",function(){
  return Timeline.find();
})
