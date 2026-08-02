import { Component, input, output } from '@angular/core';

export interface NavItem {
  readonly label: string;
  readonly fragment: string;
}

@Component({
  selector: 'app-nav-links',
  imports: [],
  templateUrl: './nav-links.html',
  styleUrl: './nav-links.scss',
})
export class NavLinks {
  readonly navItems = input.required<readonly NavItem[]>();
  readonly linkActivated = output<void>();
}
