import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
//import { ReactiveDict } from 'meteor/reactive-dict';

import { Words } from '../../api/words/words.js';
import { insert } from '../../api/words/methods.js';

import './app-body.html';

// Template.App_body.onCreated(function appBodyOnCreated() {
  //this.state = new ReactiveDict();
// });

Template.body.helpers({
  words(){
    return Words.find({});
  },
});

Template.body.events({
  'submit .new-task'(event){
    // Prevent default browser form submit
    event.preventDefault();
    
    const target = event.target;
    const text = target.text.value;

    insert.call({
      text:text,
    });

    target.text.value='';
  },
});
