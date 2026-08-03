import { Component } from '@angular/core';
import { HOME_CONTENT } from '../../../../content/home-content';
import { RevealOnScroll } from '../../../../shared/reveal-on-scroll';

@Component({
  selector: 'app-gift-section',
  imports: [RevealOnScroll],
  templateUrl: './gift-section.html',
  styleUrl: './gift-section.scss',
})
export class GiftSection {
  protected readonly content = HOME_CONTENT.gift;
}
