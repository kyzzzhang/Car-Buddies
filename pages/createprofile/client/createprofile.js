Template.userInfo.helpers({
  peoplelist() {return AllUsers.find()},
})

Template.createprofile.events({
  'click #submitProfile':function(elt,instance) {
    event.preventDefault();
    const name=instance.$('#name').val();
    const career=instance.$('#career').val();
    const havevehicle=instance.$('#vehicle').val();
    const otherinfo=instance.$('#otherinfo').val();
    console.log('adding '+name);
    instance.$('#name').val("");
    instance.$('#career').val("");
    instance.$('#vehicle').val("");
    instance.$('#otherinfo').val("");
    AllUsers.insert({name:name,career:career, havevehicle12345:havevehicle, otherinfo:otherinfo,
     owner:Meteor.userId(), createAt:new Date()});
  }
})

Template.createprofile.events({
  'click #tree':function(elt,instance){
    console.dir(this);
    console.log(this.person._id);
    const name=this.person.name;
    var new_Name = instance.$('#name').val();
    AllUsers.update(this.person._id,{$set: {
        name:new_Name
    }})
  },
  'click #tree2':function(elt,instance) {
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
    AllUsers.update(this.person._id,{$set: {
        havevehicle12345:new_value
    }})
})
