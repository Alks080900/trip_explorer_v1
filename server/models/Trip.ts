interface Gallery {
  place: string;
  url: string;
}

interface TripData {
  country: string;
  airport: string;
  hotel: string;
  gallery: Gallery[];
}

const trips: Trip[] = [
  {
    id: 1,
    country: "Nepal",
    airport: "Tribhuwan International Airport",
    hotel: "Hotel Yak and Yeti",
    gallery: [
      {
        place: "Kathmandu",
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/d6/96/36/photo4jpg.jpg?w=1400&h=1400&s=1"
      }
    ]
  },
  {
    id: 2,
    country: "India",
    airport: "Indira Gandhi International Airport",
    hotel: "Oberoi",
    gallery: [
      {
        place: "Taj Mahal",
        url: "https://cdn.mos.cms.futurecdn.net/3FnczamRyWU6MvRMEXWaGD.jpg"
      }
    ]
  },
  {
    id: 3,
    country: "United States",
    airport: "John F. Kennedy International Airport",
    hotel: "Hyatt Grand Central",
    gallery: [
      {
        place: "Statue of Liberty",
        url: "https://www.goworldtravel.com/wp-content/uploads/2021/06/Statue-of-Liberty-from-Canva.jpg"
      },
      {
        place: "Disney",
        url: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1349/464/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/destination/magic-kingdom/WDW_50thEvergreen_MagicKingdom_LandingPage_V2-16x9.jpg?2023-03-22T20:56:41+00:00"
      },
      {
        place: "Manhattan bridge",
        url: "https://media.timeout.com/images/102596290/750/562/image.jpg"
      }
    ]
  },
  {
    id: 4,
    country: "Mexico",
    airport: "Mexico City International Airport",
    hotel: "Hilton Mexico",
    gallery: [
      {
        place: "Chichén Itzá",
        url: "https://lh3.googleusercontent.com/p/AF1QipPVRyqNwBkPGFTPdcqXJRH_9UD9iRY3nZyUu3xB=s1360-w1360-h1020-rw"
      }
    ]
  }
];

class Trip {
  constructor(
      public id: number,
      public country: string,
      public airport: string,
      public hotel: string,
      public gallery: Gallery[]
  ) {
  }

  static getTrips() {
    return trips;
  }

  static getTrip(tripId: number) {
    const trip = trips.find((trip) => trip.id === tripId);
    if (trip) {
      return {...trip, gallery: trip.gallery || []};
    } else {
      throw new Error(`No trip found with Id: ${tripId}`);
    }
  }


  static addTrip(tripData: TripData) {
    const newId = trips.length > 0 ? Math.max(...trips.map(trip => trip.id)) + 1 : 1;
    const newTrip = new Trip(newId, tripData.country, tripData.airport, tripData.hotel, tripData.gallery || []);
    trips.push(newTrip);
    return newTrip;
  }


  static updateTrip(tripId: number, tripData: TripData) {
    const tripIndex = trips.findIndex((trip) => trip.id === tripId);
    if (tripIndex === -1) {
      throw new Error(`No trip found with Id: ${tripId}`);
    }
    const updatedTrip = new Trip(tripId, tripData.country, tripData.airport, tripData.hotel, tripData.gallery);
    trips[tripIndex] = updatedTrip;
    return updatedTrip;
  }

  static deleteTrip(tripId: number) {
    const tripIndex = trips.findIndex((trip) => trip.id === tripId);
    if (tripIndex === -1) {
      throw new Error(`No trip found with Id: ${tripId}`);
    }
    const deletedTrip = trips.splice(tripIndex, 1)[0];
    return deletedTrip;
  }

  static addGalleryImage(tripId: number, url: string) {
    const trip = Trip.getTrip(tripId);

    if (!trip.gallery) {
      trip.gallery = [];
    }

    trip.gallery.push({place: "New Image", url});
    return trip.gallery;
  }


  static updateGalleryImage(tripId: number, oldUrl: string, newUrl: string) {
    const trip = Trip.getTrip(tripId);
    const imageIndex = trip.gallery.findIndex(image => image.url === oldUrl);

    if (imageIndex === -1) {
      throw new Error("Image not found");
    }

    trip.gallery[imageIndex].url = newUrl;
    return trip.gallery;
  }
  static deleteGalleryImage(tripId: number, url: string) {
    const trip = Trip.getTrip(tripId);
    const imageIndex = trip.gallery.findIndex(image => image.url === url);

    if (imageIndex === -1) {
      throw new Error("Image not found");
    }

    trip.gallery.splice(imageIndex, 1);
    return trip.gallery;
  }
}
  export default Trip;
