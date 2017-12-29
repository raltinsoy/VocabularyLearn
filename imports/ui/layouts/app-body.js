import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
//import { ReactiveDict } from 'meteor/reactive-dict';

import { Words } from '../../api/words/words.js';
//import { insert } from '../../api/words/methods.js';

import './app-body.html';

// Template.App_body.onCreated(function appBodyOnCreated() {
  //this.state = new ReactiveDict();
// });

Template.body.helpers({
  words(){
    return Words.find({});
  },

/*  'click ..js-new-list'(){
    insert.call({
      listId:this.list()._id,
      text:$input.val(),
    }, displayError);
  }*/
});
