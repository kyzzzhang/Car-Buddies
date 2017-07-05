/*Template.getfriend.helpers({
  currentuser() {return AllUsers.find()},
})

Template.getuserfriendlist.helpers({
  getfriend(userId){

    /*Meteor.call('friend.search',userId, function(err,result){
      if(err){
        window.alert(err);
      return;
    }

    getuserfriendlistDict.set("friendlist", result);

  })

  }
})

Template.getuserfriendlist.onCreated(function(){
  //create a reactive dict for this Template
  this.getuserfriendlistDict = new ReactiveDict();
})*/

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



/*Template.personrow.onCreated(function(){
  Meteor.subscribe("friends");
})
*/
