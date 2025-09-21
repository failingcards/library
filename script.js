const myLibrary = [];

function Book(name, author, pages, read) {
    this.id = crypto.randomUUID()
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(name, author, pages, read) {
    const newBook = new Book(name, author, pages, read);
    myLibrary.push(newBook);
}