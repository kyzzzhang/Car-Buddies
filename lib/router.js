Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here ....
});

Router.route('/', {name: 'home'});
Router.route('information');
Router.route('userInfo', {
	waitOn: function(){
		return Meteor.subscribe("allusers");
	}
});
Router.route('timeline', {
	waitOn: function(){
		return [Meteor.subscribe("allusers"),Meteor.subscribe("timeline")];
	}
});
Router.route('trip');
Router.route('travelinfo');
Router.route('userList');
Router.route('addfriends',{
	waitOn: function(){
		return Meteor.subscribe("allusers");
	}
});
Router.route('contact');
Router.route('chat');
Router.route('about');
Router.route('pokemon');
Router.route('pokemonData/:_id',
{name:"pokemonData",
 data: function(){
	 const c = Pokedex.findOne(this.params._id);
	 return c;
 }});

Router.route('apidemo');

Router.route('firefly');

Router.route('sponsors')

Router.route('draw')

Router.route('graphics')
