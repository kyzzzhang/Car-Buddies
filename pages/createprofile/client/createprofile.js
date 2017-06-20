Template.showpeople.helpers({
  personlist() {return AllUsers.find()},
})

Template.userInfo.events({
  'click button'(elt,instance) {
    const name=instance.$('#name').val();
    const career=instance.$('#career').val();
    const havevehicle=instance.$('#vehicle').val();
    const otherinfo=instance.$('#otherinfo').val();
    console.log('adding '+username);
    instance.$('#name').val("");
    instance.$('#career').val("");
    instance.$('#vehicle').val("");
    instance.$('#otherinfo').val("");
    AllUsers.insert({name:name,career:career, havevehicle12345:havevehicle, otherinfo:otherinfo,
     owner:Meteor.userId(), createAt:new Date()});
  }
})

Template.showprofile.events({
  'click #tree'(elt,instance){
    console.dir(this);
    console.log(this.person._id);
    const newName=this.person.name;
    AllUsers.update(this.person._id,{$set: {
        name:newName
    }})
  },
})