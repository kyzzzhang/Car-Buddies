Template.showpeople.helpers({
  peoplelist() {return Friends.find()},
})

Template.friendrow.events({
  'click #submit_info': function(elt,instance) {
    event.preventDefault();
    const username=instance.$('#username').val();
    const age=instance.$('#age').val();
    const havevehicle=instance.$('#vehicle').val();
    const actualage=parseInt(age);
    console.log('adding '+username);
    instance.$('#username').val("");
    instance.$('#age').val("");
    instance.$('#vehicle').val("");
    Friends.insert({username:username,age:age,havevehicle12345:havevehicle,
    owner:Meteor.userId(), createAt:new Date()});
    

    /*var friends =
      {username:username,
       age:age,
       havevehicle12345:havevehicle,
       owner:Meteor.userId(),
        createAt:new Date()}
    Meteor.call('friends.insert',friends);*/
  },

})

Template.showpeople.helpers({
  isOwner(person){
    console.dir(person);
    return person.owner==Meteor.userId();
  }
})


Template.personrow.events({
  'click #star'(elt,instance) {
    console.dir(this);
    console.log(this.person._id);
    //get vehicle
    const vehicle = this.person.havevehicle12345;
    var new_value = "";
    if(vehicle === "yes"){
      new_value = "no";
    }else{
      new_value = "yes";
    }
    Friends.update(this.person._id,{$set: {
        havevehicle12345:new_value
    }})
  },
  'click #erase'(elt,instance){
    console.dir(this);
    console.log(this.person._id);
    //Meteor.call('friends.remove',this.person);
    Friends.remove(this.person._id);
  }
})
