const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

const body = document.querySelector("body");

function renderLibrary() {
    for (const book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("card");

        const title = document.createElement("h3");
        title.textContent = book.title;
        bookCard.appendChild(title);

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;
        bookCard.appendChild(author);

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;
        bookCard.appendChild(pages);

        const status = document.createElement("P");
        status.textContent = title.read ? "Read" : "Not Read";
        bookCard.appendChild(status);

        body.appendChild(bookCard);
    }
}

addBookToLibrary("The Catcher in the Rye", "J. D. Salinger", 234, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);

renderLibrary()