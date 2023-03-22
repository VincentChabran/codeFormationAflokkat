import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiResponce } from './apiResponceModel';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  constructor(private http: HttpClient) {}

  doRequest() {
    return this.http
      .get<ApiResponce>(
        'https://api.goodbarber.net/front/get_items/60094/5794825/?category_index=1'
      )
      .pipe(map((el) => el.items));
  }
}
