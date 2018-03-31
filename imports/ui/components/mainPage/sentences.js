import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
//import { ReactiveDict } from 'meteor/reactive-dict';

import { Sentences } from '../../../api/sentences/sentences.js';
import { Words } from '../../../api/words/words.js';
import { insert, remove, update } from '../../../api/sentences/methods.js';

import './sentences.html';

Template.body.onCreated(function appBodyOnCreated() {
  //this.state = new ReactiveDict();

});

Template.word_details.helpers({
  dataDetails(){
    const isDetailOpen = Session.get('isDetailsOpen');
    const id = Session.get('wordId');
    const whichRowId = Session.get('whichRowId');

    if(isDetailOpen && id){
      let count=0;
      const data = Sentences.find({ wordId:id } , {sort : { createdAt: -1 }}).map(function(item){
        count++;
        let textChanged = false;
        if(count == whichRowId){
          textChanged = true;
        }
        return _.extend(item, {rowCount: count, isTextChanged: textChanged});
      });
      return data;
    }
    return null;
  },
  wordGet(){
    const id = Session.get('wordId');
    return Words.findOne(id);
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
  'submit .edit-sentence'(event){
    event.preventDefault();

    update.call({
      _id:this._id,
      wordId:this.wordId,
      text:event.target.text.value // new sentence
    });

    Session.set('whichRowId',null);
  },
  'click #sentenceEdit'(event){
    event.preventDefault();

    Session.set('whichRowId',this.rowCount);

  },
  'click #sentenceDelete'(event){
    if(confirm('Are you sure? You are deleting: '+this.text)){
      remove.call({
        _id:this._id,
        wordId:this.wordId,
      });
    };
  },
  'click .close'(event){
    Session.set('isDetailsOpen',false);
  },
});
