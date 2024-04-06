import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  private favouritesItemSource = new BehaviorSubject<any[]>([]);

  favItem$ = this.favouritesItemSource.asObservable();

  constructor() { }

  storeFavourites(item: any) {
    this.favouritesItemSource.next([...this.favouritesItemSource.value, item]);
  }

  removeFavourites(items: any) {
    const favItemsArray = this.favouritesItemSource.getValue();
    favItemsArray.forEach((fav: any, index) => {
      if(fav.id == items.id) {
        favItemsArray.splice(index, 1);
      }
    })
    this.favouritesItemSource.next(favItemsArray);
  }

}
