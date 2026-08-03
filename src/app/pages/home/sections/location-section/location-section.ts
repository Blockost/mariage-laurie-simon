import { Component } from '@angular/core';
import { HOME_CONTENT } from '../../../../content/home-content';
import { RevealOnScroll } from '../../../../shared/reveal-on-scroll';

@Component({
  selector: 'app-location-section',
  imports: [RevealOnScroll],
  templateUrl: './location-section.html',
  styleUrl: './location-section.scss',
})
export class LocationSection {
  protected readonly content = HOME_CONTENT.location;
}
