import { Meteor } from 'meteor/meteor';

import { Sentences } from '../sentences.js';

Meteor.publish('sentences.list',function sentencesPublic(){
  return Sentences.find();
});
