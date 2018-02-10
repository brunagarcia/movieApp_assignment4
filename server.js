//require modules.
const request = require('request');
const express = require('express');
const partial = require("express-partial");
const fs = require("fs");
const app = express();
const port = process.argv[2] || 8080; //Set it up port number.
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

//using body parser to get info from search
app.use(bodyParser.urlencoded({ extended: false }));
//linking public folder.
app.use(express.static('public')); 
//requiring ejs.
app.set('view engine', 'ejs'); 
//using partials
app.use(partial());


//Getting API from MOVIEDB
var moviesReady = {
  method: "GET",
  url: "https://api.themoviedb.org/4/list/3945",
  qs: { api_key: "c19a709f11ab1e26daed75327d045fc4", page: "1" },
  headers: {
    authorization: "Bearer <<access_token>>",
    "content-type": "application/json;charset=utf-8"
  },
  body: {},
  json: true
};

//Writing file on base in MOVIEDB data.
request(moviesReady, function(error, response, body) {
  if (error) throw error;
    fs.writeFile('movieDb.txt', JSON.stringify(body.results), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');  
  })
});

//Reading file and assigning to variable.
let moviesObjs
fs.readFile("movieDb.txt", (error, data) => {
  if (error) throw error;

  moviesObjs = JSON.parse(data)
});


//Establishing endpoints.
app.get('/', (req, res) => {
  res.render('index', { 
    moviesArr: moviesObjs,
  })
});

app.get("/movie/:movieId", (req, res) => {
  let {movieId} = req.params;
  res.render("movie", {
    moviesObjs,
    movieId,
  })
});

app.get("/search", (req, res,) => {
  let keymovie = req.query.searchTerm;
  const moviesResult = moviesObjs.filter(movie => {
    return movie.title.split(' ').join('').toLowerCase().includes(keymovie.toLowerCase());
  });
  res.render("index", {
    moviesArr: moviesResult
  });
});

// Handle 404
app.use((req, res, next) => {
    if(req.accepts('html') && res.status(404)) {
        res.render('error');
        return;
    }
});


//Listening to port
app.listen(8080, () => {
  console.log(`Server Started on http://localhost:${port}`);
  console.log('Press CTRL + C to stop server');
})

