import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
//import { ReactiveDict } from 'meteor/reactive-dict';

import './workToday.html';

import './dayWorks.js';
import './weekWorks.js';
import './monthWorks.js';

Template.work_Today.onCreated(function appBodyOnCreated() {
  //this.state = new ReactiveDict();

});

Template.work_Today.helpers({
});

Template.work_Today.events({
  'click .word-details'(event,instance){
    Session.set('isDetailsOpen',true);
    Session.set('wordId',this._id);
  },
});
