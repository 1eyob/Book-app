import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  bookListObject: any[] = [];
  isBooksReturned: boolean = false;
  constructor(private backEndService: ApiService) {}
  ngOnInit(): void {
    this.getBooksList();
  }
  getBooksList() {
    this.backEndService.getBookList().subscribe((booksList) => {
      this.bookListObject = booksList.works;
      this.bookListObject = this.bookListObject.map((book) => {
        book.coverImg = this.getCoverUrl(book);
        book.authorImg = this.getAuthorUrl(book);
        return book;
      });
      console.log(this.bookListObject);

      this.isBooksReturned = true;
    });
  }

  getCoverUrl(book: any) {
    if (!book.cover_edition_key) {
      return;
    }
    return (
      'https://covers.openlibrary.org/b/olid/' +
      book.cover_edition_key +
      '-M.jpg'
    );
  }
  getAuthorUrl(book: any) {
    if (!book.cover_edition_key) {
      return;
    }
    let olid = book.authors[0].key as string;
    olid = olid.slice(9);
    console.log(olid);

    return 'https://covers.openlibrary.org/a/olid/' + olid + '-S.jpg';
  }
}
