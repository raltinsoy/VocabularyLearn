import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
//import { ReactiveDict } from 'meteor/reactive-dict';

import { Words } from '../../../api/words/words.js';
import { insert, remove, update, updateText } from '../../../api/words/methods.js';

import './wordList.html';

Template.word_List.onCreated(function () {
  //this.state = new ReactiveDict();

});

Template.word_edit.helpers({
  tmpWord(){
    return Session.get('tmpWord');
  },
});
Template.word_edit.events({
  'submit .updateTask'(event,instance){
    // Prevent default browser form submit
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    const action = target.value;
    const boxNumber = Number(target.boxNumber.value);
    const remind_date = target.remindDate.value;

    const tmpWord=Session.get('tmpWord'); // for _id - which word

    if(action == 'save'){
      updateText.call({
        _id:tmpWord._id,
        text:text,
        boxNumber:boxNumber,
        remindDate:remind_date,
      });
    }
    else if(action == 'cancel'){
      //nothing
    }
    Session.set('tmpWord','');
    Session.set('isEditing',false);
  },
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
          step: '+',
    });
  },
  'click .word-edit'(event,instance){
    // instance.state.set('isEditing',true);
    const tmpWord={_id:this._id,text:this.text,boxNumber:this.boxNumber,remindDate:this.remindDate};
    // instance.state.set('tmpWord',tmpWord);
    Session.set('isEditing',true);
    Session.set('tmpWord',tmpWord);
  },

});
