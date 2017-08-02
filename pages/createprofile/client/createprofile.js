Template.showuser.helpers({
  peoplelist() {return AllUsers.find()},
})
Template.createprofile.helpers({
  hasProfile(){
    if(AllUsers.findOne({userId:Meteor.userId()})){
      return true;
    }
  }
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
    const vehicle=instance.$('#vehicle').val();
    const otherinfo=instance.$('#otherinfo').val();
    friend_list = [];
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
       vehicle:vehicle,
       otherinfo:otherinfo,
       userId:Meteor.userId(),
       friend_list:friend_list,
      createAt:new Date()
    }
    Meteor.call('newuser.insert',newUser, function(err, result){
      if(err){
        window.alert(err);
        return;
      }
    });
  }})

  Template.showuser.helpers({
    isOwner(person){
      console.dir(person);
      return person.userId==Meteor.userId();
    }
  })

Template.showprofile.events({
  'click #deleteprofile'(elt,instance){
    console.dir(this);
    console.log(this.person._id);
    Meteor.call('newuser.remove',this.person);
  },

  'click #editname'(elt,instance){
    instance.$('#newname').css("display","block");
  },
  'click #cancelname'(elt,instance){
    instance.$('#newname').css("display","none");
  },
  'click #updateUsername1'(elt,instance){
    const name=instance.$('#usernameUpdate1').val();
    console.log('modifying '+name);
    instance.$('#usernameUpdate1').val("");
    Meteor.call('allusers.updateName', this.person._id, name)
    instance.$('#newname').css("display","none");
  },
  'click #editcareer'(elt,instance){
    instance.$('#newcareer').css("display","block");
  },
  'click #cancelcareer'(elt,instance){
    instance.$('#newcareer').css("display","none");
  },
  'click #updateCareer1'(elt,instance){
    const career=instance.$('#careerUpdate1').val();
    console.log('modifying '+career);
    instance.$('#careerUpdate1').val("");
    Meteor.call('allusers.updateCareer', this.person._id, career)
    instance.$('#newcareer').css("display","none");
  },
  'click #updateGender'(elt,instance){
    const newgender=instance.$("#selectgender").val();
    Meteor.call('allusers.updateGender', this.person._id, newgender)
    instance.$('#newgender').css("display","none");
  },
  'click #updategender'(elt,instance){
    instance.$('#newgender').css("display","block");
  },
  'click #cancelgender'(elt,instance){
    instance.$('#newgender').css("display","none");
  },
  'click #cancelotherinfo'(elt,instance){
    instance.$('#newotherinfo').css("display","none");
  },

  'click #updateVehicle1'(elt,instance) {
    console.dir(this);
    console.log(this.person._id);
    //get vehicle
    console.log(this.person.vehicle)
    const vehicle = this.person.vehicle;
    var new_value = "";
    if(vehicle === "yes"){
      new_value = "no";
    }else{
      new_value = "yes";
    }
    Meteor.call('allusers.updateVehicle',this.person._id,new_value)
  },
  'click #updateotherinfo1'(elt,instance){
    const otherinfo=instance.$('#otherinfoUpdate1').val();
    console.log('modifying '+otherinfo);
    instance.$('#otherinfoUpdate1').val("");
    Meteor.call('allusers.updateOtherinfo',this.person._id,otherinfo)
    instance.$('#newotherinfo').css("display","none");
  },
  'click #editotherinfo'(elt,instance){
    instance.$('#newotherinfo').css("display","block");
  }
})
Template.showprofile.onCreated(function(){
  Meteor.subscribe("allusers");
} )
