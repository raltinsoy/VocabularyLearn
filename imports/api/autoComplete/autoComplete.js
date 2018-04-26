import {Meteor} from 'meteor/meteor';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
/*import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';*/

export const containSearch = new ValidatedMethod({
  name:'containSearch',
  validate: new SimpleSchema({
    text:{type:String,},
  }).validator(),
  run({ text }) {

    /*if (list.isPrivate() && list.userId !== this.userId) {
      throw new Meteor.Error('todos.insert.accessDenied',
        'Cannot add todos to a private list that is not yours');
    }*/

    // var convertAsyncToSync  = Meteor.wrapAsync( HTTP.get ),
    //     resultOfAsyncToSync = convertAsyncToSync( 'http://rep.somee.com/Service/Words/dog', {} );
    //
    //   return resultOfAsyncToSync;

    if(Meteor.isServer){
      var url = "http://rep.somee.com/Service/Words/" + text;
      var result = HTTP.call("GET",url,{});
      return result;
    }



  },
});

/*export const fullTextSearch = new ValidatedMethod({
  name:'words.fullTextSearch',
  validate:new SimpleSchema({
    text:{type:String,},
  }).validator(),
  run({text}){

    SearchWords.find({text});
  },
});*/
