//Book Class: Represent a book
class Book{

    constructor(title, author, isbn){ 

        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }

}
//UI CLASS: HENDLE UI
class UI {
    static displayBooks(){
        const books = store.getBook();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
            store.removeBook(el.parentElement.previousElementSibling.textContent);
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}
//STORAGE CLASS: HANDLE STORAGE
class store{
    static getBook() {
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBooks(book){
        let books;
        books = store.getBook();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        let books = store.getBook();
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}
//EVENT: DISPLAY BOOK

document.addEventListener('DOMContentLoaded', UI.displayBooks);

//EVENT: ADD A BOOK

document.querySelector('#book-form').addEventListener('submit', (e) => {
    
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill all the fields', 'danger');
    } else {
        const book = new Book(title, author, isbn);
        UI.addBookToList(book);
        store.addBooks(book);
        UI.clearFields();
        UI.showAlert('Book added', 'success');
    };
})

//EVENT: REMOVE A BOOK
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    UI.showAlert('Book removed', 'success');
})