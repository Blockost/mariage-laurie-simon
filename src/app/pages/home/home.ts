import { Component } from '@angular/core';
import { NavBar } from './nav-bar/nav-bar';
import { LocationSection } from './sections/location-section/location-section';
import { EventDetailsSection } from './sections/event-details-section/event-details-section';
import { DressCodeSection } from './sections/dress-code-section/dress-code-section';
import { GiftSection } from './sections/gift-section/gift-section';

@Component({
  selector: 'app-home',
  imports: [NavBar, LocationSection, EventDetailsSection, DressCodeSection, GiftSection],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
