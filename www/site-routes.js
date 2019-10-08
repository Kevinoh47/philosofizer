// Third-party Libs
const express = require('express');
// const superagent = require('superagent');

// const API = process.env.API_URL || 'http://localhost:3000';
const router = express.Router();

// Route runner functions
function homePage(request, response) {
  response.render('site', { page: './pages/home', title: 'Thoughtful' });
}


// routes
router.get('/', homePage);

// Module Exports 
module.exports = router;
