import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl: string = 'http://localhost:3001/items';

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {

  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  create(item: Item): Observable<Item> {
    return this.httpClient.post<Item>(this.baseUrl, item);
  }

  getAll(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.baseUrl);
  }
}
