const express = require('express');
const app = express();

const routes = require('./controller/routes.js');
app.use('/', routes);

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
