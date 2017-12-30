import {Meteor} from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
/*import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';*/

import {Words} from './words.js';

export const insert = new ValidatedMethod({
  name:'words.insert',
  validate: new SimpleSchema({
    text:{type:String,},
  }).validator(),
  run({ text }) {
    //const list = Lists.findOne(listId);

    /*if (list.isPrivate() && list.userId !== this.userId) {
      throw new Meteor.Error('todos.insert.accessDenied',
        'Cannot add todos to a private list that is not yours');
    }*/

    const word = {
      // listId,
      text,
      boxNumber:0,
      createdAt: new Date(),
    };

    Words.insert(word);
  },
});

export const updateText = new ValidatedMethod({
  name:'words.updateText',
  validate:new SimpleSchema({
    _id:{type:String,},
    text:{type:String,},
    boxNumber:{type:Number,},
  }).validator(),
  run({_id,text,boxNumber}){

    Words.update(_id,{
      $set:{
        text:text,
        boxNumber:boxNumber,}
    });
  },
});

export const update = new ValidatedMethod({
  name:'words.update',
  validate:new SimpleSchema({
    _id:{type:String,},
    boxNumber:{type:Number,},
  }).validator(),
  run({_id,boxNumber}){

    const word=Words.findOne(_id);

    if(word.boxNumber !== boxNumber-1 && word.boxNumber !== boxNumber+1){
      throw new Meteor.Error('Birden fazla kutu atlayamazsın!');
    }

    Words.update(_id,{
      $set:{boxNumber:boxNumber},
    },);
  },
});

export const remove = new ValidatedMethod({
  name:'words.remove',
  validate: new SimpleSchema({
    _id:{type:String,},
  }).validator(),
  run({ _id }) {
    Words.remove(_id);
  },
});
