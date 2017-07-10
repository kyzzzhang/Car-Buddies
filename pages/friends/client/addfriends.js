Template.getfriend.helpers({
  "currentuser": function(){
    var id = Meteor.userId();
    var allfriends = AllUsers.findOne({userId: id}, {fields: {friend_list: 1} }).friend_list;
    const friendlist=[];
    for(var i=0;i<allfriends.length;i++){
      var newfriend=AllUsers.findOne({userId: allfriends[i]});
      friendlist.push(newfriend);
    }
    //console.log(friendlist);
    return friendlist;
    },
})


Template.friendrow.helpers({
  "friendlist": function(){
    return Template.instance().getuserfriendlistDict.get("friendlist");
  }
})

Template.friendrow.onCreated(function(){
  //create a reactive dict for this Template
  this.friendrowDict = new ReactiveDict();

})

Template.friendrow.events({
  'click #submit_info': function(elt,instance) {
    event.preventDefault();
    const username=instance.$('#username').val();
    console.log('searching '+username);
    instance.$('#username').val("");

    const friendrowDict = Template.instance().friendrowDict;
    Meteor.call('user.search',username, function(err,result){
      if(err){
        window.alert(err);
        return;
      }

      if(result.length==0){
        window.alert("No such user.....");
      }else{
        friendrowDict.set("userlist", result);
      }
    });
  },
  'click #addfriends_submit':function(elt,instance){
    friendlist = instance.$(".user_checkbox:checked");
    const friends_list=[];
      for(var i=0; i<friendlist.length; i++){
        userId=($($(".user_checkbox:checked")[i]).attr("user-id"));
        console.log("userId is"+userId);
        friends_list.push(userId);
    }
    console.log(friends_list);
    Meteor.call('user.addfriendlist',friends_list, function(err,result){
      if(err){
        window.alert(err);
        return;
      }
    });
  }
})

Template.friendrow.helpers({
  "userlist": function(){
    return Template.instance().friendrowDict.get("userlist");
  }
})

Template.personrow.events({
  'click #delete_friend':function(elt,instance){
    var id = Meteor.userId();
    var allfriends = AllUsers.findOne({userId: id}, {fields: {friend_list: 1} }).friend_list;
    console.log(allfriends);
    console.log(this);
    console.log(this.person.userId);
    const newlist=[];
    for(var i=0;i<allfriends.length;i++){
      if(allfriends[i]!==this.person.userId){
        newlist.push(allfriends[i]);
      }
    }
    console.log(newlist);
    Meteor.call('friends.remove',newlist);
  }
})

Template.personrow.onCreated(function(){
  Meteor.subscribe("allfriends");
})
