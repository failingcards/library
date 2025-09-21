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

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Dune", "Frank Herbert", 688, true);

function displayBooks() {
    const container = document.getElementById("book-container");
    container.innerHTML = "";

    myLibrary.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.className = "book-card";
        bookElement.setAttribute("data-book-id", book.id);
        bookElement.innerHTML = `
            <h3>${book.name}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? "Yes" : "No"}</p>
            <button class="remove-btn" data-book-id="${book.id}">Remove</button>
            <button class="toggle-read-btn" data-book-id="${book.id}">
                ${book.read ? "Mark as Unread" : "Mark as Read"}
            </button>
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

document.getElementById("book-container").addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-btn")) {
        const bookID = event.target.getAttribute("data-book-id");
        const bookIndex = myLibrary.findIndex(book => book.id === bookID);
        myLibrary.splice(bookIndex, 1);
        displayBooks();
    }

    if (event.target.classList.contains("toggle-read-btn")) {
        const bookID = event.target.getAttribute("data-book-id");
        const book = myLibrary.find(book => book.id === bookID);
        book.toggleReadStatus();
        displayBooks();
    }
});

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};