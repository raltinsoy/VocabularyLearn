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
    remindDate:{type:String,},
  }).validator(),
  run({_id,text,boxNumber,remindDate}){

    Words.update(_id,{
      $set:{
        text:text,
        boxNumber:boxNumber,
        remindDate:remindDate,
      }
    });
  },
});

export const update = new ValidatedMethod({
  name:'words.update',
  validate:new SimpleSchema({
    _id:{type:String,},
    step:{type:String,},
  }).validator(),
    run({ _id, step }) {

        const word = Words.findOne(_id);
        let _remindDate = moment().format('MM/DD/YYYY');
        let _workDay = null;

        if (word.remindDate != null && word.remindDate != _remindDate) {
            throw new Meteor.Error('Date out!');
        }

        if (step == "+") {
            switch (word.boxNumber) {
                case 0:
                    break;
                case 1:
                    _remindDate = moment().add(7, 'days').format('MM/DD/YYYY');
                    _workDay = moment().format('MM/DD/YYYY');
                    break;
                case 2:
                    _remindDate = moment().add(30, 'days').format('MM/DD/YYYY');
                    _workDay = moment().format('MM/DD/YYYY');
                    break;
                case 3:
                    _workDay = moment().format('MM/DD/YYYY');
                    break;
                default:
                    break;
            }
            word.boxNumber++;
        }
        else if (step == "-") {
            switch (word.boxNumber) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    word.boxNumber--;
                    break;
                default:
                    break;
            }
            word.boxNumber--;
        }
        else {
            throw new Meteor.Error('Step error!');
        }

        Words.update(_id, {
            $set: {
                boxNumber: word.boxNumber,
                remindDate: _remindDate,
                workDay: _workDay,
            },
        }, );
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
