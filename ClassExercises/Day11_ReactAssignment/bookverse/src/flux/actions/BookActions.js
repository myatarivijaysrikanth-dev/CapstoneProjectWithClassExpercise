import dispatcher from "../dispatcher/Dispatcher";

const BookActions = {

  addBook(book) {
    dispatcher.dispatch({
      type: "ADD_BOOK",
      payload: book
    });
  }
};

export default BookActions;