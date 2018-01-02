import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Sentences } from '../../api/sentences/sentences.js';
import { insert, remove, update } from '../../api/sentences/methods.js';

import './sentences.html';

Template.body.onCreated(function appBodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe("sentences.list");

});

Template.word_details.helpers({
  dataDetails(){
    isDetailOpen = Session.get('isDetailsOpen');
    const id = Session.get('wordId');
    if(isDetailOpen && id){
      let count=0;
      const data = Sentences.find({ wordId:id } , {sort : { createdAt: -1 }}).map(function(item){
        count++;
        return _.extend(item, {rowCount: count});
      });
      return data;
    }
  },
});

Template.word_details.events({
  'submit .new-sentence'(event){
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;
    const wordId = Session.get('wordId');

    insert.call({
      wordId,
      text,
    });
    target.text.value = '';
  },
  'click #sentenceEdit'(event){
    
  },
  'click #sentenceDelete'(event){
    if(confirm('Are you sure? You are deleting: '+this.text)){
      remove.call({
        _id:this._id,
        wordId:this.wordId,
      });
    };
  },
});
