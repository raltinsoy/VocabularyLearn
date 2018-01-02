import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import '../../../public/bootstrap/css/bootstrap.css';
import '../../../public/bootstrap/css/bootstrap-responsive.css';

import './app-body.html';
import '../components/wordList.js';
import '../components/dayWorks.js';
import '../components/weekWorks.js';
import '../components/workToday.js';
import '../components/sentences.js'; // word_details

Template.body.onCreated(function appBodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe("words.list");

  Session.setDefault({
    isEditing:false,
    tmpWord:null,
    isDetailsOpen:false,
    wordId:null,
  });
});

Template.body.helpers({
  isEditing(){
    // const instance = Template.instance();
    // return instance.state.get('isEditing');
    return Session.get('isEditing');
  },
  isDetailsOpen(){
    return Session.get('isDetailsOpen');
  },
});

// Template.body.events({
//   'click .word-details'(event,instance){
//     instance.state.set('isDetailsOpen',true);
    //const tmpWord={_id:this._id,text:this.text,boxNumber:this.boxNumber};
    //instance.state.set('tmpWord',tmpWord);
  // },
  // 'submit .updateTask'(event,instance){
  //   // Prevent default browser form submit
  //   event.preventDefault();
  //
  //   const target = event.target;
  //   const text = target.text.value;
  //   const action = target.value;
  //   const boxNumber = Number(target.boxNumber.value);
  //
  //   const tmpWord=instance.state.get('tmpWord'); // WHY !!!!!!!!!!!!!!!!!1
  //
  //   if(action == 'save'){
  //     updateText.call({
  //       _id:tmpWord._id,
  //       text:text,
  //       boxNumber:boxNumber,
  //     });
  //   }
  //   else if(action == 'cancel'){
  //     //nothing
  //   }
  //   instance.state.set('tmpWord','');
  //   instance.state.set('isEditing',false);
  // },
// });
