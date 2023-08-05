import { Book } from '../model/books';

export class AddBook {
  static readonly type = '[Book] Add';

  constructor(public payload: Book) {}
}

export class GetBooks {
  static readonly type = '[Book] Get';
}

export class UpdateBook {
  static readonly type = '[Book] Update';

  constructor(public payload: Book, public id: number) {}
}

export class DeleteBook {
  static readonly type = '[Book] Delete';

  constructor(public id: number) {}
}

export class SetSelectedBook {
  static readonly type = '[Book] Set';

  constructor(public payload: Book) {}
}
