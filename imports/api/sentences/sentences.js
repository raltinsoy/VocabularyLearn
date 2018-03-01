import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class SentencesCollection extends Mongo.Collection{
  insert(doc, callback){
    const ourDoc = doc;
    ourDoc.createdAt = ourDoc.createdAt||new Date();
    const result = super.insert(ourDoc,callback);

    return result;
  }
  update(selector, modifier) {
    const result = super.update(selector, modifier);
    return result;
  }
  remove(selector) {
    const result = super.remove(selector);
    return result;
  }
}

export const Sentences = new SentencesCollection('sentences');
