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

    var friends =
      {username:username,
       age:age,
       havevehicle12345:havevehicle,
       owner:Meteor.userId(),
        createAt:new Date()}
    Meteor.call('friends.insert',friends);
  }
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
    Meteor.call('friends.updateVehicle', this.person._id, new_value)
  },

  'click #updatename'(elt,instance){
    const name=instance.$('#usernameUpdate').val();
    console.log('modifying '+name);
    instance.$('#usernameUpdate').val("");
    Meteor.call('friends.updateName', this.person._id, name)
  },

  'click #updateage'(elt,instance){
    const age=instance.$('#ageUpdate').val();
    console.log('modifying '+age);
    instance.$('#ageUpdate').val("");
    Meteor.call('friends.updateAge', this.person._id, age)
  },

  'click #erase'(elt,instance){
    console.dir(this);
    console.log(this.person._id);
    Meteor.call('friends.remove',this.person);
    //Friends.remove(this.person._id);
  }
})
