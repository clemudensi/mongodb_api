/**
 * Created by SLEEK on 12/9/2017.
 */
var express = require('express');

var histories = require('../../controllers/call-history');

var routerHistory = express.Router();

routerHistory.route('/call-history/').get(histories.index);
routerHistory.route('/dialer').post(histories.save);
routerHistory.route('/dialer/:id').get(histories.single);
routerHistory.route('/dialer/:id').delete(histories.delete);

module.exports = routerHistory;