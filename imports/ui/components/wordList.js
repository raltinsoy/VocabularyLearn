import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Words } from '../../api/words/words.js';
import { insert, remove, update, updateText } from '../../api/words/methods.js';

import './wordList.html';

Template.word_List.onCreated(function appBodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe("words.list");

  //const instance = Template.instance();
  //instance.state.set('editing',false);
  if(Session.get('editing') && Session.get('tmpWord')){
    Session.set('editing',false);
    Session.set('tmpWord','');
  }

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
  'click .list-todo'(event,instance){
    Session.set('editing', true);
    const tmpWord={_id:this._id,text:this.text,boxNumber:this.boxNumber};
    Session.set('tmpWord',tmpWord);
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

Template.wordEdit.helpers({
  editing(){
    return Session.get('editing');
  },
  tmpWord(){
    return Session.get('tmpWord');
  },
});

Template.wordEdit.events({
  'submit .new-task'(event){
    // Prevent default browser form submit
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    const boxNumber = Number(target.boxNumber.value);

    const tmpWord=Session.get('tmpWord');

    updateText.call({
      _id:tmpWord._id,
      text:text,
      boxNumber:boxNumber,
    });

    target.text.value='';
    Session.set('tmpWord','');
    Session.set('editing',false);
  },
  'click .cancel'(event){
    Session.set('tmpWord','');
    Session.set('editing',false);
  },
});
