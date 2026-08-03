import { Component } from '@angular/core';
import { HOME_CONTENT } from '../../../../content/home-content';
import { RevealOnScroll } from '../../../../shared/reveal-on-scroll';

@Component({
  selector: 'app-dress-code-section',
  imports: [RevealOnScroll],
  templateUrl: './dress-code-section.html',
  styleUrl: './dress-code-section.scss',
})
export class DressCodeSection {
  protected readonly content = HOME_CONTENT.dressCode;
}
