'use strict';

const superagent = require('superagent');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;
const API = process.env.API_URL || 'http://localhost:3000';

// ejs template engine
app.set('view engine', 'ejs');

// set public for /...
app.use( express.static('./public') );

app.get('/', homePage);

app.get('/cards', cardsPage);

function homePage(request, response) {
  response.render('site', { page: './pages/home', title: 'Our Site: Home' });
}

function cardsPage(request, response) {
  superagent.get(`${API}/cards`)
    .then((data) => {
      console.log(data.body);
      response.render('site', { cards: data.body, page: './pages/cards', title: 'Discussion Cards' });
    })
    .catch(error => console.error(error));
}

app.listen(PORT, () => console.log(`Server up on ${PORT}`));