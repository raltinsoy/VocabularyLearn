import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Words } from '../../api/words/words.js';
import { insert, remove } from '../../api/words/methods.js';

import './app-body.html';

Template.body.onCreated(function appBodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe("words.list");
});

Template.body.helpers({
  words(){
    return Words.find({},{ sort: { createdAt: -1 } });
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
  'click #wordDelete'(event){
    if(confirm('Are you sure? You are deleting: '+this.text)){
      remove.call({
        _id:this._id,
      });
    };
  },
});
