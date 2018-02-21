import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Sentences } from '../../api/sentences/sentences.js';
import { Words } from '../../api/words/words.js';
import { insert, remove, update } from '../../api/sentences/methods.js';

import './sentences.html';

Template.body.onCreated(function appBodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe("sentences.list");
  Meteor.subscribe("words.list");

});

Template.word_details.helpers({
  dataDetails(){
    const isDetailOpen = Session.get('isDetailsOpen');
    const id = Session.get('wordId');
    if(isDetailOpen && id){
      let count=0;
      const data = Sentences.find({ wordId:id } , {sort : { createdAt: -1 }}).map(function(item){
        count++;
        return _.extend(item, {rowCount: count});
      });
      return data;
    }
    return null;
  },
  wordGet(){
    const id = Session.get('wordId');
    if(id){
      return Words.findOne(id);
    }
    return null;
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
  'submit .edit-sentence'(event){  ////////////////////////////////kalınan yer
    event.preventDefault();
    update.call({
      _id:this._id,
      wordId:this.wordId,
      text:event.target.text.value // new sentence
    });
    var parent = document.getElementsByClassName("sentenceConvertToInput")[0];
    var child = document.getElementsByClassName("edit-sentence")[0];
    child.remove();
    parent.innerHTML = event.target.text.value;
  },
  'click #sentenceEdit'(event){
    event.preventDefault();

    const tdDom = document.getElementsByClassName("sentenceConvertToInput")[this.rowCount-1];
    tdDom.innerHTML='<form class="edit-sentence form-search">'+
                      '<div class="input-append">'+
                        '<input name="text" class="input-medium search-query" type="text" value="'+this.text+'">'+
                        '<button type="submit" class="btn">Add</button>'+
                    '</div></form>';
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
