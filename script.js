
let myLibray = [];

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookInfo = function() {
        return `${title} by ${author}, ${pages}, ${read}`
    }
}

function addBookToLibrary () {
    while(true) {
        let userInput = prompt("add a new book");
        if (userInput === 'q' || userInput === null) {
            break;
        }

        myLibray.push(userInput);
    }
}
