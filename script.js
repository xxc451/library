const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

const cardList = document.querySelector(".card-list");
const newButton = document.querySelector("#new");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const closeButton = document.querySelector("#close");
const addButton = document.querySelector("#add");

function renderLibrary() {
    cardList.textContent = "";
    for (const book of myLibrary) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("card");
        bookCard.dataset.id = book.id;

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
        status.textContent = book.read ? "Status: Read" : "Status: Not Read";
        bookCard.appendChild(status);

        const buttonContainer = document.createElement("div");
        const toggleRead = document.createElement("button");
        toggleRead.textContent = "Toggle Read";
        toggleRead.setAttribute("id", "toggle");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("id", "delete");
        buttonContainer.append(toggleRead, deleteButton);
        bookCard.appendChild(buttonContainer);

        cardList.appendChild(bookCard);
    }
}

newButton.addEventListener("click", () => {
    form.reset();
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

addButton.addEventListener("click", () => {
    if (form.checkValidity()) {
        const formData = new FormData(form);
        const newBook = new Book(formData.get("title"), formData.get("author"), formData.get("pages"), formData.get("read") === "on");
        myLibrary.push(newBook);
        renderLibrary();
    }
});

cardList.addEventListener("click", e => {
    const card = e.target.closest(".card");
    if (!card) {
        return
    }
    const bookId = card.dataset.id;
    switch(e.target.id) {
        case "toggle":
            myLibrary.find(book => book.id === bookId).toggleRead();
            renderLibrary();
            break;
        case "delete":
            const index = myLibrary.findIndex(book => book.id === bookId);
            myLibrary.splice(index, 1);
            card.remove();
            break;
    }
});


addBookToLibrary("The Catcher in the Rye", "J. D. Salinger", 234, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);

renderLibrary();