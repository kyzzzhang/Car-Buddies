Template.showuser.helpers({
  peoplelist() {return AllUsers.find()},
})

Template.createprofile.events({
  'click #submitnow':function(elt,instance) {
    event.preventDefault();
    const name=instance.$('#name').val();
    const career=instance.$('#career').val();
    var gender="";
    if($('input[id="male"]').is(':checked')){
      gender="male";
    }else if($('input[id="female"]').is(':checked')){
      gender="female";
    }else{
      gender="other";
    };
    const havevehicle=instance.$('#vehicle').val();
    const otherinfo=instance.$('#otherinfo').val();
    console.log('adding '+name);
    instance.$('#name').val("");
    instance.$('#career').val("");
    instance.$('#gender').val("");
    instance.$('#vehicle').val("");
    instance.$('#otherinfo').val("");

    var newUser={
      name:name,
       career:career,
       gender:gender,
       havevehicle12345:havevehicle,
       otherinfo:otherinfo,
       owner:Meteor.userId(),
      createAt:new Date()
    }

    Meteor.call('newuser.insert',newUser);
  }})

  Template.showuser.helpers({
    isOwner(person){
      console.dir(person);
      return person.owner==Meteor.userId();
    }
  })

Template.showprofile.events({
  'click #erase2'(elt,instance){
    console.dir(this);
    console.log(this.person._id);
    Meteor.call('newuser.remove',this.person);
  }
  'click #updateUsername1'(elt,instance){
    const name=instance.$('#usernameUpdate1').val();
    console.log('modifying '+name);
    instance.$('#usernameUpdate1').val("");
    Meteor.call('allusers.updateName', this.person._id, name)
  },
})
