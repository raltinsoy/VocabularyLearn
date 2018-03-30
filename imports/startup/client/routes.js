import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../../ui/layouts/app-body.js';
//import '../../ui/pages/root-redirector.js';
import '../../ui/pages/mainPage.js';
import '../../ui/pages/listAllWords.js';
import '../../ui/pages/app-not-found.js';

FlowRouter.route('/allList', {
  name: 'Words.show',
  action() {
    BlazeLayout.render('App_body', { main: 'allWords_page' });
  },
});

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'main_page' });
  },
});

// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
