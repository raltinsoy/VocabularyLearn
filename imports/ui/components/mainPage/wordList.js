import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Words } from '../../../api/words/words.js';
import { insert, remove, update, updateText } from '../../../api/words/methods.js';
import { containSearch } from '../../../api/autoComplete/autoComplete.js';

import '../../../../client/typeahead.css';
import './wordList.html';

Template.word_List.rendered = (function () {
  Meteor.typeahead.inject(); // for autocomplete
});

Template.word_List.onCreated(function appBodyOnCreate() {
  this.list = new ReactiveVar([]);
  this.searchKey = new ReactiveVar();
  //this.list.set(await callWithPromise('containSearch'));
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

  nba:function(query, sync, callback){
    if(typeof(query) != "undefined") // for first load
    {
      var start= new Date().getTime();

      Meteor.call('containSearch', {text:query}, {}, function(err, res) {
        if (err) {
          console.log(err);
          return;
        }
        if(res.data.r2!==null)
        {
          callback(res.data.r2.map(function(v){ return {value: v}; }));
        }

      });
      var elapsed = new Date().getTime() - start;
      console.log(elapsed);
    }
 },

  selected: function(event, suggestion, datasetName) {

    //seçilince text.value boşalt !!!!!!!!

    const target = event.target;
    //   const text = target.text.value;
    //
    //   insert.call({
    //     text:text,
    //   });
    //
    //target.text.value='';

    console.log("select:"+suggestion.value);
  }
});

Template.word_List.events({
  // character check - input validate
  'keydown #wordSearch'(event){
    if((event.which > 64 && event.which < 91)||(event.which > 96 && event.which < 123)||
        (event.which === 8 || event.which === 13))
    {
      return true;
    }
    return false;
  },

  'submit .new-task'(event){
    event.preventDefault();
    console.log("click:"+event.target.text.value);
    event.target.text.value='';
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
