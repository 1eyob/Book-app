import { Component, Input, OnInit } from '@angular/core';
import { Book, BuyRentService } from '../buy-rent.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {


  @Input() bookList: any[] = []
  filteredBooks: any[] = []
  searchTerm: string = ' ';
  constructor(
    private backeEndService: ApiService, private favoritesService: BuyRentService) {
      this.favoritesService.getBookCount();
    }

  favoritesList: Book[] = [];
  boughtList: Book[] = [];

  ngOnInit() {
    // this.getBooks();
    this.favoritesList = this.favoritesService.getRentes();
    this.boughtList = this.favoritesService.getbuyes();
    this.updateBookCount();
    // this.bookList.length=9;
  }
  getBooksList() {
    if (this.searchTerm == '') {
      this.searchTerm = 'yes'
    };
    this.backeEndService.searchBookList(this.searchTerm).subscribe((booksList) => {
      this.filteredBooks = booksList.docs;

      console.log(this.filteredBooks);
      this.filteredBooks.length = 10;

      this.filteredBooks = this.filteredBooks.map(book => {
        book.coverImg = this.getCoverUrl(book);
        book.authorImg = this.getAuthorUrl(book);
        return book;
      })
    });
  }

  getCoverUrl(book: any) {
    if (!book.cover_edition_key) {
      return;
    }
    return 'https://covers.openlibrary.org/b/olid/' + book.cover_edition_key + '-M.jpg'
  }
  getAuthorUrl(book: any) {
    if (!book.cover_edition_key) {
      return;
    }
    let olid = book.author_key
    return 'https://covers.openlibrary.org/a/olid/' + olid + '-S.jpg'
  }

  likedIcon(isliked: boolean, book: Book) {
    if (isliked)
      return this.favoritesList.includes(book);
    else {
      return !this.favoritesList.includes(book);
    }
  }

  unLiked(book: Book) {
    this.favoritesService.removeRent(book);
    // this.favs = this.favs.filter(pokeId => pokeId !== id);
  }
  liked(book: Book) {
    this.favoritesService.addrent(book);
  }

  buyIcon(isliked: boolean, book: Book) {
    if (isliked)
      return this.boughtList.includes(book);
    else {
      return !this.boughtList.includes(book);
    }
  }
  unBuy(book: Book) {
    this.favoritesService.removeBuy(book);
    // this.favs = this.favs.filter(pokeId => pokeId !== id);
  }
  buy(book: Book) {
    this.favoritesService.addbuy(book);
  }
  private updateBookCount() {
    const rentedCount = this.favoritesService.getRentes().length;
    const boughtCount = this.favoritesService.getbuyes().length;
    this.favoritesService.setBookCount(rentedCount + boughtCount);
  }

}
