
function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookInfo = function() {
        return `${title} by ${author}, ${pages}, ${read}`
    }
}

const book = new Book("GOT", "George RR Martin", 456 + " pages", "not read yet!");
console.log(book.bookInfo());