//require modules.
const express = require("express");
const app = express();
const port = process.argv[2] || 8080; //Set it up port number.
var bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

app.use(bodyParser.urlencoded({ extended: false }));

//linking public folder.
app.use(express.static("public"));
//requiring ejs.
app.set("view engine", "ejs");

//Stablishing endpoint 1 and passing the data on it.
app.get("/", (req, res) => {
  res.render("index", {
    moviesArr: moviesObjs
  });
});

app.get("/movie/:movieId", (req, res) => {
  let { movieId } = req.params;
  res.render("movie", {
    moviesObjs,
    movieId
  });
});

app.get("/search", function(req, res) {
  let keymovie = req.query.searchTerm;
  const moviesResult = moviesObjs.filter(movie => {
    return movie.title.toLowerCase().includes(keymovie.toLowerCase());
  });
  res.render("index", {
    moviesArr: moviesResult
  });
});

//Listening to port
app.listen(8080, () => {
  console.log(`Server Started on http://localhost:${port}`);
  console.log("Press CTRL + C to stop server");
});

//Movie Database
const moviesObjs = [
  {
    id: 0,
    title: "Blade Runner",
    year: "1982",
    rated: "R",
    released: "25 June 1982",
    runtime: "1h 57min",
    genre: "Sci-Fi, Thriller",
    director: "Ridley Scott",
    writer: "Hampton Fancher, David Peoples",
    actors: "Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos",
    plot:
      "A blade runner must pursue and try to terminate four replicants who stole a ship in space and have returned to Earth to find their creator.",
    language: "English",
    country: "USA, Hong Kong",
    image: "/images/bladeRunner.jpg"
  },
  {
    id: 1,
    title: "The Martian",
    year: "2015",
    rated: "12",
    released: "25 June 1982",
    runtime: "2h 21m",
    genre: "Sci-Fi, Drama",
    director: "Ridley Scott",
    writer: "Andy Weir",
    actors: "Matt Damon, Jessica Chastain, Kristen Wiig",
    plot:
      "During a manned mission to Mars, Astronaut Mark Watney is presumed dead after a fierce storm and left behind by his crew. But Watney has survived and finds himself stranded and alone on the hostile planet. With only meager supplies, he must draw upon his ingenuity, wit and spirit to subsist and find a way to signal to Earth that he is alive.",
    language: "English",
    country: "USA, Hong Kong",
    image: "/images/themartian.jpeg"
  },
  {
    id: 2,
    title: "Total Recall",
    year: "1990",
    rated: "14",
    released: "3 October 1990",
    runtime: "1h 53min",
    genre: "Sci-Fi, Action, Thriller",
    director: "Paul Verhoeven",
    writer: "Philip K. Dick",
    actors: "Arnold Schwarzenegger, Sharon Stone, Michael Ironside",
    plot:
      "When a man goes for virtual vacation memories of the planet Mars, an unexpected and harrowing series of events forces him to go to the planet for real - or does he?",
    language: "English",
    country: "USA",
    image: "/images/totalrecall.jpeg"
  },
  {
    id: 3,
    title: "Ex Machina",
    year: "2014",
    rated: "14",
    released: "8 May 2015",
    runtime: "1h 48min",
    genre: "Sci-Fi, Drama, Mystery",
    director: "Alex Garland",
    writer: "Alex Garland",
    actors: "Alicia Vikander, Domhnall Gleeson, Oscar Isaac",
    plot:
      "A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a breath-taking humanoid A.I.",
    language: "English",
    country: "UK",
    image: "/images/exmachina.jpeg"
  },
  {
    id: 4,
    title: "2001 The Space Odyssey",
    year: "1968",
    rated: "G",
    released: " 29 April 1968",
    runtime: "2h 29min ",
    genre: "Sci-Fi, Adventure",
    director: "Stanley Kubrick",
    writer: "Stanley Kubrick",
    actors: "Keir Dullea, Gary Lockwood, William Sylvester",
    plot:
      "Humanity finds a mysterious, obviously artificial object buried beneath the Lunar surface and, with the intelligent computer H.A.L. 9000, sets off on a quest.",
    language: "English",
    country: "USA",
    image: "/images/2001.jpg"
  }
];



//tring to figure out the error handling.

app.get("/search", (req, res, err) => {
  if (err) {
    console.log(err);
    moviesResult = [];
    res.render("index", {
      moviesArr: moviesResult
    });
  } else {
    let keymovie = req.query.searchTerm;
    const moviesResult = moviesObjs.filter(movie => {
      return movie.title
        .split(" ")
        .join("")
        .toLowerCase()
        .includes(keymovie.toLowerCase());
    });
    res.render("index", {
      moviesArr: moviesResult
    });
  }
});