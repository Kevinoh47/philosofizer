// Third-party Libs
const express = require('express');
const methodOverride = require('method-override');

// Esoteric Libs
const siteRoutes = require('./site-routes.js');
const categoryRoutes = require('./category-routes.js');

const app = express();

// ejs template engine
app.set('view engine', 'ejs');

// Middleware
// turns form submission into an object
app.use(express.urlencoded({ extended: true }));

// To override HTTP GET, POST for REST methods GET, POST, PUT, PATCH, DELETE
app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

// Static pages
app.use(express.static('./public'));

// Dynamic Routes
app.use(siteRoutes);
app.use(categoryRoutes);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Server up and listening on ${PORT}`));
  },
};
