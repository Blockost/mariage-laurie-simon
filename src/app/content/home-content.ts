// Centralized copy for the home page. Keeping all user-facing strings here
// (instead of inline in templates) makes them easy to edit in one place and
// gives us a single object to swap for a translation service later on.

export interface ScheduleItem {
  name: string;
  time: string;
  description: string;
}

export interface HomeContent {
  location: {
    title: string;
    venueName: string;
    address: string;
    description: string;
    mapUrl: string;
  };
  eventDetails: {
    title: string;
    date: string;
    schedule: ScheduleItem[];
  };
  dressCode: {
    title: string;
    description: string;
    doList: string[];
    avoidList: string[];
  };
  gift: {
    title: string;
    description: string;
    registryNote: string;
  };
}

export const HOME_CONTENT: HomeContent = {
  location: {
    title: 'Location',
    venueName: 'Lorem Ipsum Estate',
    address: '123 Lorem Ipsum Lane, Dolor Sit, 75000',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor ' +
      'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
    mapUrl: 'https://maps.google.com',
  },
  eventDetails: {
    title: 'Event Details',
    date: 'Saturday, Lorem 00, 2027',
    schedule: [
      {
        name: 'Ceremony',
        time: '3:00 PM',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.',
      },
      {
        name: 'Cocktail Hour',
        time: '4:30 PM',
        description: 'Tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.',
      },
      {
        name: 'Reception & Dinner',
        time: '6:00 PM',
        description: 'Veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.',
      },
      {
        name: 'Party',
        time: '10:00 PM',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
      },
    ],
  },
  dressCode: {
    title: 'Dress Code',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, ' +
      'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    doList: [
      'Lorem ipsum cocktail attire',
      'Dolor sit amet pastel or earth tones',
      'Consectetur adipiscing comfortable shoes',
    ],
    avoidList: ['Adipiscing elit white or ivory (reserved for the bride)', 'Sed do eiusmod jeans or sneakers'],
  },
  gift: {
    title: 'Wedding Gift',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
      'incididunt ut labore et dolore magna aliqua.',
    registryNote:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ' +
      'ex ea commodo consequat duis aute irure dolor.',
  },
};
