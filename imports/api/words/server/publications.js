import { Meteor } from 'meteor/meteor';

import { Words } from '../words.js';

Meteor.publish('words.list',function wordsPublic(){
  return Words.find();
});
