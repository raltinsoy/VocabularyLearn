import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { ReactiveDict } from 'meteor/reactive-dict';

import '../../../public/bootstrap/css/bootstrap.css';
import '../../../public/bootstrap/css/bootstrap-responsive.css';

import './app-body.html';
import '../pages/mainPage.js';

Template.body.onCreated(function appBodyOnCreated() {
  //this.state = new ReactiveDict();
  //Meteor.subscribe("words.list");

  Session.setDefault({
    isEditing:false,
    tmpWord:null,
    isDetailsOpen:false,
    wordId:null,
  });
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
