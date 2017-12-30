/**
 * Created by SLEEK on 11/30/2017.
 */
let express = require('express');
// // Import index action from movies controller
let contacts = require('../../controllers/contacts');
// Initialize the router
let router = express.Router();
// // Handle /movies.json route with index action from movies controller
router.route('/contacts').get(contacts.index);
router.route('/contact/:id').get(contacts.single);
router.route('/contact/new').post(contacts.save);
router.route('/contact/:id').put(contacts.update);
router.route('/contact/:id').delete(contacts.delete);
// console.log(test);
module.exports = router;