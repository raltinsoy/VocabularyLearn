import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Words } from '../../../api/words/words.js';

import './currentWorks.html';

Template.current_Works.onCreated(function appBodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.current_Works.helpers({
  words(){
    return Words.find();
  },
});

Template.current_Works.events({
  'click .word-edit'(event,instance){
    // instance.state.set('isEditing',true);
    const tmpWord={_id:this._id,text:this.text,boxNumber:this.boxNumber,remindDate:this.remindDate};
    // instance.state.set('tmpWord',tmpWord);
    Session.set('isEditing',true);
    Session.set('tmpWord',tmpWord);
  },
});
