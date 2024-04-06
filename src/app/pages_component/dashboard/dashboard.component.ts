import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading: boolean = false;
  favoutieAlbums: any;

  constructor(private _navService: NavService) { }

  ngOnInit(): void {
    this.getFavouriteAlbums();
  }

  getFavouriteAlbums() {
    const self = this;
    self._navService.favItem$.subscribe((response) => {
      self.favoutieAlbums = response;
    })
  }

  removeItemFavourites(item: any) {
    const self = this;
    self._navService.removeFavourites(item);
  }

}
