import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Book } from '../model/books';
import {
  AddBook,
  DeleteBook,
  GetBooks,
  SetSelectedBook,
  UpdateBook,
} from '../actions/book.action';
import { tap } from 'rxjs/operators';

export class BookStateModel {
  books!: Book[];
  selectedBook!: Book;
}

@State<BookStateModel>({
  name: 'books',
  defaults: {
    books: [],
    selectedBook: null,
  },
})
export class BookState {
  constructor(private bookService: BookService) {}

  @Selector()
  static getBookList(state: BookStateModel) {
    return state.books;
  }

  @Selector()
  static getSelectedBook(state: BookStateModel) {
    return state.selectedBook;
  }

  @Action(GetBooks)
  getBooks({ getState, setState }: StateContext<BookStateModel>) {
    return this.bookService.fetchBooks().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          books: result,
        });
      })
    );
  }

  @Action(AddBook)
  addBook(
    { getState, patchState }: StateContext<BookStateModel>,
    { payload }: AddBook
  ) {
    return this.bookService.addBook(payload).pipe(
      tap((result) => {
        const state = getState();
        patchState({
          books: [...state.books, result],
        });
      })
    );
  }

  @Action(UpdateBook)
  updateBook(
    { getState, setState }: StateContext<BookStateModel>,
    { payload, id }: UpdateBook
  ) {
    return this.bookService.updateBook(payload, id).pipe(
      tap((result) => {
        const state = getState();
        const bookList = [...state.books];
        const bookIndex = bookList.findIndex((item) => item.id === id);
        bookList[bookIndex] = result;
        setState({
          ...state,
          books: bookList,
        });
      })
    );
  }

  @Action(DeleteBook)
  deleteBook(
    { getState, setState }: StateContext<BookStateModel>,
    { id }: DeleteBook
  ) {
    return this.bookService.deleteBook(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.books.filter((item) => item.id !== id);
        setState({
          ...state,
          books: filteredArray,
        });
      })
    );
  }

  @Action(SetSelectedBook)
  setSelectedBookId(
    { getState, setState }: StateContext<BookStateModel>,
    { payload }: SetSelectedBook
  ) {
    const state = getState();
    setState({
      ...state,
      selectedBook: payload,
    });
  }
}
