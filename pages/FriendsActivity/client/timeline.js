Template.timeline.helpers({
  posts(){
    var myFriends = AllUsers.findOne({userId:Meteor.userId()},  {fields: {friend_list: 1} }).friend_list;
    console.log(myFriends);
    const myFriendsList=[];
  /*  for(var i=0;i<myFriends.length;i++){
      var newfriend=AllUsers.findOne({_id: myFriends[i]});
      myFriendsList.push(newfriend);
    }*/
    return Posts.find({owner:{$in:myFriends}},{sort:{createdAt:-1}})
  }
})

Template.fbmakepost.events({
  "click #submit"(event, instance){
    var name = AllUsers.findOne({userId:Meteor.userId()}).name;
    var now = new Date();
    var text = instance.$("#posttext").val();
    var post = {
      owner:Meteor.userId(),
      name:name,
      createdAt: now,
      text: text
    };
    console.log(post);
    Meteor.call('posts.insert',post);
  }
})
