import { Component } from '@angular/core';
import { HOME_CONTENT } from '../../../../content/home-content';

@Component({
  selector: 'app-event-details-section',
  imports: [],
  templateUrl: './event-details-section.html',
  styleUrl: './event-details-section.scss',
})
export class EventDetailsSection {
  protected readonly content = HOME_CONTENT.eventDetails;
}
