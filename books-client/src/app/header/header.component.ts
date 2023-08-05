import { Component, OnInit } from '@angular/core';
import { BuyRentService } from '../buy-rent.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  bookCount = 0;
  constructor(public buyservise: BuyRentService) {}

  ngOnInit() {
    this.updateBookCount();
    console.log(this.bookCount);
  }

  private updateBookCount() {
    const rentedCount = this.buyservise.getRentes().length;
    const boughtCount = this.buyservise.getbuyes().length;
    this.bookCount = rentedCount + boughtCount;
  }
}
