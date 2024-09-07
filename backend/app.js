const express = require('express');
const app = express();
const path = require('path');

const routes = require('./routes/routes.js');
app.use('/', routes);

app.set('views', path.join(__dirname, '../frontend/views'));
app.use(express.static('../frontend/public'));
app.set('view engine', 'ejs');

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
