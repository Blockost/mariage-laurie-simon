import { Component } from '@angular/core';
import { HOME_CONTENT } from '../../../../content/home-content';

@Component({
  selector: 'app-location-section',
  imports: [],
  templateUrl: './location-section.html',
  styleUrl: './location-section.scss',
})
export class LocationSection {
  protected readonly content = HOME_CONTENT.location;
}
