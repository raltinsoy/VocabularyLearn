import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { ReactiveDict } from 'meteor/reactive-dict';

import './app-body.html';
import '../pages/mainPage.js';



Template.body.onCreated(function appBodyOnCreated() {


});

// Template.body.helpers({
//   isEditing(){
//     // const instance = Template.instance();
//     // return instance.state.get('isEditing');
//     return Session.get('isEditing');
//   },
//   isDetailsOpen(){
//     return Session.get('isDetailsOpen');
//   },
// });
