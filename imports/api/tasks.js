import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Words = new Mongo.Collection('words');
