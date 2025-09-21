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

function displayBooks() {
    const container = document.getElementById("book-container");
    container.innerHTML = "";

    myLibrary.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.innerHTML = `
            <h3>${book.name}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? "Yes" : "No"}</p>
        `
        container.appendChild(bookElement);
    })
}

displayBooks();

document.getElementById("add-book").addEventListener("click", function() {
   const dialog = document.getElementById("book-form-dialog");
   dialog.showModal();
});

document.getElementById("cancel-btn").addEventListener("click", () => {
    const dialog = document.getElementById("book-form-dialog");
    dialog.close();
})

document.getElementById("book-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const pages = document.getElementById("book-pages").value;
    const read = document.getElementById("book-read").checked;

    addBookToLibrary(title, author, pages, read);

    displayBooks();
    document.getElementById("book-form-dialog").close();
    document.getElementById("book-form").reset();
});