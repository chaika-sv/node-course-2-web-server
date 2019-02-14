const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


//  key-value pairs
//  we set which view-engine we want to use
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });

  next();
})

// app.use((req, res, next) => {
//   res.render('maintance.hbs');
// })

app.use(express.static(__dirname + '/public'));         //  __dirname - path to web-server dir
        //app.use(express.static('public'));                    //  also works
        //app.use('/static', express.static('public'));         //  to call as http://localhost:3000/static/help.html


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Root Page',
    welcomeMessage: 'Hi there!',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMEssage: 'Some error'
  });
});


app.listen(3000, () => {
  console.log('Server is up on the port 3000');
});
