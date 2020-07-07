const { books } = require("./books");

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
  if (index) {
    const book = books[index];
    res.status(200);
    res.render("pages/bookPage", {
      title: book.title,
      book,
    });
  } else {
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
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

module.exports = { handleBook, handleLibrary, handleType };
