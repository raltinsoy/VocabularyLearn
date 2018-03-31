import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
//import { ReactiveDict } from 'meteor/reactive-dict';

import { update } from '../../../api/words/methods.js';
import { Words } from '../../../api/words/words.js';

import './weekWorks.html';

Template.week_Works.onCreated(function appBodyOnCreated() {
  //this.state = new ReactiveDict();
});

Template.week_Works.helpers({
  words(){
    var startDate = moment().startOf('day').format('MM/DD/YYYY');
    var endDate = moment().add(1,'days').format('MM/DD/YYYY');
    return Words.find({"$and":[
      {remindDate: {$gte: startDate, $lt: endDate}},
       {boxNumber:2}
    ]},{ sort: { createdAt: -1 }});
  },
});

Template.week_Works.events({
  'click #wordPrev'(event){
      update.call({
        _id:this._id,
        step: '-',
      });
  },
  'click #wordNext'(event){
    update.call({
      _id:this._id,
      step: '+',
    });
  },
});
