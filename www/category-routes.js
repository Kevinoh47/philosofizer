'use strict';

// Third-party Libs
const express = require('express');
const superagent = require('superagent');

const API = process.env.API_URL || 'http://localhost:3000';
const router = express.Router();

// Route runner functions

function cardsPage(request, response) {
  superagent.get(`${API}/cards`)

    // note: since data that we get back is array, can use .map etc to transform it...
    .then((data) => {
      console.log(data.body);

      response.render('site', { cards: data.body, page: './pages/cards', title: 'Discussion Cards' });
    })
    .catch(error => console.error(error));
}

function productsPage(request, response) {
  superagent.get(`${API}/products`)
    .then((data) => {
      response.render('site', { page: './pages/products', title: 'Products', items: data.body });
    })
    .catch((error) => {
      response.render('site', { page: './pages/error', title: 'Error', error: error });
    });
}

function deleteProduct(request, response) {
  response.send(`DELETING ITEM ${request.body._id}`);

  superagent.delete(`${API}/products/${request.body._id}`)
    .then(() => {
      response.redirect('./products');
    })
    .catch((error) => {
      response.render('site', { page: './pages/error', title: 'Error', error: error });
    });
}

// routes
router.get('/cards', cardsPage);
router.get('/products', productsPage);
router.delete('/products', deleteProduct);

// Module Exports 
module.exports = router;
