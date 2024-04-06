import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { NavService } from '../../services/nav.service';
import { delay, of, tap } from 'rxjs';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  albumData: any = [];
  loading: boolean = false;
  pageIndex: number = 1;
  maxLimit: number = 10;
  favAlbums: any;
  stopLoading: boolean = true;
  scrollContainer: any;

  constructor(private _apiCallService: ApiCallService, private _navService: NavService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    const self = this;
    this.scrollContainer = this.elementRef.nativeElement.querySelector('.scroll-container');
    self.loading = true;
    const page = self.maxLimit * self.pageIndex - self.maxLimit;
    self.getFavouriteItems();
    self.loadAlbumns(page);
  }

  getFavouriteItems() {
    const self = this;
    self._navService.favItem$.subscribe((favItems: any) => {
      self.favAlbums = favItems ? favItems : '';
      if (self.albumData.length > 0) {
        self.checkForFavourites();
      }
    })
  }

  loadAlbumns(page: number) {
    const self = this;
    self._apiCallService.listAlbums(page, self.maxLimit).subscribe((response) => {
      if (response?.length > 0) {
        self.albumData = response;
        self.albumData.map((item: any) => {
          item['disableFavBtn'] = false;
        });
        self.checkForFavourites();
        self.loading = false;
      } else {
        self.loading = false;
      }
    }, (error) => {
      console.log(error);
    })
  }

  checkForFavourites() {
    const self = this;
    if (self.favAlbums.length > 0) {
      self.favAlbums.forEach((favItem: any) => {
        self.albumData.forEach((albumItem: any) => {
          if (favItem.id == albumItem.id) {
            albumItem['disableFavBtn'] = true;
          }
        })
      })
    }
  }

  addToFavourites(album: any, indexAlbum: number) {
    const self = this;
    self._navService.storeFavourites(album);
    self.albumData[indexAlbum]['disableFavBtn'] = true
  }

  // Method to detect when the user has scrolled to the bottom of the list
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (!this.stopLoading) {
      return;
    }
    const element = this.scrollContainer;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      console.log("bottom of the page");
      this.pageIndex += 1;
      console.log("page index > ", this.pageIndex);
      this.loadMoreAlbumns(this.pageIndex)
    }
  }

  loadMoreAlbumns(page: number) {
    const self = this;
    let previousAlbumData = self.albumData;
    self.albumData = [];
    self._apiCallService.listAlbums(page, self.maxLimit).subscribe((response) => {
      if (response?.length > 0) {
        response.map((item: any) => {
          item['disableFavBtn'] = false;
        });
        self.albumData = previousAlbumData.concat(response);
        self.checkForFavourites();
        self.stopLoading = false;
      } else {
        self.stopLoading = true;
      }
    }, (error) => {
      self.stopLoading = true;
      console.log(error);
    })
  }

}
