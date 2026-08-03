import { Component } from '@angular/core';
import { NavBar } from './nav-bar/nav-bar';
import { Hero } from './hero/hero';
import { LocationSection } from './sections/location-section/location-section';
import { EventDetailsSection } from './sections/event-details-section/event-details-section';
import { DressCodeSection } from './sections/dress-code-section/dress-code-section';
import { GiftSection } from './sections/gift-section/gift-section';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-home',
  imports: [
    NavBar,
    Hero,
    LocationSection,
    EventDetailsSection,
    DressCodeSection,
    GiftSection,
    Footer,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
