import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
//import { ReactiveDict } from 'meteor/reactive-dict';

import { update } from '../../api/words/methods.js';
import { Words } from '../../api/words/words.js';

import './weekWorks.html';

Template.week_Works.onCreated(function appBodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe("words.list");
});

Template.week_Works.helpers({
  words(){
    return Words.find({ boxNumber:2 },{ sort: { createdAt: -1 } });
  },
});

Template.week_Works.events({
  'click #wordPrev'(event){
      update.call({
        _id:this._id,
        boxNumber:this.boxNumber-1,
      });
  },
  'click #wordNext'(event){
    alert('sonraEklenecek');
      // update.call({
      //   _id:this._id,
      //   boxNumber:this.boxNumber+1,
      // });
  },
});
