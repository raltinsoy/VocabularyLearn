// import {Meteor} from 'meteor/meteor';
//
// /*import { ValidatedMethod } from 'meteor/mdg:validated-method';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';
// import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';*/
//
// import {Words} from './words.js';
//
// export const insert = new ValidatedMethod({
//   name:'words.insert',
//   //validate: Todos.simpleSchema().pick(['listId', 'text']).validator({ clean: true, filter: false }),
//   run({ listId, text }) {
//     const list = Lists.findOne(listId);
//
//     /*if (list.isPrivate() && list.userId !== this.userId) {
//       throw new Meteor.Error('todos.insert.accessDenied',
//         'Cannot add todos to a private list that is not yours');
//     }*/
//
//     const word = {
//       listId,
//       text,
//       //checked: false,
//       createdAt: new Date(),
//     };
//
//     Words.insert(word);
//   },
// });
