import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, map, forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://openlibrary.org/subjects/picture_books.json';
  private coverUrl = 'https://openlibrary.org/subjects/picture_books.json';

  constructor(private httpClinet: HttpClient) {}

  getBookList(): Observable<any> {
    return this.httpClinet.get(this.baseUrl);
  }
  searchBookList(query: string): Observable<any> {
    const url = 'https://openlibrary.org/search.json?q=' + query;
    return this.httpClinet.get(url);
  }
  getSingleBook(coverId: string): Observable<any> {
    return this.httpClinet.get(this.baseUrl);
  }
}
