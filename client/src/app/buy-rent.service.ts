import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export interface Book {
  id:number;
  name: string;
  sprite: string;
  image: string;
  editMode:boolean;
  types:[]
}
@Injectable({
  providedIn: 'root'
})
export class BuyRentService {

  private rentBooks: Book[] = [ ];
  private buyBooks: Book[] = [ ];
  bookCount:number= this.rentBooks.length + this.buyBooks.length;

  getRentes(): Book[] {
    return this.rentBooks;
  }

  addrent(book: Book) {
    this.rentBooks.push(book);
  }

  removeRent(book: Book) {
    const index = this.rentBooks.findIndex((fav) => fav.id === book.id);
    if (index !== -1) {
      this.rentBooks.splice(index, 1);
    }
  }

  getbuyes(): Book[] {
    return this.buyBooks;
  }

  addbuy(book: Book) {
    this.buyBooks.push(book);
  }

  removeBuy(book: Book) {
    const index = this.buyBooks.findIndex((fav) => fav.id === book.id);
    if (index !== -1) {
      this.buyBooks.splice(index, 1);
    }
  }
  setBookCount(arg0: number) {
    this.bookCount=arg0
  }
  getBookCount(): number {
    return this.bookCount;
  }

}
