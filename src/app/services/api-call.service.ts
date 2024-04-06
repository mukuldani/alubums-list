import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) { }

  private LIST_API_URL = "https://jsonplaceholder.typicode.com/albums/1/photos";

  listAlbums(page: number = 0, limit: number = 10) {
    const url = this.LIST_API_URL + "?_page=" + page + "&_limit=" + limit;
    return this.http.get<any>(url);
  }

}
