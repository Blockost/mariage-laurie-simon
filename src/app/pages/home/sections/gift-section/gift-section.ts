import { Component } from '@angular/core';
import { HOME_CONTENT } from '../../../../content/home-content';

@Component({
  selector: 'app-gift-section',
  imports: [],
  templateUrl: './gift-section.html',
  styleUrl: './gift-section.scss',
})
export class GiftSection {
  protected readonly content = HOME_CONTENT.gift;
}
