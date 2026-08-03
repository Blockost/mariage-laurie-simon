import { Component } from '@angular/core';
import { HOME_CONTENT } from '../../../content/home-content';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly content = HOME_CONTENT.couple;
}
