import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tracker } from 'meteor/tracker';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './listAllWords.html';

import { Words } from '../../api/words/words.js';

import '../components/listWords/words-item.js';

Template.allWords_page.onCreated(function() {
    // Subscribe only the relevant subscription to this page
    this.subscribe('words.list');

    this.state = new ReactiveDict();
    this.state.setDefault({
      editing: false,
      editingWord: false,
    });

    this.editList = () => {
      this.state.set('editing', true);

      // force the template to redraw based on the reactive change
      Tracker.flush();
      // We need to wait for the fade in animation to complete to reliably focus the input
      Meteor.setTimeout(() => {
        this.$('.js-edit-form input[type=text]').focus();
      }, 400);
    };
  });

Template.allWords_page.helpers({
  words(){
    return Words.find({});
  },
  wordArgs(word) {
    const instance = Template.instance();
    return {
      word,
      editing: instance.state.equals('editingWord', word._id),
      onEditingChange(editing) {
        instance.state.set('editingWord', editing ? word._id : false);
      },
    };
  },
  editing() {
    const instance = Template.instance();
    return instance.state.get('editing');
  },
});

Template.allWords_page.events({
  'click .js-cancel'(event, instance) {
    instance.state.set('editing', false);
  },

  'keydown input[type=text]'(event) {
    // ESC
    if (event.which === 27) {
      event.preventDefault();
      $(event.target).blur();
    }
  },

  'blur input[type=text]'(event, instance) {
    // if we are still editing (we haven't just clicked the cancel button)
    if (instance.state.get('editing')) {
      instance.saveList();
    }
  },

  'submit .js-edit-form'(event, instance) {
    event.preventDefault();
    //instance.saveList();
  },

  // handle mousedown otherwise the blur handler above will swallow the click
  // on iOS, we still require the click event so handle both
  'mousedown .js-cancel, click .js-cancel'(event, instance) {
    event.preventDefault();
    instance.state.set('editing', false);
  },

  // This is for the mobile dropdown
  'change .list-edit'(event, instance) {
    const target = event.target;
    if ($(target).val() === 'edit') {
      //instance.editList();
    } else if ($(target).val() === 'delete') {
      //instance.deleteList();
    } else {
      //instance.toggleListPrivacy();
    }

    target.selectedIndex = 0;
  },

  'click .js-edit-list'(event, instance) {
    //instance.editList();
  },

  'click .js-toggle-list-privacy'(event, instance) {
    //instance.toggleListPrivacy();
  },

  'click .js-delete-list'(event, instance) {
    //instance.deleteList();
  },

  'click .js-word-add'(event, instance) {
    instance.$('.js-word-new input').focus();
  },

  'submit .js-word-new'(event) {
    event.preventDefault();

    /*const $input = $(event.target).find('[type=text]');
    if (!$input.val()) {
      return;
    }

    insert.call({
      listId: this.list()._id,
      text: $input.val(),
    }, displayError);

    $input.val('');*/
  },
});
