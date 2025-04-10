export interface Location {
  lat: number;
  lng: number;
  address: string;
  code?: string;
  region?: string;
}

export interface Stop extends Location {
  date: string;
  time: string;
}

export interface JetCategory {
  id: string;
  name: string;
  description: string;
  capacity: number;
  range: number;
  speed: number;
  pricePerHour: number;
  imageUrl: string;
  category: string;
}

export interface RouteInfo {
  distance: string;
  duration: string;
  origin: Location;
  destination: Location;
  isReturn?: boolean;
  stops?: Stop[];
  selectedJet?: JetCategory;
}

export interface Weather {
  temp: number;
  description: string;
  icon: string;
}

export interface BookingDetails {
  passengers: number;
  luggage: number;
  pets: number;
  jetCategory?: string;
  returnDate?: Date;
  returnTime?: string;
}