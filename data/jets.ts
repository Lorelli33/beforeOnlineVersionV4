// Utility functions for jet calculations
export const calculateRequiredStops = (distance: number, range: number): number => {
  if (distance <= range) return 0;
  return Math.ceil(distance / range) - 1;
};

export const calculateTotalFlightTime = (distance: number, speed: number, stops: number): number => {
  // Base flight time from distance and speed
  const flightTime = distance / speed;
  // Add 30 minutes (0.5 hours) for each takeoff and landing
  const totalTime = flightTime + (0.5 * (stops + 1));
  // Minimum billable time is 1 hour
  return Math.max(totalTime, 1.0);
};

export const calculateTotalPrice = (distance: number, speed: number, pricePerHour: number, stops: number): number => {
  const flightTime = calculateTotalFlightTime(distance, speed, stops);
  // Always charge minimum 1 hour
  const billableTime = Math.max(flightTime, 1.0);
  return Math.round(billableTime * pricePerHour);
};

// Calculate PVCX token rewards (1.5 PVCX per km)
export const calculatePVCXRewards = (distance: number): number => {
  return Math.round(distance * 1.5);
};

export const jetCategories: JetCategory[] = [
  {
    id: 'citation-mustang',
    name: 'Cessna Citation Mustang',
    description: 'Entry-level light jet, perfect for short trips',
    capacity: 4,
    range: 2130,
    speed: 630,
    pricePerHour: 5200,
    imageUrl: 'https://ltltmijkopngifadxxva.supabase.co/storage/v1/object/public/jets/citation-cj4-1.jpg',
    category: 'Light Jet'
  },
  {
    id: 'phenom-300',
    name: 'Embraer Phenom 300',
    description: 'Best-selling light jet with superior performance',
    capacity: 7,
    range: 3650,
    speed: 839,
    pricePerHour: 7500,
    imageUrl: 'https://ltltmijkopngifadxxva.supabase.co/storage/v1/object/public/jets/citation-cj4-2.jpg',
    category: 'Light Jet'
  },
  {
    id: 'pilatus-pc24',
    name: 'Pilatus PC24',
    description: 'Versatile light jet with exceptional short-field performance',
    capacity: 8,
    range: 3610,
    speed: 787,
    pricePerHour: 6000,
    imageUrl: 'https://ltltmijkopngifadxxva.supabase.co/storage/v1/object/public/jets/citation-cj4-3.jpg',
    category: 'Light Jet'
  },
  {
    id: 'citation-cj4',
    name: 'Cessna Citation CJ4',
    description: 'Advanced light jet combining efficiency and comfort',
    capacity: 9,
    range: 3710,
    speed: 805,
    pricePerHour: 6000,
    imageUrl: 'https://ltltmijkopngifadxxva.supabase.co/storage/v1/object/public/jets/citation-cj4-4.jpg',
    category: 'Light Jet'
  },
  {
    id: 'challenger-350',
    name: 'Challenger 350',
    description: 'Super midsize jet with exceptional comfort',
    capacity: 8,
    range: 5926,
    speed: 850,
    pricePerHour: 7800,
    imageUrl: 'https://ltltmijkopngifadxxva.supabase.co/storage/v1/object/public/jets/citation-cj4-5.jpg',
    category: 'Super Midsize'
  },
  {
    id: 'falcon-2000lxs',
    name: 'Falcon 2000 LXS',
    description: 'Large cabin jet with impressive range',
    capacity: 10,
    range: 7410,
    speed: 882,
    pricePerHour: 11000,
    imageUrl: 'https://ltltmijkopngifadxxva.supabase.co/storage/v1/object/public/jets/citation-cj4-6.jpg',
    category: 'Large Jet'
  },
  {
    id: 'global-6500',
    name: 'Bombardier Global 6500',
    description: 'Ultra-long-range jet with superior comfort',
    capacity: 15,
    range: 12223,
    speed: 956,
    pricePerHour: 15400,
    imageUrl: 'https://ltltmijkopngifadxxva.supabase.co/storage/v1/object/public/jets/citation-cj4-7.jpg',
    category: 'Large Jet'
  }
];