import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { updateText } from '../../api/words/methods.js';

import '../../../public/bootstrap/css/bootstrap.css';

import './app-body.html';
import '../components/wordList.js';
import '../components/dayWorks.js';
import '../components/weekWorks.js';

Template.body.onCreated(function appBodyOnCreated() {
  this.state = new ReactiveDict();

  const instance = Template.instance();
  instance.state.setDefault({
    isEditing:false,
    tmpWord:null,
  });
});

Template.body.helpers({
  isEditing(){
    const instance = Template.instance();
    return instance.state.get('isEditing');
  },
  tmpWord(){
    const instance = Template.instance();
    return instance.state.get('tmpWord');
  },
});

Template.body.events({
  'click .word-edit'(event,instance){
    instance.state.set('isEditing',true);
    const tmpWord={_id:this._id,text:this.text,boxNumber:this.boxNumber};
    instance.state.set('tmpWord',tmpWord);
  },
  'submit .updateTask'(event,instance){
    // Prevent default browser form submit
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    console.log(event);
console.log(this.text);
    const boxNumber = Number(target.boxNumber.value);

    const tmpWord=instance.state.get('tmpWord');

    updateText.call({
      _id:tmpWord._id,
      text:text,
      boxNumber:boxNumber,
    });

    instance.state.set('tmpWord','');
    instance.state.set('isEditing',false);
  },
  'click .cancel'(event,instance){
    instance.state.set('tmpWord','');
    instance.state.set('isEditing',false);
  },
});
