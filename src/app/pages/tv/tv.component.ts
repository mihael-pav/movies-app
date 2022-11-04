import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { IMAGE_SIZES } from 'src/app/constants/image-sizes';
import { Tv, TvVideo, TvImages, TvCredits } from 'src/app/models/tv';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {
  tv: Tv | null = null;
  tvVideos: TvVideo[] = [];
  tvImages: TvImages | null = null;
  tvCredits: TvCredits | null = null;
  imageSizes = IMAGE_SIZES;

  constructor(private route: ActivatedRoute, private tvsService: TvService) {}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getTv(id);
      this.getTvVideos(id);
      this.getTvImages(id);
      this.getTvCredits(id);
    });
  }

  getTv(id: string) {
    this.tvsService.getTv(id).subscribe((TvData) => {
      this.tv = TvData;
    });
  }

  getTvVideos(id: string) {
    this.tvsService.getTvVideos(id).subscribe((TvVideosData) => {
      this.tvVideos = TvVideosData;
    });
  }

  getTvImages(id: string) {
    this.tvsService.getTvImages(id).subscribe((TvImagesData) => {
      this.tvImages = TvImagesData;
    });
  }

  getTvCredits(id: string) {
    this.tvsService.getTvCredits(id).subscribe((TvCreditsData) => {
      this.tvCredits = TvCreditsData;
    });
  }
}
