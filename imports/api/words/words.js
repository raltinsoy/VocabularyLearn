import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class WordsCollection extends Mongo.Collection{
  insert(doc, callback){
    const ourDoc = doc;
    ourDoc.createdAt = ourDoc.createdAt||new Date();
    const result = super.insert(ourDoc,callback);
    return result;
  }
  // update(selector, modifier) {
  //   const result = super.update(selector, modifier);
  //   incompleteCountDenormalizer.afterUpdateTodo(selector, modifier);
  //   return result;
  // }
  remove(selector) {
    const result = super.remove(selector);
    return result;
  }
}

export const Words = new WordsCollection('words');

//Words.schema = new SimpleSchema({  });
//Words.attachSchema(Words.schema);

/*Words.helpers({
  words(){
    return Words.findOne(this.listId);
  },
});
*/
