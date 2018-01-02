import {Meteor} from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
/*import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';*/

import { Words } from '../words/words.js'; // for WordCheck
import { Sentences } from './sentences.js';

export const insert = new ValidatedMethod({
  name:'sentences.insert',
  validate: new SimpleSchema({
    wordId:{type:String,},
    text:{type:String,},
  }).validator(),
  run({ wordId,text }) {

    const word = Words.find(wordId).count();

    if (word === 0) {
      throw new Meteor.Error('todos.insert.accessDenied',
        'Cannot add. There is no word.');
    }

    const sentence = {
      wordId,
      text,
      createdAt: new Date(),
    };

    Sentences.insert(sentence);
  },
});

export const update = new ValidatedMethod({
  name:'sentences.update',
  validate:new SimpleSchema({
    _id:{type:String,},
    wordId:{type:String,},
    text:{type:String,},
  }).validator(),
  run({_id,wordId,text}){
    // if (wordId === 0) {
    //   throw new Meteor.Error('todos.insert.accessDenied',
    //     'Cannot add. There is no word.');
    // }
    Sentences.update(_id,{
      $set:{text:text},
    },);
  },
});

export const remove = new ValidatedMethod({
  name:'senteces.remove',
  validate: new SimpleSchema({
    _id:{type:String,},
    wordId:{type:String,},
  }).validator(),
  run({ _id,wordId }) {
    const word = Sentences.find({wordId:wordId}).count();

    if (word === 0) {
      throw new Meteor.Error('todos.remove.accessDenied',
        'Cannot add. There is no word.');
    }
    Sentences.remove(_id);
  },
});
