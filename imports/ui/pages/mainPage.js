import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
//import { ReactiveDict } from 'meteor/reactive-dict';

import './mainPage.html';
import '../components/mainPage/wordList.js'; // word_edit
import '../components/mainPage/sentences.js'; // word_details
import '../components/mainPage/currentWorks.js';
import '../components/mainPage/workToday.js';

Template.main_page.onCreated(function appBodyOnCreated() {
  //this.state = new ReactiveDict();

  Session.setDefault({
    isEditing:false,
    tmpWord:null,
    isDetailsOpen:false,
    wordId:null,
    whichRowId:null,
    isReadySubWords:false,
    isReadySubSentences:false,
  });

  this.subscribe('words.list',function(){
    Session.set("isReadySubWords",true);
  });

  this.subscribe("sentences.list",function(){
    Session.set("isReadySubSentences",true);
  });

});

Template.main_page.helpers({
  isReadySubWords(){
    return Session.get("isReadySubWords");
  },
  isReadySubSentences(){
    return Session.get("isReadySubSentences");
  },
  isEditing(){

    return Session.get('isEditing');
  },
  isDetailsOpen(){
    return Session.get('isDetailsOpen');
  },
});
