"use strict";
const express = require("express");
const morgan = require("morgan");

const { top50 } = require("./data/top50");
const { books } = require("./data/books");

const PORT = process.env.PORT || 8000;
const handlePage = (req, res) => {
  res.status(200);
  res.render("pages/top50", {
    title: "Top 50 Songs Streamed on Spotify",
    top50,
  });
};
const handleSong = (req, res) => {
  const number = req.params.number;
  const song = top50[number - 1];
  if (song) {
    res.status(200);
    res.render("pages/songPage", {
      title: `Song #${number}`,
      song,
    });
  } else {
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
};

const handleLibrary = (req, res) => {
  res.status(200);
  res.render("pages/library", {
    title: "My Library",
    books,
  });
};

const handleBook = (req, res) => {
  const id = req.params.id;
  let index = null;
  books.forEach((book) => {
    let bookId = book.id.toString();
    if (bookId === id) {
      index = books.indexOf(book);
    }
  });
  const book = books[index];
  res.status(200);
  res.render("pages/bookPage", {
    title: book.title,
    book,
  });
};
const handleType = (req, res) => {
  const genre = req.params.genre;
  let newList = [];
  books.forEach((book) => {
    if (genre === book.type) {
      newList.push(book);
    }
  });
  res.status(200);
  res.render("pages/bookType", {
    title: genre,
    newList,
  });
};

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here
app.get("/top50", handlePage);
app.get("/top50/song/:number", handleSong);
app.get("/library/", handleLibrary);
app.get("/library/book/:id", handleBook);
app.get("/library/book/type/:genre", handleType);
// handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
