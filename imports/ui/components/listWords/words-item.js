import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ReactiveDict } from 'meteor/reactive-dict';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';

import './words-item.html';
import { Words } from '../../../api/words/words.js';

import {
  updateAllText,
  remove,
} from '../../../api/words/methods.js';

Template.Words_item.onCreated(function wordsItemOnCreated() {
  this.state = new ReactiveDict();
  // this.autorun(() => {
  //   new SimpleSchema({
  //     todo: { type: Todos._helpers },
  //     editing: { type: Boolean, optional: true },
  //     onEditingChange: { type: Function },
  //   }).validate(Template.currentData());
  // });
});

Template.Words_item.helpers({
  checkedClass(word) {
    return word.checked && 'checked';
  },
  editingClass(editing) {
    return editing && 'editing';
  },
});

Template.Words_item.events({
  'focus input[type=text]'() {
    this.onEditingChange(true);
  },

  'blur input[type=text]'() {
    if (this.editing) {
      this.onEditingChange(false);
    }
  },

  'keydown input[type=text]'(event) {
    // ESC or ENTER
    if (event.which === 27 || event.which === 13) {
      event.preventDefault();
      event.target.blur();
    }
  },

  // update the text of the item on keypress but throttle the event to ensure
  // we don't flood the server with updates (handles the event at most once
  // every 300ms)
  'keyup input[type=text]': _.throttle(function wordsItemKeyUpInner(event) {
    const newID = this.word._id;
    const field = event.target.attributes.name.value;
    const value = event.target.value;

    const newtext = (field=="text")?value:this.word.text;
    const newboxNumber = (field=="boxNumber")?value:this.word.boxNumber;
    const newremindDate = (field=="remindDate")?value:this.word.remindDate;
    const newworkDay = (field=="workDay")?value:this.word.workDay;

    updateAllText.call({
      _id: newID,
      text: newtext,
      boxNumber:Number(newboxNumber),
      remindDate:newremindDate,
      workDay:newworkDay,
    });
  }, 300),

  // handle mousedown otherwise the blur handler above will swallow the click
  // on iOS, we still require the click event so handle both
  'mousedown .js-delete-item, click .js-delete-item'() {
    remove.call({
      _id: this.word._id,
    });
  },
});
