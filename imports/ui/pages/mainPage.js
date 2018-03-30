import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './mainPage.html';
import '../components/mainPage/wordList.js'; // word_edit
import '../components/mainPage/sentences.js'; // word_details
import '../components/mainPage/currentWorks.js';
import '../components/mainPage/workToday.js';

Template.main_page.onCreated(function appBodyOnCreated() {
  this.state = new ReactiveDict();

  this.subscribe('words.list');
  this.subscribe("sentences.list");
  // Session.setDefault({
  //   isEditing:false,
  //   tmpWord:null,
  //   isDetailsOpen:false,
  //   wordId:null,
  // });
});

Template.main_page.helpers({
  isEditing(){
    // const instance = Template.instance();
    // return instance.state.get('isEditing');
    return Session.get('isEditing');
  },
  isDetailsOpen(){
    return Session.get('isDetailsOpen');
  },
});

// Template.body.events({
//   'click .word-details'(event,instance){
//     instance.state.set('isDetailsOpen',true);
