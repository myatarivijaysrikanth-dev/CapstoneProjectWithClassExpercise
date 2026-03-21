import dispatcher from "../dispatcher/Dispatcher";
import { EventEmitter } from "events";

class BookStore extends EventEmitter {
  constructor() {
    super();
    this.books = JSON.parse(localStorage.getItem("books")) || [];
  }

  getBooks() {
    return this.books;
  }

  addBook(book) {
    this.books.push(book);
    localStorage.setItem("books", JSON.stringify(this.books));
    this.emit("change");
  }
}

const store = new BookStore();

dispatcher.register((action) => {
  switch (action.type) {
    case "ADD_BOOK":
      store.addBook(action.payload);
      break;

    default:
      break;
  }
});

export default store;
