import { Component } from '@angular/core';
import { HOME_CONTENT } from '../../../content/home-content';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly content = HOME_CONTENT.couple;
}
