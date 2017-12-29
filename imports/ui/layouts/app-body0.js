import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
//import { ReactiveDict } from 'meteor/reactive-dict';

import { Words } from '../../api/tasks.js';

import './app-body0.html';

Template.body.helpers({
  words(){
    return Words.find({});
  },
});
