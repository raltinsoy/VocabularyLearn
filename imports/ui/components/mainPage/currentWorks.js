import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Words } from '../../../api/words/words.js';

import './currentWorks.html';

Template.current_Works.onCreated(function appBodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.current_Works.helpers({
    words() {
        var startDate = moment().startOf('day').format('MM/DD/YYYY');
        var endDate = moment().add(1, 'days').format('MM/DD/YYYY');
        return Words.find({ workDay: { $gte: startDate, $lt: endDate }
        }, { sort: { createdAt: -1 } });
  },
});

Template.current_Works.events({
  'click .word-edit'(event,instance){
    // instance.state.set('isEditing',true);
    const tmpWord={_id:this._id,text:this.text,boxNumber:this.boxNumber,remindDate:this.remindDate};
    // instance.state.set('tmpWord',tmpWord);
    Session.set('isEditing',true);
    Session.set('tmpWord',tmpWord);
  },
});
