import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Tv } from 'src/app/models/tv';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-tvs',
  templateUrl: './tvs.component.html',
  styleUrls: ['./tvs.component.scss']
})
export class TvsComponent implements OnInit {
  tvs: Tv[] = [];
  genreId: string = '';
  searchValue: string | null = null;
  constructor(private tvsService: TvService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.searchValue = 'Hello!';

    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getTvByGenre(genreId, 1);
      } else {
        this.getPagedTv(1);
      }
    });
  }

  getPagedTv(page: number, searchKeyword?: string) {
    this.tvsService.searchTvs(page, searchKeyword).subscribe((tv) => {
      this.tvs = tv;
    });
  }

  getTvByGenre(genreId: string, page: number) {
    this.tvsService.getTvsByGenre(genreId, page).subscribe((tv) => {
      this.tvs = tv;
    });
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getTvByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedTv(pageNumber, this.searchValue);
      } else {
        this.getPagedTv(pageNumber);
      }
    }
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedTv(1, this.searchValue);
    }
  }
}
