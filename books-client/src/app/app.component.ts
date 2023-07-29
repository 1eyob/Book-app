import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'books-app';
  private url: string = 'http://localhost:3000/api/books';
  data: any;
  isLoading: boolean = true;
  showModal = false;
  showBuyModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  closeBuyModal() {
    this.showBuyModal = true;
  }
  showRentModal() {
    this.showModal = false;
  }
  closeRentModal() {
    this.showModal = false;
  }

  buyBook() {
    this.closeModal();
  }
  rentBook() {
    this.closeRentModal();
  }
  ngOnInit(): void {
    fetch(this.url)
      .then((response) => {
        response.json();
      })
      .then((quotesData) => {
        this.isLoading = false;
        this.data = quotesData;
      });
  }
}
