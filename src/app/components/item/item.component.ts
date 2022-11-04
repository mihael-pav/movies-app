import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { IMAGE_SIZES } from '../../constants/image-sizes';
import { Tv } from 'src/app/models/tv';
@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() movieData: Movie | null = null;
  @Input() tvData: Tv | null = null;

  imageSizes = IMAGE_SIZES;

  constructor() {}

  ngOnInit(): void {}
}
