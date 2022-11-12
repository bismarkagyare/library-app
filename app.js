class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI CLASS: to handle UI tasks

class UI {
  static displayBooks () {

    const books = Store.getBooks();
    books.forEach(book => {
      UI.addBookToList(book);
    });
  };

  static addBookToList(book) {
    const bookList = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    bookList.appendChild(row);
  }

  static deleteBook(element) {
    if(element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.getElementById("book-form");
    container.insertBefore(div, form);

    // alert should disappear in 2 seconds
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBooks(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBooks(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event: display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Add a book
const form = document.getElementById("book-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  //validate form
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("fill in the form", "danger");
  } else {
    const book = new Book(title, author, isbn);
    UI.addBookToList(book);
    // add book to store
    Store.addBooks(book);
    UI.showAlert("Book Added", "success");
    UI.clearFields();
  }

});

// Remove a book
const bookRow = document.getElementById("book-list");
bookRow.addEventListener("click", (e) => {
  UI.deleteBook(e.target);
  // remove from local storage
  Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
  UI.showAlert("Book Removed", "success");
});