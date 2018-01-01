import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Words } from '../../api/words/words.js';
import { insert, remove, update } from '../../api/words/methods.js';

import './wordList.html';

Template.word_List.onCreated(function appBodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe("words.list");

});

Template.word_List.helpers({
  words(){
    return Words.find({ boxNumber:0 },{ sort: { createdAt: -1 } });
  },
});


Template.word_List.events({
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
  'click .word-right-move'(event){
    update.call({
      _id:this._id,
      boxNumber:this.boxNumber+1,
    });
  },
});
